# 🚀 Guide de Démarrage Rapide - ELECTRON AI OS

Ce guide vous permet de lancer rapidement le projet ELECTRON AI OS en utilisant Docker.

---

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installé et lancé
- [Ollama](https://ollama.com) installé (pour l'IA)
- Au moins 8Go de RAM disponibles

---

## Étape 1: Lancer les Services avec Docker

```bash
# Depuis la racine du projet
cd /workspace/project/E-Stack-Ai

# Lancer tous les services
docker-compose up -d
```

Cela va démarrer:
- **PostgreSQL** (port 5432)
- **Redis** (port 6379)
- **Backend API** (port 4000)
- **Frontend** (port 3001)

---

## Étape 2: Installer Ollama (pour l'IA)

### macOS / Linux
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Windows
Télécharger depuis https://ollama.com/download/windows

### Télécharger les modèles IA
```bash
ollama pull llama3.2:latest
ollama pull llama3.1:8b
ollama pull qwen2.5-coder:7b
ollama pull phi3:mini
ollama pull nomic-embed-text:latest
```

---

## Étape 3: Accéder aux Applications

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3001 |
| Backend API | http://localhost:4000/api/v1 |
| API Docs | http://localhost:4000/api/docs |

---

## Étape 4: Identifiants par Défaut

Après le seed de la base de données:

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Founder | founder@electron-ai.com | password123 |
| Admin | admin@electron-ai.com | password123 |
| User | user@electron-ai.com | password123 |

---

## Commandes Utiles

```bash
# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Reconstruire les images
docker-compose build --no-cache

# Accéder au conteneur backend
docker exec -it electron-ai-os-backend sh

# Accéder au conteneur frontend
docker exec -it electron-ai-os-frontend sh

# Recharger les données de seed (dans le conteneur backend)
docker exec -it electron-ai-os-backend npm run seed
```

---

## Structure des Services

```
ELECTRON AI OS
├── PostgreSQL (port 5432)
│   └── Base: electron_ai_os
├── Redis (port 6379)
├── Backend (port 4000)
│   ├── API REST NestJS
│   ├── Documentation Swagger
│   └── Connexion Ollama
└── Frontend (port 3001)
    ├── Next.js 16
    └── React 19
```

---

## Résolution des Problèmes

### Ollama ne se connecte pas
- Vérifier qu'Ollama est bien lancé: `ollama serve`
- Le backend utilise `host.docker.internal:11434` pour accéder à Ollama

### Problèmes de base de données
- Attendre que PostgreSQL soit "healthy" (vérifiable avec `docker-compose ps`)
- La base de données se synchronise automatiquement

### Ports déjà utilisés
- Modifier les ports dans `docker-compose.yml`
- Ou arrêter les services utilisant ces ports

---

## Prochaines Étapes

1. ✅ Configuration Docker
2. ✅ Configuration Ollama
3. 🔄 Tests de l'application
4. Personnalisation des prompts agents IA
5. Ajout de vos propres données
