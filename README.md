# ELECTRON AI OS - Enterprise Artificial Intelligence Operating System

![Version](https://img.shields.io/badge/version-1.0--Premium-Enterprise-blue)
![License](https://img.shields.io/badge/license-ISC-green)

**Plateforme Internationale d'Intelligence Artificielle pour la Gestion Intégrale des Entreprises**

---

## 🚀 Présentation

**ELECTRON AI OS** est une plateforme de gestion d'entreprise intelligente tout-en-un, pilotée par une orchestration de multiples agents IA spécialisés. Elle centralise les fonctions ERP, CRM, Commerce électronique, Marketing et bien plus encore dans une interface unifiée.

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
git clone https://github.com/IlarionDossouyovo/ELECTRON-Stack-AI.git
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
  <strong>ELECTRON AI OS - L'intelligence artificielle au service de votre entreprise</strong>
</p>

---

## 🎯 Positionnement

ELECTRON AI OS n'est pas un simple logiciel.

Il constitue un **Enterprise AI Operating System (AIOS)** capable de gérer intégralement une entreprise.

---

## 🏗️ Architecture Générale

### Interface
- Application Web (React + Next.js)
- Application Desktop (Electron)
- Application Mobile
- API publique
- SDK développeurs

### Couche IA (E-Stack AI)
- Multi-Agent Orchestrator
- AI Planner
- Memory Engine
- Long-Term Memory
- Knowledge Graph
- RAG Engine
- AI Workflow Engine
- Prompt Engine
- Model Router
- Agent Communication Bus
- AI Monitoring

### Couche Business
- ERP
- CRM
- HRM
- SCM
- WMS
- TMS
- MES
- CMS
- BI
- E-commerce
- Finance
- Marketing
- Support Client
- Juridique

### Couche Infrastructure
- Docker
- Kubernetes
- PostgreSQL
- Redis
- Qdrant
- MinIO
- Nginx
- Traefik
- Prometheus
- Grafana

---

## 🤖 Écosystème Multi-Agent IA

### Direction
- CEO AI
- COO AI
- CTO AI
- CFO AI
- CIO AI
- CMO AI
- CHRO AI

### Développement
- Software Architect AI
- Backend AI
- Frontend AI
- DevOps AI
- QA AI
- Security AI

### Marketing
- SEO AI
- SEA AI
- Copywriter AI
- Social Media AI
- Community Manager AI
- Publicité IA
- Email Marketing AI
- Funnel AI
- Branding AI
- Designer AI
- Video AI
- Motion AI

### Commerce
- Sales AI
- CRM AI
- Pricing AI
- Marketplace AI
- Dropshipping AI
- Procurement AI

### Industrie
- Factory AI
- Production AI
- Maintenance AI
- IoT AI
- Quality AI

### Finance
- Accounting AI
- Treasury AI
- Audit AI
- Tax AI

### Juridique
- Legal AI
- Contract AI
- Compliance AI

### RH
- Recruiter AI
- Payroll AI
- Learning AI

### Support
- Chatbot AI
- Voicebot AI
- Ticket AI
- Customer Success AI

### Analyse
- BI AI
- Forecast AI
- Risk AI
- Strategy AI

### Cybersécurité
- SOC AI
- Threat Detection AI
- Pentest AI
- Incident Response AI

---

## ⚙️ Moteur d'Automatisation E-Stack AI

En remplacement de n8n, la plateforme intègre un orchestrateur natif.

Fonctionnalités:
- Déclencheurs par événement
- Déclencheurs planifiés
- Déclencheurs API
- Déclencheurs Webhook
- Orchestration multi-agents
- Exécution parallèle
- Validation humaine
- Journal des workflows
- Versionnage
- Rollback
- Interface visuelle Drag & Drop
- Exécution distribuée
- File d'attente intelligente
- Gestion des priorités
- Mémoire contextuelle persistante
- Supervision temps réel

---

## 📊 Modules Enterprise

### ERP Enterprise
- Comptabilité
- Trésorerie
- Budget
- Facturation
- Immobilisations
- Production
- Maintenance
- Stocks
- Achats
- Ventes
- RH
- Paie
- Planning
- Qualité
- Audit
- Documents

### CRM Enterprise
- Prospects
- Pipeline
- Contrats
- Opportunités
- SAV
- Agenda
- Campagnes
- IA prédictive
- Scoring intelligent
- Segmentation
- Fidélisation

### Commerce International
Connecteurs natifs:
- Amazon
- Alibaba
- AliExpress
- eBay
- Walmart
- Etsy
- Temu
- CJ Dropshipping
- Shopify
- WooCommerce
- Magento
- PrestaShop
- BigCommerce
- OpenCart

### Paiements
- Stripe
- PayPal
- Flutterwave
- Paystack
- CinetPay
- MTN Mobile Money
- Orange Money
- Apple Pay
- Google Pay
- Wise

### Réseaux Sociaux
- Facebook
- Instagram
- LinkedIn
- TikTok
- TikTok Shop
- X
- YouTube
- WhatsApp Business
- Telegram
- Discord
- Pinterest

---

## 📈 Business Intelligence

- KPI temps réel
- IA prédictive
- Alertes intelligentes
- Rapports PDF
- Rapports Excel
- Rapports Power BI
- Cartographie décisionnelle
- Détection d'anomalies
- Recommandations stratégiques

---

## 🔐 Sécurité Enterprise

- MFA
- OAuth2
- OpenID Connect
- JWT
- TLS 1.3
- AES-256
- RBAC
- ABAC
- SIEM intégré
- Audit complet
- Sauvegardes automatiques
- PCA
- PRA
- Conformité RGPD, ISO 27001 et SOC 2

---

## 🎛️ Dashboard Fondateur (Founder Control Center)

Le fondateur dispose d'un centre de commandement unique avec:
- Carte mondiale des entreprises clientes
- État de santé des serveurs
- Supervision Docker et Kubernetes
- Gestion des modèles Ollama
- Consommation GPU/CPU/RAM
- Contrôle des agents IA
- Validation des décisions critiques
- Gestion des licences
- Monitoring financier
- Surveillance cybersécurité
- Centre DevOps
- Contrôle des workflows
- Journal d'activité global
- Marketplace des modules
- Centre d'administration API
- Tableau de bord ESG et indicateurs stratégiques

---

## 🗺️ Roadmap

**Phase 1:** Infrastructure, sécurité, authentification, Docker, Ollama, base de données

**Phase 2:** ERP, CRM, gestion documentaire et tableau de bord

**Phase 3:** E-Stack AI (orchestrateur multi-agents, RAG, mémoire)

**Phase 4:** Connecteurs e-commerce, marketplaces, paiements et réseaux sociaux

**Phase 5:** Automatisation native, workflows, supervision et BI

**Phase 6:** Modules industriels, IoT, cybersécurité et conformité

**Phase 7:** Marketplace, SDK, API publiques, SaaS multi-tenant et haute disponibilité

**Phase 8:** Intégration complète de l'écosystème ELECTRON (E-Seller, E-Traders, E-Graphisme, E-Studio, E-Immo, E-Logistique, etc.) sous un pilotage unifié par le **CEO AI**

---

## 🎯 Vision Finale

**ELECTRON AI OS** devient un véritable **système d'exploitation d'entreprise**, capable de coordonner l'ensemble des activités d'une organisation grâce à **E-Stack AI**, son moteur d'intelligence artificielle. Conçu pour fonctionner aussi bien en local (Docker + Ollama) qu'en environnement cloud, il offrira une architecture modulaire, sécurisée et extensible, permettant à chaque entreprise d'activer uniquement les modules et agents dont elle a besoin tout en bénéficiant d'une automatisation intelligente à l'échelle de l'ensemble de ses opérations. Ce positionnement le rapproche davantage d'un **SAP nouvelle génération, enrichi par une orchestration IA native**, que d'un simple ERP ou CRM traditionnel.

---

## 👤 Auteur

**Ilarion Dossouyovo**
- GitHub: [@IlarionDossouyovo](https://github.com/IlarionDossouyovo)

---

<p align="center">
  <strong>ELECTRON AI OS - One Intelligence. Infinite Business.</strong>
</p>
