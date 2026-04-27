#!/bin/bash

# Script de inicio en modo producción
# Ejecutar después de haber corrido setup.sh al menos una vez.

echo "Compilando el Frontend..."
cd front
npm run build
cd ..

echo "Iniciando el servidor..."
cd back
source venv/bin/activate
uvicorn main:app
