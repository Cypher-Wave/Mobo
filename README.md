# 🍈 Projeto Mobo

> Automatização de colheita de safra de lichia através de um braço mecânico utilizando tecnologias de IoT e Inteligência Artificial.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-backend-339933?logo=node.js)
![React](https://img.shields.io/badge/React-frontend-61DAFB?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![AWS](https://img.shields.io/badge/AWS-hospedagem-FF9900?logo=amazonaws)

---

## 📋 Sobre o Projeto

O **Projeto Mobo** é uma solução multiplataforma para a colheita automatizada de lichia, integrando **IoT**, **Inteligência Artificial** e **robótica**. O sistema utiliza sensores instalados no solo para monitorar as condições da plantação e um braço mecânico equipado com visão computacional para realizar a coleta das frutas no estágio ideal de maturação.

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
- 📱 **Aplicativo Mobile** — versão mobile com todas as funcionalidades principais

---

## 🛠️ Tecnologias Utilizadas

### Backend
- [Node.js](https://nodejs.org/) — plataforma de execução JavaScript
- [Express](https://expressjs.com/) — framework para APIs RESTful
- [Mongoose](https://mongoosejs.com/) — ODM para MongoDB
- [MongoDB Atlas](https://www.mongodb.com/atlas) — banco de dados NoSQL na nuvem
- [AWS](https://aws.amazon.com/) — hospedagem e infraestrutura

### Frontend
- [React](https://react.dev/) — biblioteca para interfaces de usuário
- [Figma](https://figma.com/) — prototipação e design de interfaces

### Banco de Dados
- **MongoDB Atlas** — armazenamento principal (dados de IoT, colheitas, usuários)
- **MySQL** — modelo relacional para dados estruturados

### Ferramentas & Metodologia
- **Scrum** — metodologia ágil com Sprints iterativos
- [LucidChart](https://www.lucidchart.com/) — diagramas UML, fluxogramas e modelagem
- [XAMPP](https://www.apachefriends.org/) / [HeidiSQL](https://www.heidisql.com/) — ambiente local de banco de dados
- [BrModelo](https://www.brmodeloweb.com/) — modelagem conceitual e lógica do banco de dados

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────┐
│                    APLICAÇÃO MOBO                   │
├──────────────┬──────────────────┬───────────────────┤
│   Frontend   │     Backend      │   Hardware / IoT  │
│   (React)    │   (Node.js)      │                   │
│              │   Microsserviços │  Sensores IoT     │
│  Web App     │   APIs RESTful   │  (temp, umidade)  │
│  Mobile App  │                  │                   │
│              │   MongoDB Atlas  │  Braço Mecânico   │
│              │   (nuvem / AWS)  │  + Visão Comp.    │
└──────────────┴──────────────────┴───────────────────┘
```

---

## 👥 Equipe

| Nome | Função | GitHub / Contato |
|------|--------|-----------------|
| Bárbara Vitória Ferreira dos Santos | Frontend & UI/UX | [@babi-s4ntos](https://github.com/babi-s4ntos) |
| Jaquelaine Aparecida de Ramos | Documentação | [@jk-ramos](https://github.com/jk-ramos) |
| Lucas de Lima Santana | IoT | [@LucasLiSan](https://github.com/LucasLiSan) |
| Pedro Henrique Venâncio | Backend & DevOps | [@phvenancio](https://github.com/phvenancio) |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
- Variáveis de ambiente configuradas (`.env`)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/<seu-usuario>/PI-MOBO.git
cd PI-MOBO

# Instale as dependências do backend
cd backend
npm install

# Instale as dependências do frontend
cd ../frontend
npm install
```

### Configuração do Ambiente

Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:

```env
MONGODB_URI=sua_string_de_conexao_mongodb
PORT=3000
JWT_SECRET=sua_chave_secreta
AWS_REGION=sua_regiao
```

### Executando

```bash
# Backend
cd backend
npm run dev

# Frontend (em outro terminal)
cd frontend
npm start
```

---

## 📁 Estrutura do Projeto

```
PI-MOBO/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
├── mobile/
│   └── src/
├── docs/
│   └── diagramas/
├── .github/
│   └── workflows/
├── .gitignore
└── README.md
```

---

## 📊 Estado Atual do Desenvolvimento

- [x] Protótipo das interfaces (Web e Mobile)
- [x] CRUD completo via API RESTful
- [x] Integração com MongoDB Atlas
- [x] Dashboard com gráficos e tabelas
- [x] Modelagem conceitual e lógica do banco de dados
- [x] Diagramas UML (Classe, Objeto, Caso de Uso)
- [x] Algoritmo de ordenação QuickSort para relatórios
- [ ] Visualização em tempo real dos sensores IoT
- [ ] Controle remoto do braço mecânico
- [ ] Modelo de IA para reconhecimento do estágio de maturação
- [ ] Testes em campo (validação real)
- [ ] Adaptação para outras frutas tropicais

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
