# E-Stack AI - Electron AI Business OS

![Version](https://img.shields.io/badge/version-1.0--Premium-Enterprise-blue)
![License](https://img.shields.io/badge/license-ISC-green)

**Plateforme Internationale d'Intelligence Artificielle pour la Gestion Intégrale des Entreprises**

---

## 🚀 Présentation

**E-Stack AI** est une plateforme de gestion d'entreprise intelligente tout-en-un, pilotée par une orchestration de multiples agents IA spécialisés. Elle centralise les fonctions ERP, CRM, Commerce électronique, Marketing et bien plus encore dans une interface unifiée.

### Fonctionnalités Principales

- ✅ **ERP Complet** - Comptabilité, Facturation, Stocks, Achats, Ventes, Production, RH, Paie
- ✅ **CRM Premium** - Gestion prospects, Pipeline commercial, Tickets support, Campagnes
- ✅ **Assistant IA** - Orchestrateur multi-agents pour conseil et automatisation
- ✅ **Module Commercial** - Devis, Commandes, Facturation intelligente
- ✅ **Ressources Humaines** - Gestion employés, Paie, Recrutement
- ✅ **Tableau de Bord** - KPI en temps réel, Analyses, Rapports

---

## 🏗️ Architecture

### Technologies

**Frontend:**
- React 18+
- Next.js 14+
- TypeScript
- Tailwind CSS
- Lucide Icons

**Backend:**
- Node.js 22+
- NestJS
- TypeORM
- PostgreSQL

**IA:**
- Ollama (LLM locaux)
- Modèles: Llama 3.2, Llama 3.1, Qwen 2.5, Phi-3

### Structure du Projet

```
e-stack-ai/
├── frontend/          # Application Next.js
│   ├── src/
│   │   ├── app/          # Pages Next.js
│   │   └── components/   # Composants React
│   └── package.json
├── backend/           # API NestJS
│   ├── src/
│   │   ├── modules/      # Modules (auth, users, erp, crm, ai-orchestrator)
│   │   ├── database/    # Entités TypeORM
│   │   └── config/      # Configuration
│   └── package.json
├── docker-compose.yml  # Orchestration Docker
└── README.md
```

---

## ⚡ Installation Rapide

### Prérequis

- Node.js 18+
- Docker & Docker Compose
- Ollama (pour l'IA)

### Étape 1: Cloner le projet

```bash
git clone https://github.com/IlarionDossouyovo/E-Stack-Ai.git
cd E-Stack-Ai
```

### Étape 2: Lancer avec Docker

```bash
# Démarrer tous les services
npm run start

# Ou manuellement
docker-compose up -d
```

### Étape 3: Accéder aux applications

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000/api/v1
- **Documentation API:** http://localhost:4000/api/docs
- **n8n Automation:** http://localhost:5678

---

## 🤖 Configuration IA (Ollama)

### Installer Ollama

```bash
# macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Télécharger depuis https://ollama.com/download/windows
```

### Charger les modèles

```bash
ollama pull llama3.2:latest
ollama pull llama3.1:8b
ollama pull qwen2.5-coder:7b
ollama pull phi3:mini
ollama pull nomic-embed-text:latest
```

### Vérifier la connexion

L'API backend se connecte automatiquement à Ollama sur `http://localhost:11434`

---

## 🔧 Configuration des Variables d'Environnement

### Backend (.env)

```env
# Serveur
PORT=4000
NODE_ENV=development

# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=estack_ai
DB_USER=postgres
DB_PASSWORD=postgres
DB_SYNCHRONIZE=true

# JWT
JWT_SECRET=votre-secret-jwt-securise
JWT_EXPIRES_IN=7d

# IA (Ollama)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_DEFAULT_MODEL=llama3.2:latest

# Frontend
FRONTEND_URL=http://localhost:3000
```

---

## 📡 API Endpoints

### Authentification
- `POST /api/v1/auth/login` - Connexion
- `POST /api/v1/auth/register` - Inscription

### ERP
- `GET /api/v1/erp/dashboard` - Stats ERP
- `GET /api/v1/erp/products` - Liste produits
- `GET /api/v1/erp/invoices` - Liste factures
- `GET /api/v1/erp/employees` - Liste employés

### CRM
- `GET /api/v1/crm/dashboard` - Stats CRM
- `GET /api/v1/crm/contacts` - Liste contacts
- `GET /api/v1/crm/companies` - Liste entreprises
- `GET /api/v1/crm/deals` - Liste opportunités

### IA Orchestrateur
- `GET /api/v1/ai/status` - Status IA
- `POST /api/v1/ai/chat` - Chat avec IA
- `POST /api/v1/ai/orchestrate` - Orchestrer une tâche
- `POST /api/v1/ai/agent/:role` - Chat avec agent spécifique

---

## 🎯 Agents IA Disponibles

| Agent | Rôle |
|-------|------|
| `pdg` | Conseil stratégique, analyse business |
| `accountant` | Comptabilité, finances, factures |
| `salesperson` | Ventes, devis, commandes |
| `marketer` | Marketing, contenu, campagnes |
| `hr` | RH, employés, recrutement |
| `support` | Support client, tickets |
| `analyst` | Analyse de données, rapports |

---

## 🤖 Agents IA (40+)

La plateforme inclut **40+ agents IA** organisés par département :
- **Direction Générale** : PDG, DG, Assistant Exécutif
- **Finance** : Comptable, Controller, Fiscaliste, Analyste, Trésorier
- **Commerce** : Commercial, Négociateur, Devis, Commandes
- **Marketing** : 9 agents (Content, SEO, Ads, Email, Growth...)
- **Service Client** : Chatbot, SAV, Réclamations, Fidélisation
- **RH** : Recruteur, Formateur, Évaluateur
- **Production** : Maintenance, Qualité
- **Juridique** : Juriste, Contrats, Conformité
- **Achats** : Acheteur, Négociateur
- **Supply Chain** : Entrepôt, Stocks, Transport
- **Data Science** : Analyste, Data Scientist, Engineer
- **Cybersécurité** : SOC, Détection, Vulnérabilités

### Page des Agents (Fondateur uniquement)

La page `/agents` est accessible uniquement au fondateur de l'entreprise avec vérification de rôle.

---

## 🐳 Commandes Docker

```bash
# Démarrer les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Reconstruire les images
docker-compose build --no-cache

# Accéder au conteneur backend
docker exec -it estack-backend sh

# Accéder au conteneur frontend
docker exec -it estack-frontend sh
```

---

## 🔐 Sécurité

- Authentification JWT avec tokens sécurisés
- Hachage des mots de passe avec bcrypt
- Validation des entrées avec class-validator
- CORS configuré pour le frontend
- Variables d'environnement pour les secrets

---

## 📝 License

Copyright © 2024 **Technologies ELECTRON**

---

## 👤 Auteur

**Ilarion Dossouyovo**
- GitHub: [@IlarionDossouyovo](https://github.com/IlarionDossouyovo)

---

<p align="center">
  <strong>E-Stack AI - L'intelligence artificielle au service de votre entreprise</strong>
</p>
