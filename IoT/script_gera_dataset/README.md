# Gerador de dataset com iNaturalist + YOLO

Este projeto busca imagens no iNaturalist por `taxon_id` e usa YOLO para gerar dataset em dois modos:

- `crop`: detecta a classe escolhida e salva o recorte, ideal para classificacao.
- `bbox`: detecta a classe escolhida e salva o dataset no formato YOLO de deteccao, com `images/` e `labels/`.

Ou seja: ele nao fica preso ao guara e nao fica preso a uma classe unica do YOLO. Voce pode trocar tanto o taxon de origem quanto a classe que o modelo deve detectar.

## Configuracao

Edite as constantes no topo de [gerar_dataset.py](gerar_dataset.py):

- `TAXON_ID`: taxon do iNaturalist que vai ser consultado.
- `OUTPUT_MODE`: use `"crop"` ou `"bbox"`.
- `OUTPUT_DIR`: pasta base do dataset.
- `CLASS_NAME`: nome da classe de saida.
- `MODEL_NAME`: caminho ou nome do modelo `.pt`.
- `YOLO_CLASS_ID`: id da classe que o YOLO deve detectar no modelo usado.
- `DATASET_CLASS_ID`: id da classe no dataset gerado. Para um dataset de uma classe, normalmente fica `0`.

Outras configuracoes uteis:

- `IMAGE_SIZE`
- `TARGET_IMAGE_SIZE`
- `MAX_PHOTOS`
- `CONFIDENCE_THRES`
- `PADDING`
- `MIN_WIDTH`
- `MIN_HEIGHT`
- `KEEP_FULL_IF_NO_DETECTION`
- `TRAIN_RATIO`
- `VAL_RATIO`
- `TEST_RATIO`

Exemplo:

```python
TAXON_ID = "4954"
CLASS_NAME = "garca"
OUTPUT_MODE = "bbox"
YOLO_CLASS_ID = 14
DATASET_CLASS_ID = 0
```

## Como pegar o `taxon_id`

Voce pode buscar o taxon no site do iNaturalist e copiar o valor da URL. O script usa esse valor para montar a consulta na API.

## Instalacao

```bash
pip install -r requirements.txt
```

## Execucao

Depois de ajustar as constantes, rode:

```bash
python gerar_dataset.py
```

## Saida no modo `crop`

Quando `OUTPUT_MODE = "crop"`, o resultado fica assim:

```text
dataset_YYYYMMDD_HHMMSS/
  train/<classe>/*.jpg
  val/<classe>/*.jpg
  test/<classe>/*.jpg
  manifest.csv
```

Esse modo gera imagens recortadas e redimensionadas.

## Saida no modo `bbox`

Quando `OUTPUT_MODE = "bbox"`, o resultado fica assim:

```text
dataset_YYYYMMDD_HHMMSS/
  train/images/*.jpg
  train/labels/*.txt
  val/images/*.jpg
  val/labels/*.txt
  test/images/*.jpg
  test/labels/*.txt
  manifest.csv
```

Esse modo salva a imagem original e um arquivo `.txt` com as bounding boxes no formato YOLO.

## Observacoes

- `YOLO_CLASS_ID` depende do modelo usado. Em modelos COCO, `14` costuma representar bird.
- `CLASS_NAME` serve para o nome da classe do dataset e pode ser qualquer texto que faca sentido para o seu projeto.
- Se nao houver deteccao e `KEEP_FULL_IF_NO_DETECTION = True`, o script pode manter a imagem no modo `bbox` com label vazio.
- Respeite as licencas e os termos de uso das imagens do iNaturalist.
