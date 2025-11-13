"use client";

import { useEffect } from "react";

export function useCamera() {
  useEffect(() => {
    const videoElement = document.getElementById(
      "video"
    ) as HTMLVideoElement | null;
    const takePhotoButton = document.getElementById("take-photo");
    const startRecordingButton = document.getElementById("start-recording");
    const stopRecordingButton = document.getElementById("stop-recording");
    const toggleFullscreenButton = document.getElementById("toggle-fullscreen");

    if (!videoElement) return;

    let mediaRecorder: MediaRecorder | null = null;
    let recordedChunks: BlobPart[] = [];

    // ✅ 1. Inicia a câmera
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!videoElement) return;
        videoElement.srcObject = stream;
        setupRecording(stream);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (
            error.name === "NotFoundError" ||
            error.name === "OverconstrainedError"
          ) {
            return alert(
              "Não foi possível acessar a câmera. Verifique as permissões ou o dispositivo."
            );
          }
        }
      }
    }

    // ✅ 2. Configura gravação
    function setupRecording(stream: MediaStream) {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        recordedChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
        const videoURL = URL.createObjectURL(videoBlob);

        localStorage.setItem("video", videoURL);
        recordedChunks = [];
      };
    }

    // ✅ 3. Tirar foto
    takePhotoButton?.addEventListener("click", () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      const imageURL = canvas.toDataURL("image/png");
      localStorage.setItem("photo", imageURL);
    });

    // ✅ 4. Iniciar gravação
    startRecordingButton?.addEventListener("click", () => {
      if (!mediaRecorder) return;

      mediaRecorder.start();
      startRecordingButton.setAttribute("disabled", "true");
      stopRecordingButton?.removeAttribute("disabled");
    });

    // ✅ 5. Parar gravação
    stopRecordingButton?.addEventListener("click", () => {
      if (!mediaRecorder) return;

      mediaRecorder.stop();
      startRecordingButton?.removeAttribute("disabled");
      stopRecordingButton.setAttribute("disabled", "true");
    });

    // ✅ 6. Fullscreen
    toggleFullscreenButton?.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        videoElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });

    // ✅ 7. Inicia ao carregar
    startCamera();

    // ✅ 8. Cleanup ao sair
    return () => {
      const stream = videoElement.srcObject as MediaStream | null;
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);
}
