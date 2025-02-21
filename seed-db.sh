#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Iniciando seed do banco de dados MongoDB..."

# Verifica se o MongoDB está rodando
if ! mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo -e "${RED}Erro: MongoDB não está rodando${NC}"
    echo "Por favor, inicie o MongoDB primeiro"
    exit 1
fi

# Executa o script de seed
if mongosh < seed-mongodb.js; then
    echo -e "${GREEN}Dados inseridos com sucesso!${NC}"
else
    echo -e "${RED}Erro ao inserir dados${NC}"
    exit 1
fi

# Verifica se os dados foram inseridos
echo "Verificando dados inseridos..."
echo "Contagem de documentos:"
echo -n "Stocks: "
mongosh --quiet --eval "db.getSiblingDB('homebroker').stocks.count()"
echo -n "Users: "
mongosh --quiet --eval "db.getSiblingDB('homebroker').users.count()"
echo -n "Transactions: "
mongosh --quiet --eval "db.getSiblingDB('homebroker').transactions.count()" 