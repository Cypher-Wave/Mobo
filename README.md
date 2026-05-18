# Projeto Mobo

> Automatização de colheita de safra de lichia através de um braço mecânico utilizando tecnologias de IoT e Inteligência Artificial.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-backend-339933?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-linguagem-3178C6?logo=typescript)
![Next.js](https://img.shields.io/badge/Next.js-web-000000?logo=nextdotjs)
![React Native](https://img.shields.io/badge/React%20Native-mobile-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-mobile-000020?logo=expo)
![Arduino](https://img.shields.io/badge/Arduino-hardware-00979D?logo=arduino)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Render](https://img.shields.io/badge/Render-Deploy-46E3B7?logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?logo=vercel&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Storage-3448C5?logo=cloudinary&logoColor=white)

---

## 📋 Sobre o Projeto

O **Projeto Mobo** é uma solução multiplataforma para a colheita automatizada de lichia, integrando **IoT** e **Inteligência Artificial**. O sistema combinará visão computacional baseada em **redes neurais convolucionais**, sensoriamento remoto via IoT e automação robótica aplicados especificamente à cultura da lichia — fruta delicada que exige cuidados especiais durante a colheita.

O protótipo é composto por um **braço mecânico fabricado em impressora 3D** com pinça automatizada controlada por Arduino e aplicação multiplataforma para gestão e visualização dos dados.

> 📊 **Pesquisa de campo com 4 produtores do Vale do Ribeira (SP)** revelou perdas médias de **17,4%** da produção na colheita manual — equivalentes a mais de **R$ 32.000,00** de prejuízo entre os produtores pesquisados nas regiões de Jacupiranga, Eldorado e Iguape.

O projeto se alinha aos seguintes **Objetivos de Desenvolvimento Sustentável (ODS)**:

| ODS | Descrição |
|-----|-----------|
| 🌾 ODS 2 | Fome Zero e Agricultura Sustentável |
| 🏭 ODS 9 | Indústria, Inovação e Infraestrutura |
| ♻️ ODS 12 | Consumo e Produção Responsáveis |

---

## ✨ Funcionalidades

- 🤖 **Braço Mecânico Automatizado** — colheita controlada remotamente com câmera integrada
- 🧠 **IA para Reconhecimento de Maturação** — modelo treinado para identificar o estágio ideal de colheita
- 📡 **Monitoramento IoT** — sensores de temperatura, umidade do ar e umidade do solo em tempo real
- 📊 **Dashboard Analytics** — visualização de gráficos e indicadores de qualidade e quantidade da colheita
- 📅 **Previsão de Colheita** — estimativa baseada em dados dos sensores e condições climáticas
- 📝 **Relatórios Gerenciais** — geração e exportação de relatórios por período, campo e qualidade
- 🗺️ **Mapa de Sensores** — localização geográfica dos sensores e braços mecânicos
- 👤 **Gestão de Usuários** — perfis de Administrador e Agricultor com permissões distintas
- 📱 **Aplicativo Mobile** — versão mobile com todas as funcionalidades principais e controle da garra mecânica
- Link do repositório da IA (https://github.com/Cypher-Wave/Mobo-IA)

---

## 🛠️ Tecnologias Utilizadas

### Backend
- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/) — plataforma e tipagem estática
- [Express](https://expressjs.com/) — framework para APIs RESTful
- [Mongoose](https://mongoosejs.com/) — ODM para MongoDB
- [MongoDB Atlas](https://www.mongodb.com/atlas) — banco de dados NoSQL na nuvem
- [JWT](https://jwt.io/) — autenticação via tokens
- [Render](https://render.com/) — hospedagem do backend
- [Cloudinary](https://cloudinary.com/) — armazenamento e gerenciamento de imagens

### Frontend Web
- [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) — framework React com SSR/SSG
- [Vercel](https://vercel.com/) — hospedagem do frontend

### Frontend Mobile
- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) + [TypeScript](https://www.typescriptlang.org/) — app multiplataforma (iOS e Android)

### Design
- [Figma](https://www.figma.com/design/xTZIWXjrK5TRtYm3Csh8h8/Mobo---UI?node-id=1-6998&t=Y23Z0Rf7ffm81J15-1) — prototipação e design de interfaces

### Inteligência Artificial 
- **Redes Neurais Convolucionais (CNN)** — classificação do estágio de maturação da lichia
- **Transfer Learning** — arquitetura pré-treinada com ajuste fino para a tarefa específica
- **Data Augmentation** — técnica para aumentar a robustez do modelo em variações de iluminação e ângulo
- Meta de acurácia mínima: **85%**

### Hardware
- [Arduino](https://www.arduino.cc/) — controle e movimentação do braço mecânico
- **Impressora 3D** — fabricação do protótipo físico do braço com pinça automatizada
- **Servomotores** — movimentação dos eixos com precisão para aproximação e posicionamento
- **Sensores IoT** — temperatura, umidade do solo e umidade do ar *(não implementado)*

### Banco de Dados
- **MongoDB Atlas** — armazenamento principal (dados de IoT, colheitas, usuários)
- **MySQL** — modelo relacional para dados estruturados

### Ferramentas & Metodologia
- **Scrum** — metodologia ágil com Sprints iterativos
- [LucidChart](https://www.lucidchart.com/) — diagramas UML e fluxogramas
- [BrModelo](https://www.brmodeloweb.com/) — modelagem conceitual e lógica do banco de dados

---

## 🏗️ Arquitetura do Sistema

```
┌──────────────────────────────────────────────────────────────┐
│                        APLICAÇÃO MOBO                        │
├──────────────────┬──────────────────┬────────────────────────┤
│    Frontend      │     Backend      │    Hardware / IoT      │
│                  │                  │                        │
│  React (Web) +   │  Node.js +       │  Sensores IoT          │
│     Vercel       │  TypeScript      │  (temp, umidade)       │
│                  │  APIs RESTful    │                        │
│  React Native    │                  │  Braço Mecânico 3D     │
│  (Mobile / TS)   │  MongoDB Atlas   │  (Arduino + Servos)    │
│                  │ (nuvem / Render) │                        │
│  Figma (UX)      │  + Cloudinary    │  CNN / Visão Comp.     │
│                  │                  │  (maturação da lichia) │
└──────────────────┴──────────────────┴────────────────────────┘
```

---

## 📁 Estrutura do Projeto

```
Mobo/
├── .github/
│ └── workflows/ # CI/CD e auto-assign de issues
├── backend/
│ ├── src/ # Código-fonte da API
│ ├── .env.example # Exemplo de variáveis de ambiente
│ ├── package.json
│ └── tsconfig.json
├── frontend/
│ ├── mobile/ # Aplicativo React Native + Expo
│ │ ├── app/ # Telas do aplicativo (.tsx)
│ │ │ ├── layout.tsx
│ │ │ ├── alertas.tsx
│ │ │ ├── cadastro.tsx
│ │ │ ├── cadastroTerreno.tsx
│ │ │ ├── curiosidades.tsx
│ │ │ ├── dashboard.tsx
│ │ │ ├── garra.tsx
│ │ │ ├── home.tsx
│ │ │ ├── login.tsx
│ │ │ ├── perfil.tsx
│ │ │ ├── previsao-de-colheita.tsx
│ │ │ └── sensores.tsx
│ │ ├── assets/images/
│ │ ├── app.json
│ │ ├── package.json
│ │ └── tsconfig.json
│ └── web/ # Aplicação Next.js
│ ├── public/
│ ├── src/
│ ├── next.config.ts
│ ├── package.json
│ └── tsconfig.json
├── database/ # Dados de teste para banco local (seeds, fixtures, backups)
├── IoT/ # Integração com hardware e IA para colheita
│ ├── BracoEsteira.ino # Código Arduino para controle do braço mecânico
│ └── script_gera_dataset/ # Scripts Python para geração de dataset de treinamento
│ ├── gerar_dataset.py
│ ├── requirements.txt
│ ├── dataset_lichia*/ # Datasets organizados (train/val/test)
│ └── yolo11x.pt # Modelo YOLOv11 pré-treinado (Git LFS) ⚠️
├── .gitignore
└── README.md
```

> ⚠️ **Atenção:** A estrutura atual usa `frontend/` (sem hífen). Documentações antigas podem referenciar `front-end/` — desconsidere esses caminhos.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) v20 LTS (recomendado)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) local **ou** conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Expo Go](https://expo.dev/go) no celular (para testar o app mobile)

### 1. Clonar o Repositório

```bash
git clone https://github.com/Cypher-Wave/Mobo.git
cd Mobo
```

---

### 2. Backend (Node.js + TypeScript)

```bash
cd backend
npm install
```

#### Configurar variáveis de ambiente

Na pasta `backend`, crie um arquivo `.env` baseado no `.env.example` disponível no repositório.

**Usando MongoDB local:**
```env
PORT=5000
DB_NAME=mobo
USE_LOCAL_DB=true
JWT_SECRET=minha_chave_super_secreta_123
NODE_ENV=development
```

A aplicação tentará conectar em `mongodb://127.0.0.1:27017/mobo`.

**Usando MongoDB Atlas:**
```env
PORT=5000
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=mobo
USE_LOCAL_DB=false
JWT_SECRET=minha_chave_super_secreta_123
NODE_ENV=development
```

#### Rodar o backend

```bash
npm run dev
```

A API ficará disponível em `http://localhost:5000`.

---

### 3. Frontend Web (Next.js)

Em outro terminal:

```bash
cd frontend/web
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

> 💡 O frontend web está configurado para consumir a API em `http://localhost:5000`. Caso altere a porta do backend, ajuste também a URL da API no frontend web.

---

### 4. Frontend Mobile (React Native + Expo)

Em outro terminal:

```bash
cd frontend/mobile
npm install
npx expo start
```

Após iniciar, você pode:

- Escanear o QR Code com o aplicativo **Expo Go** no celular
- Pressionar `a` para abrir no emulador Android
- Pressionar `i` para abrir no simulador iOS
- Pressionar `w` para abrir no navegador

---

### Ordem recomendada de execução

Suba os serviços nesta ordem para facilitar a validação de cada camada:

1. **Backend**
2. **Frontend Web**
3. **Frontend Mobile**

---

## 🧪 Testes

### Backend

```bash
cd backend
npm test
npm run test:coverage   # com cobertura
```

### Frontend Web

```bash
cd frontend/web
npm test
```

### Frontend Mobile

```bash
cd frontend/mobile
npm test
```

> ⚠️ Os testes de sistema completo (integração IoT + braço mecânico + IA) estão em desenvolvimento e serão implementados nas próximas sprints.

---

## 🌿 Fluxo de Desenvolvimento com Git

```bash
# Criar uma branch
git checkout -b feat/minha-feature

# Ver alterações
git status

# Adicionar arquivos
git add .

# Criar commit
git commit -m "feat: descrição da alteração"

# Enviar para o GitHub
git push -u origin feat/minha-feature
```

Após o envio, abra uma **Pull Request** no repositório.

---

## ⚠️ Problemas Comuns

### Erro de conexão com MongoDB

Verifique se:
- O arquivo `.env` foi criado corretamente
- `USE_LOCAL_DB` está configurado de acordo com o ambiente
- O MongoDB local está rodando (se usar banco local)
- As credenciais do Atlas estão corretas (se usar nuvem)

### Porta ocupada

Se a porta `5000` estiver em uso, a aplicação pode falhar ao iniciar. Libere a porta ou ajuste no `.env`, lembrando de atualizar também a URL da API no frontend web.

### Erro de CORS

O backend está configurado para aceitar requisições do frontend rodando em `http://localhost:3000`. Ao rodar em outro endereço, pode ser necessário ajustar a configuração de CORS no backend.

---

## 🔗 Links Importantes

| Recurso | Link |
|---------|------|
| 📖 Documentação da API (Swagger) | `Em breve` |
| 🌐 Deploy — Frontend Web | [mobocw.vercel.app](https://mobocw.vercel.app/) |
| 📱 Deploy — Mobile (Expo) | `Em breve` |
| 🎨 Protótipo Figma | `https://www.figma.com/design/xTZIWXjrK5TRtYm3Csh8h8/Mobo---UI?node-id=1-6998&t=Y23Z0Rf7ffm81J15-1` |

> 🔔 Acompanhe as [issues](https://github.com/Cypher-Wave/Mobo/issues) do projeto para atualizações.

---

## 👥 Equipe

| Nome | Função | GitHub |
|------|--------|--------|
| Bárbara Vitória Ferreira dos Santos | Frontend & UI/UX e Mobile | [@babi-s4ntos](https://github.com/babi-s4ntos) |
| Jaquelaine Aparecida de Ramos | Documentação / IA /Mobile| [@jk-ramos](https://github.com/jk-ramos) |
| Lucas de Lima Santana | IoT / IA / Mobile | [@LucasLiSan](https://github.com/LucasLiSan) |
| Pedro Henrique Venâncio | Backend & DevOps / Front | [@phvenancio](https://github.com/phvenancio) |

---

## 📊 Estado Atual do Desenvolvimento

- [x] Pesquisa de campo com produtores do Vale do Ribeira
- [x] Protótipo das interfaces (Web e Mobile)
- [x] CRUD completo via API RESTful (Node.js + TypeScript)
- [x] Integração com MongoDB Atlas
- [x] Dashboard com gráficos e tabelas
- [x] Modelagem conceitual e lógica do banco de dados
- [x] Diagramas UML (Classe, Objeto, Caso de Uso, Fluxograma)
- [x] Protótipo físico do braço mecânico (impresso em 3D + Arduino)
- [x] Testes iniciais de movimentação em ambiente controlado
- [x] Modelo de IA (CNN) para reconhecimento do estágio de maturação *(próximo semestre)*
- [ ] Coleta do dataset de imagens de lichia em campo
- [ ] Integração completa IoT + visão computacional + braço mecânico
- [ ] Visualização em tempo real dos sensores IoT
- [ ] Testes em campo real (pomares do Vale do Ribeira)
- [ ] Versão acessível para pequenos produtores

---

## 🔭 Trabalhos Futuros

- Treinar modelo CNN para classificação de maturação com acurácia ≥ 85%
- Investigar arquiteturas avançadas como **YOLO v8** e **EfficientNet** para detecção em tempo real
- Integrar completamente os módulos de visão computacional, IoT e robótica
- Realizar testes extensivos em pomares reais do Vale do Ribeira
- Desenvolver versão acessível via parcerias com cooperativas agrícolas
- Adaptar a tecnologia para outras frutas tropicais

  ---

## 📡 Integração IoT & IA

Esta seção contém os componentes de hardware e inteligência artificial para automação da colheita.

### 📂 Conteúdo da Pasta `IoT/`

| Arquivo/Pasta | Descrição |
|--------------|-----------|
| `BracoEsteira.ino` | Código Arduino para controle dos servomotores do braço mecânico e esteira |
| `script_gera_dataset/` | Scripts Python para organização e augmentação de imagens de lichia |
| `yolo11x.pt` | Modelo YOLOv11 pré-treinado para detecção de frutas em tempo real |

### ⚙️ Como Utilizar

#### Arduino (BracoEsteira.ino)
1. Abra o arquivo `.ino` na [Arduino IDE](https://www.arduino.cc/en/software)
2. Selecione a placa e a porta correta
3. Faça o upload para o microcontrolador

#### Dataset e IA (script_gera_dataset/)
```bash
cd IoT/script_gera_dataset

# Instalar dependências Python
pip install -r requirements.txt

# Executar script de geração de dataset
python gerar_dataset.py

⚠️ Git LFS: O arquivo yolo11x.pt (109 MB) é gerenciado pelo Git Large File Storage.
Para clonar este repositório em outra máquina:

# 1. Instale o Git LFS (apenas uma vez por máquina)
git lfs install

# 2. Clone o repositório normalmente
git clone https://github.com/Cypher-Wave/Mobo.git


---



## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🎓 Instituição

Desenvolvido na **Faculdade de Tecnologia (FATEC) — Campus Registro**
Curso: Desenvolvimento de Software Multiplataforma
Ministério da Educação — 2026

---

<p align="center">
  Feito com 🍈 pela equipe Mobo
</p>
