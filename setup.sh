#!/bin/bash

# Script de configuración automática para Genoma Challenge
echo "Iniciando configuración del proyecto..."

# 1. Configuración del Backend
echo "Configurando el Backend..."
cd back
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# 2. Configuración del Frontend
echo "Configurando el Frontend..."
cd front
npm install
cd ..

echo "Configuración completada con éxito."
echo ""
echo "Para ejecutar en modo desarrollo:"
echo "1. En una terminal: cd back && source venv/bin/activate && uvicorn main:app --reload"
echo "2. En otra terminal: cd front && npm run dev"
echo ""
echo "Para ejecutar en modo producción (servido desde FastAPI):"
echo "1. cd front && npm run build"
echo "2. cd back && source venv/bin/activate && uvicorn main:app"
echo "3. Visita http://localhost:8000"
