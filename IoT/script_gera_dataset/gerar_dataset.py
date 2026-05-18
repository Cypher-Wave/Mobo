import csv
import random
import re
import shutil
from datetime import datetime
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import cv2
import numpy as np
import requests
from tqdm import tqdm
from ultralytics import YOLO

API_ENDPOINT = "https://api.inaturalist.org/v2/observations"
TAXON_ID = "156827"
BASE_QUERY_PARAMS = {
    "verifiable": "true",
    "spam": "false",
    "taxon_id": TAXON_ID,
    "locale": "en-US",
    "per_page": "200",
    "fields": "(photos:(id:!t,url:!t))",
}

OUTPUT_DIR = Path("dataset_lichia")
CLASS_NAME = "lichia"
OUTPUT_MODE = "bbox"
IMAGE_SIZE = "large"
TARGET_IMAGE_SIZE = 256
MAX_PHOTOS = 1000
MODEL_NAME = "yolo11x.pt"
YOLO_CLASS_IDS = [47,49,50,54]
DATASET_CLASS_ID = 0
CONFIDENCE_THRES = 0.25
PADDING = 0.08
MIN_WIDTH = 180
MIN_HEIGHT = 180
KEEP_FULL_IF_NO_DETECTION = False
TRAIN_RATIO = 0.7
VAL_RATIO = 0.2
TEST_RATIO = 0.1
SEED = 42
TIMEOUT = 20


@dataclass
class PhotoRecord:
    observation_id: str
    photo_id: Optional[int]
    source_url: str


@dataclass
class DatasetRecord:
    observation_id: str
    photo_id: Optional[int]
    source_url: str
    output_path: Path
    label_path: Optional[Path]
    confidence: float
    box_count: int


def validate_ratios(train_ratio: float, val_ratio: float, test_ratio: float) -> None:
    total = train_ratio + val_ratio + test_ratio
    if abs(total - 1.0) > 1e-6:
        raise ValueError(f"train+val+test must be 1.0 (got {total:.6f})")


def fetch_results_from_api(base_params: Dict[str, str], timeout: int) -> List[Dict]:
    all_results: List[Dict] = []
    session = requests.Session()

    first_params = dict(base_params)
    first_params["page"] = "1"
    first_response = session.get(API_ENDPOINT, params=first_params, timeout=timeout)
    first_response.raise_for_status()
    first_payload = first_response.json()

    first_results = first_payload.get("results", [])
    all_results.extend(first_results)

    page = 2
    while True:
        params = dict(base_params)
        params["page"] = str(page)
        try:
            response = session.get(API_ENDPOINT, params=params, timeout=timeout)
            response.raise_for_status()
        except requests.exceptions.HTTPError as e:
            if e.response.status_code >= 400:
                break
            raise

        payload = response.json()
        page_results = payload.get("results", [])
        if not page_results:
            break
        all_results.extend(page_results)
        page += 1

    return all_results


def replace_size_in_url(url: str, target_size: str) -> str:
    # Typical iNaturalist URLs end in size tokens like square.jpg.
    return re.sub(
        r"/(square|small|medium|large|original)\.(jpg|jpeg|png)$",
        f"/{target_size}.\\2",
        url,
        flags=re.IGNORECASE,
    )


def collect_photo_records(observations: List[Dict], target_size: str) -> List[PhotoRecord]:
    photo_records: List[PhotoRecord] = []
    seen_keys = set()

    for obs in observations:
        obs_id = obs.get("id") or obs.get("uuid") or "unknown"
        photos = obs.get("photos", [])
        for photo in photos:
            raw_url = photo.get("url")
            if not raw_url:
                continue
            photo_url = replace_size_in_url(raw_url, target_size)
            key = (obs_id, photo.get("id"), photo_url)
            if key in seen_keys:
                continue
            seen_keys.add(key)
            photo_records.append(
                PhotoRecord(
                    observation_id=str(obs_id),
                    photo_id=photo.get("id"),
                    source_url=photo_url,
                )
            )

    return photo_records


def decode_image_from_bytes(binary: bytes) -> Optional[np.ndarray]:
    arr = np.frombuffer(binary, dtype=np.uint8)
    image = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    return image


def collect_matching_boxes(
    result,
    yolo_class_ids: List[int],
    confidence_thres: float,
) -> List[Tuple[float, float, float, float, float]]:
    boxes = result.boxes
    if boxes is None or len(boxes) == 0:
        return []

    confs = boxes.conf.cpu().numpy()
    clss = boxes.cls.cpu().numpy().astype(int)
    xyxy = boxes.xyxy.cpu().numpy()

    matches: List[Tuple[float, float, float, float, float]] = []
    for i, (cls_id, conf) in enumerate(zip(clss, confs)):
        if cls_id not in yolo_class_ids:
            continue
        if conf < confidence_thres:
            continue
        x1, y1, x2, y2 = xyxy[i]
        matches.append((float(x1), float(y1), float(x2), float(y2), float(conf)))

    return matches


def crop_best_detection(
    image_bgr: np.ndarray,
    detections: List[Tuple[float, float, float, float, float]],
    padding: float,
) -> Tuple[Optional[np.ndarray], float]:
    if not detections:
        return None, 0.0

    h, w = image_bgr.shape[:2]
    x1, y1, x2, y2, best_conf = max(detections, key=lambda item: item[4])

    bw = x2 - x1
    bh = y2 - y1
    pad_x = bw * padding
    pad_y = bh * padding

    x1 = int(max(0, x1 - pad_x))
    y1 = int(max(0, y1 - pad_y))
    x2 = int(min(w - 1, x2 + pad_x))
    y2 = int(min(h - 1, y2 + pad_y))

    if x2 <= x1 or y2 <= y1:
        return None, 0.0

    crop = image_bgr[y1:y2, x1:x2]
    if crop.size == 0:
        return None, 0.0

    return crop, best_conf


def detections_to_yolo_lines(
    detections: List[Tuple[float, float, float, float, float]],
    image_width: int,
    image_height: int,
    class_id: int,
) -> List[str]:
    lines: List[str] = []
    for x1, y1, x2, y2, _conf in detections:
        box_width = max(0.0, x2 - x1)
        box_height = max(0.0, y2 - y1)
        if box_width <= 0 or box_height <= 0:
            continue

        center_x = ((x1 + x2) / 2.0) / image_width
        center_y = ((y1 + y2) / 2.0) / image_height
        norm_width = box_width / image_width
        norm_height = box_height / image_height
        lines.append(
            f"{class_id} {center_x:.6f} {center_y:.6f} {norm_width:.6f} {norm_height:.6f}"
        )

    return lines


def write_text_file(path: Path, lines: List[str]) -> None:
    path.write_text("\n".join(lines) + ("\n" if lines else ""), encoding="utf-8")


def draw_detections_on_image(
    image: np.ndarray,
    detections: List[Tuple[float, float, float, float, float]],
    class_name: str,
) -> np.ndarray:
    annotated = image.copy()

    for x1, y1, x2, y2, conf in detections:
        pt1 = (int(round(x1)), int(round(y1)))
        pt2 = (int(round(x2)), int(round(y2)))
        cv2.rectangle(annotated, pt1, pt2, (0, 255, 0), 2)

        label = f"{class_name} {conf:.2f}"
        label_origin_y = max(20, pt1[1] - 8)
        cv2.putText(
            annotated,
            label,
            (pt1[0], label_origin_y),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 0),
            2,
            cv2.LINE_AA,
        )

    return annotated


def create_split_folders(output_dir: Path, class_name: str) -> Dict[str, Path]:
    split_dirs = {
        "train": output_dir / "train" / class_name,
        "val": output_dir / "val" / class_name,
        "test": output_dir / "test" / class_name,
    }
    for folder in split_dirs.values():
        folder.mkdir(parents=True, exist_ok=True)
    return split_dirs


def create_detection_split_folders(output_dir: Path) -> Dict[str, Dict[str, Path]]:
    split_dirs = {
        "train": {
            "images": output_dir / "train" / "images",
            "labels": output_dir / "train" / "labels",
        },
        "val": {
            "images": output_dir / "val" / "images",
            "labels": output_dir / "val" / "labels",
        },
        "test": {
            "images": output_dir / "test" / "images",
            "labels": output_dir / "test" / "labels",
        },
    }
    for split in split_dirs.values():
        for folder in split.values():
            folder.mkdir(parents=True, exist_ok=True)
    return split_dirs


def meets_minimum_size(image: np.ndarray, min_width: int, min_height: int) -> bool:
    height, width = image.shape[:2]
    return width >= min_width and height >= min_height


def resize_with_reflection_padding(image: np.ndarray, target_size: int) -> np.ndarray:
    h, w = image.shape[:2]
    if h <= 0 or w <= 0:
        raise ValueError("Invalid image dimensions for resizing.")

    scale = min(target_size / w, target_size / h)
    new_w = max(1, int(round(w * scale)))
    new_h = max(1, int(round(h * scale)))

    interpolation = cv2.INTER_AREA if scale < 1.0 else cv2.INTER_CUBIC
    resized = cv2.resize(image, (new_w, new_h), interpolation=interpolation)

    pad_w = target_size - new_w
    pad_h = target_size - new_h
    left = pad_w // 2
    right = pad_w - left
    top = pad_h // 2
    bottom = pad_h - top

    return cv2.copyMakeBorder(
        resized,
        top,
        bottom,
        left,
        right,
        borderType=cv2.BORDER_REFLECT_101,
    )


def split_records(
    records: List[DatasetRecord],
    train_ratio: float,
    val_ratio: float,
    test_ratio: float,
    seed: int,
) -> Dict[str, List[DatasetRecord]]:
    rng = random.Random(seed)
    shuffled = records[:]
    rng.shuffle(shuffled)

    n = len(shuffled)
    n_train = int(n * train_ratio)
    n_val = int(n * val_ratio)
    n_test = n - n_train - n_val

    splits = {
        "train": shuffled[:n_train],
        "val": shuffled[n_train : n_train + n_val],
        "test": shuffled[n_train + n_val : n_train + n_val + n_test],
    }
    return splits


def write_manifest(output_dir: Path, rows: List[Dict[str, str]]) -> None:
    manifest_path = output_dir / "manifest.csv"
    fieldnames = [
        "split",
        "relative_path",
        "label_path",
        "observation_id",
        "photo_id",
        "confidence",
        "box_count",
        "source_url",
        "mode",
    ]
    with manifest_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def create_timestamped_output_dir(base_output_dir: Path) -> Path:
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    run_output_dir = base_output_dir.parent / f"{base_output_dir.name}_{timestamp}"
    run_output_dir.mkdir(parents=True, exist_ok=False)
    return run_output_dir


def load_yolo_model(model_name_or_path: str) -> YOLO:
    candidates = [model_name_or_path]

    for candidate in candidates:
        try:
            model = YOLO(candidate)
            if candidate != model_name_or_path:
                print(f"[WARN] Could not load '{model_name_or_path}'. Using fallback '{candidate}'.")
            return model
        except Exception:
            continue

    attempted = ", ".join(candidates)
    raise RuntimeError(f"Could not load any YOLO model weights. Tried: {attempted}.")


def main() -> None:
    validate_ratios(TRAIN_RATIO, VAL_RATIO, TEST_RATIO)

    if OUTPUT_MODE not in {"crop", "bbox"}:
        raise ValueError("OUTPUT_MODE must be either 'crop' or 'bbox'.")

    output_dir = create_timestamped_output_dir(OUTPUT_DIR)
    temp_outputs_dir = output_dir / "_tmp_outputs"
    temp_outputs_dir.mkdir(parents=True, exist_ok=True)

    base_params = dict(BASE_QUERY_PARAMS)
    all_observations = fetch_results_from_api(
        base_params=base_params,
        timeout=TIMEOUT,
    )

    seen_obs = set()
    unique_observations = []
    for obs in all_observations:
        obs_key = obs.get("id") or obs.get("uuid")
        if obs_key is None:
            # Keep entries without stable identifier instead of collapsing them.
            unique_observations.append(obs)
            continue
        if obs_key in seen_obs:
            continue
        seen_obs.add(obs_key)
        unique_observations.append(obs)

    photo_records = collect_photo_records(unique_observations, IMAGE_SIZE)
    if not photo_records:
        raise RuntimeError("No photo URLs found in observations.")

    if MAX_PHOTOS is not None:
        if MAX_PHOTOS <= 0:
            raise ValueError("MAX_PHOTOS must be greater than 0 or None.")
        photo_records = photo_records[:MAX_PHOTOS]

    print(f"Found {len(unique_observations)} observations.")
    print(f"Found {len(photo_records)} candidate photos.")

    model = load_yolo_model(MODEL_NAME)
    session = requests.Session()

    dataset_records: List[DatasetRecord] = []
    discarded_no_detection = 0
    discarded_too_small = 0
    discarded_download_or_decode = 0
    for idx, photo in enumerate(tqdm(photo_records, desc="Downloading + processing"), start=1):
        try:
            resp = session.get(photo.source_url, timeout=TIMEOUT)
            resp.raise_for_status()
        except requests.RequestException:
            discarded_download_or_decode += 1
            continue

        image = decode_image_from_bytes(resp.content)
        if image is None:
            discarded_download_or_decode += 1
            continue

        result = model.predict(source=image, verbose=False, device=0)[0]
        obs_part = str(photo.observation_id)
        photo_part = str(photo.photo_id) if photo.photo_id is not None else "na"
        filename = f"obs{obs_part}_photo{photo_part}_{idx:06d}"

        if OUTPUT_MODE == "crop":
            detections = collect_matching_boxes(
                result=result,
                yolo_class_ids=YOLO_CLASS_IDS,
                confidence_thres=CONFIDENCE_THRES,
            )
            crop, conf = crop_best_detection(
                image_bgr=image,
                detections=detections,
                padding=PADDING,
            )

            if crop is None:
                if not KEEP_FULL_IF_NO_DETECTION:
                    discarded_no_detection += 1
                    continue
                crop = image
                conf = 0.0

            if not meets_minimum_size(crop, MIN_WIDTH, MIN_HEIGHT):
                discarded_too_small += 1
                continue

            crop = resize_with_reflection_padding(crop, TARGET_IMAGE_SIZE)
            output_path = temp_outputs_dir / f"{filename}.jpg"

            ok = cv2.imwrite(str(output_path), crop)
            if not ok:
                continue

            dataset_records.append(
                DatasetRecord(
                    observation_id=photo.observation_id,
                    photo_id=photo.photo_id,
                    source_url=photo.source_url,
                    output_path=output_path,
                    label_path=None,
                    confidence=conf,
                    box_count=1 if conf > 0 else 0,
                )
            )
        else:
            detections = collect_matching_boxes(
                result=result,
                yolo_class_ids=YOLO_CLASS_IDS,
                confidence_thres=CONFIDENCE_THRES,
            )

            if not detections and not KEEP_FULL_IF_NO_DETECTION:
                discarded_no_detection += 1
                continue

            if not meets_minimum_size(image, MIN_WIDTH, MIN_HEIGHT):
                discarded_too_small += 1
                continue

            annotated_image = draw_detections_on_image(
                image=image,
                detections=detections,
                class_name=CLASS_NAME,
            )
            output_path = temp_outputs_dir / f"{filename}.jpg"
            label_path = temp_outputs_dir / f"{filename}.txt"

            ok = cv2.imwrite(str(output_path), annotated_image)
            if not ok:
                continue

            yolo_lines = detections_to_yolo_lines(
                detections=detections,
                image_width=image.shape[1],
                image_height=image.shape[0],
                class_id=DATASET_CLASS_ID,
            )
            write_text_file(label_path, yolo_lines)

            best_conf = max((item[4] for item in detections), default=0.0)
            dataset_records.append(
                DatasetRecord(
                    observation_id=photo.observation_id,
                    photo_id=photo.photo_id,
                    source_url=photo.source_url,
                    output_path=output_path,
                    label_path=label_path,
                    confidence=best_conf,
                    box_count=len(detections),
                )
            )

    if not dataset_records:
        raise RuntimeError("No outputs produced. Try lowering confidence or using a different YOLO class id.")

    if OUTPUT_MODE == "crop":
        split_dirs = create_split_folders(output_dir, CLASS_NAME)
    else:
        split_dirs = create_detection_split_folders(output_dir)
    split_map = split_records(
        dataset_records,
        train_ratio=TRAIN_RATIO,
        val_ratio=VAL_RATIO,
        test_ratio=TEST_RATIO,
        seed=SEED,
    )

    manifest_rows: List[Dict[str, str]] = []
    for split_name, items in split_map.items():
        for item in items:
            if OUTPUT_MODE == "crop":
                dst = split_dirs[split_name] / item.output_path.name
                shutil.copy2(item.output_path, dst)
                label_dst = ""
            else:
                image_dst = split_dirs[split_name]["images"] / item.output_path.name
                label_dst_path = split_dirs[split_name]["labels"] / item.label_path.name
                shutil.copy2(item.output_path, image_dst)
                shutil.copy2(item.label_path, label_dst_path)
                dst = image_dst
                label_dst = str(label_dst_path.relative_to(output_dir)).replace("\\", "/")

            relative_path = str(dst.relative_to(output_dir)).replace("\\", "/")
            manifest_rows.append(
                {
                    "split": split_name,
                    "relative_path": relative_path,
                    "label_path": label_dst,
                    "observation_id": str(item.observation_id),
                    "photo_id": str(item.photo_id),
                    "confidence": f"{item.confidence:.4f}",
                    "box_count": str(item.box_count),
                    "source_url": item.source_url,
                    "mode": OUTPUT_MODE,
                }
            )

    write_manifest(output_dir, manifest_rows)

    shutil.rmtree(temp_outputs_dir, ignore_errors=True)

    print("\nDone.")
    print(f"Total samples: {len(dataset_records)}")
    print(
        "Split counts: "
        f"train={len(split_map['train'])}, "
        f"val={len(split_map['val'])}, "
        f"test={len(split_map['test'])}"
    )
    print(
        "Discarded: "
        f"download/decode={discarded_download_or_decode}, "
        f"no_detection={discarded_no_detection}, "
        f"too_small={discarded_too_small}"
    )
    print(f"Manifest: {output_dir / 'manifest.csv'}")
    print(f"Dataset folder: {output_dir}")


if __name__ == "__main__":
    main()
