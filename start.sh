#!/bin/bash

# ==========================================
# ELECTRON AI OS - Script de Démarrage
# ==========================================

echo "🚀 Lancement d'ELECTRON AI OS..."

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker n'est pas installé. Veuillez installer Docker Desktop.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose n'est pas installé.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker et Docker Compose sont installés${NC}"

# Vérifier si les services sont déjà lancés
if docker ps --format '{{.Names}}' | grep -q "electron-ai-os"; then
    echo -e "${YELLOW}⚠️  Les services sont déjà lancés${NC}"
    echo "Arrêt des services existants..."
    docker-compose down
fi

# Créer le réseau Docker s'il n'existe pas
docker network create electron-ai-os-network 2>/dev/null || true

# Lancer les services
echo -e "${BLUE}📦 Lancement des services Docker...${NC}"
docker-compose up -d

# Attendre que PostgreSQL soit prêt
echo -e "${BLUE}⏳ Attente de PostgreSQL...${NC}"
for i in {1..30}; do
    if docker exec electron-ai-os-postgres pg_isready -U postgres &> /dev/null; then
        echo -e "${GREEN}✓ PostgreSQL est prêt${NC}"
        break
    fi
    sleep 1
done

# Vérifier le statut
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  🎉 ELECTRON AI OS est lancé !${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "📱 Frontend:    ${BLUE}http://localhost:3001${NC}"
echo -e "🔧 Backend API:  ${BLUE}http://localhost:4000/api/v1${NC}"
echo -e "📚 API Docs:    ${BLUE}http://localhost:4000/api/docs${NC}"
echo ""
echo -e "${YELLOW}Identifiants de test:${NC}"
echo "   Founder: founder@electron-ai.com / password123"
echo "   Admin:   admin@electron-ai.com / password123"
echo "   User:    user@electron-ai.com / password123"
echo ""

# Instructions pour Ollama
echo -e "${YELLOW}⚠️  N'oubliez pas de lancer Ollama pour l'IA:${NC}"
echo "   ollama serve"
echo "   ollama pull llama3.2:latest"
echo ""
