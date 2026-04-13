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
![AWS](https://img.shields.io/badge/AWS-hospedagem-FF9900?logo=amazonaws)

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
- 📱 **Aplicativo Mobile** — versão mobile com todas as funcionalidades principais e controle da garra mecânica.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/) — plataforma e tipagem estática
- [Express](https://expressjs.com/) — framework para APIs RESTful
- [Mongoose](https://mongoosejs.com/) — ODM para MongoDB
- [MongoDB Atlas](https://www.mongodb.com/atlas) — banco de dados NoSQL na nuvem
- [AWS](https://aws.amazon.com/) — hospedagem e infraestrutura


### Frontend Web
- [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) — framework React para a interface web (SSR/SSG)

### Frontend Mobile
- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) + [TypeScript](https://www.typescriptlang.org/) — aplicativo mobile multiplataforma (iOS e Android)

### Design
- [Figma](https://figma.com/) — prototipação e design de interfaces



### Inteligência Artificial (não implementado)
- **Redes Neurais Convolucionais (CNN)** — classificação do estágio de maturação da lichia
- **Transfer Learning** — arquitetura pré-treinada com ajuste fino para a tarefa específica
- **Data Augmentation** — técnica para aumentar a robustez do modelo em variações de iluminação e ângulo
- Meta de acurácia mínima: **85%**

### Hardware
- [Arduino](https://www.arduino.cc/) — controle e movimentação do braço mecânico
- **Impressora 3D** — fabricação do protótipo físico do braço com pinça automatizada
- **Servomotores** — movimentação dos eixos com precisão para aproximação e posicionamento
- **Sensores IoT** — temperatura, umidade do solo e umidade do ar (não implementado)

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
│  React (Web)     │  Node.js +       │  Sensores IoT          │
│                  │  TypeScript      │  (temp, umidade)       │
│  React Native    │  APIs RESTful    │                        │
│  (Mobile / TS)   │                  │  Braço Mecânico 3D     │
│                  │  MongoDB Atlas   │  (Arduino + Servos)    │
│  Figma (UX)      │  (nuvem / AWS)   │                        │
│                  │                  │  CNN / Visão Comp.     │
│                  │                  │  (maturação da lichia) │
└──────────────────┴──────────────────┴────────────────────────┘
```

---

## 📁 Estrutura do Projeto

```
Mobo/
├── .github/
│   └── workflows/            # CI/CD e auto-assign de issues
├── backend/
│   ├── src/                  # Código-fonte da API
│   ├── uploads/              # Arquivos de upload
│   ├── .env.exemplo          # Exemplo de variáveis de ambiente
│   ├── package.json
│   └── tsconfig.json
├── front-end/
│   ├── mobile/               # Aplicativo React Native + Expo
│   │   ├── app/              # Telas do aplicativo (.tsx)
│   │   │   ├── _layout.tsx
│   │   │   ├── alertas.tsx
│   │   │   ├── cadastro.tsx
│   │   │   ├── cadastroTerreno.tsx
│   │   │   ├── curiosidades.tsx
│   │   │   ├── dashboard.tsx
│   │   │   ├── garra.tsx
│   │   │   ├── home.tsx
│   │   │   ├── login.tsx
│   │   │   ├── perfil.tsx
│   │   │   ├── previsao-de-colheita.tsx
│   │   │   └── sensores.tsx
│   │   ├── assets/images/
│   │   ├── app.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/                  # Aplicação Next.js
│       ├── public/
│       ├── src/
│       ├── next.config.ts
│       ├── package.json
│       └── tsconfig.json
├── .gitignore
└── README.md
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Expo Go](https://expo.dev/go) instalado no celular (para o mobile)

### 1. Clonar o Repositório

```bash
git clone https://github.com/Cypher-Wave/Mobo.git
cd Mobo
```

### 2. Backend (Node.js + TypeScript)

```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.exemplo .env
# Edite o .env com suas credenciais (veja o modelo abaixo)
```

O arquivo `.env` deve conter:

```env
MONGODB_URI=sua_string_de_conexao_mongodb
PORT=3001
JWT_SECRET=sua_chave_secreta
```

```bash
# Rodar em modo desenvolvimento
npm run dev
```

A API ficará disponível em `http://localhost:3001`.

### 3. Frontend Web (Next.js)

```bash
cd front-end/web

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

> 💡 O Next.js sobe na porta **3000** e o backend na **3001** por padrão. Certifique-se de que ambas estejam livres.

### 4. Mobile (React Native + Expo)

```bash
cd front-end/mobile

# Instalar dependências
npm install

# Rodar com Expo
npx expo start
```

Escaneie o QR Code com o aplicativo **Expo Go** no celular, ou pressione:
- `a` — abre no emulador Android
- `i` — abre no simulador iOS
- `w` — abre no navegador

---

## 🧪 Instruções de Testes

### Backend

```bash
cd backend

# Rodar todos os testes
npm test

# Rodar testes com cobertura
npm run test:coverage
```

### Frontend Web

```bash
cd front-end/web

# Rodar testes unitários
npm test
```

### Mobile

```bash
cd front-end/mobile

# Rodar testes
npm test
```

> ⚠️ Os testes de sistema completo (integração IoT + braço mecânico + IA) estão em desenvolvimento e serão implementados nas próximas sprints.

---

## 🔗 Links Importantes

| Recurso | Link |
|---------|------|
| 📖 Documentação da API (Swagger) | `Em breve` |
| 🌐 Deploy — Frontend Web | `Em breve` |
| 📱 Deploy — Mobile (Expo) | `Em breve` |
| 🎨 Protótipo Figma | `Em breve` |

> 🔔 Os links de Swagger e Deploy serão adicionados assim que disponibilizados. Acompanhe as [issues](https://github.com/Cypher-Wave/Mobo/issues) do projeto para atualizações.

---

## 👥 Equipe

| Nome | Função | GitHub |
|------|--------|--------|
| Bárbara Vitória Ferreira dos Santos | Frontend & UI/UX e Mobile | [@babi-s4ntos](https://github.com/babi-s4ntos) |
| Jaquelaine Aparecida de Ramos | Documentação/IA | [@jk-ramos](https://github.com/jk-ramos) |
| Lucas de Lima Santana | IoT/IA | [@LucasLiSan](https://github.com/LucasLiSan) |
| Pedro Henrique Venâncio | Backend & DevOps/Mobile | [@phvenancio](https://github.com/phvenancio) |

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
- [ ] Modelo de IA (CNN) para reconhecimento do estágio de maturação *(próximo semestre)*
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
