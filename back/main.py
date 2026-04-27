from sqlmodel import Session
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
import os

from database import create_db_and_tables, engine
from routes import restaurants
from seed import seed_data

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Crear las tablas al iniciar la aplicación
    create_db_and_tables()
    with Session(engine) as session:
        seed_data(session)
    yield

app = FastAPI(
    title="Desafío Técnico Genomawork 2026",
    lifespan=lifespan
)

# Incluir las rutas de la API
app.include_router(restaurants.router)

# Ruta de salud básica
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Backend running"}

# Configuración para servir el frontend
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.join(BASE_DIR, "..", "front", "dist")
ASSETS_DIR = os.path.join(FRONTEND_DIST, "assets")

if os.path.exists(ASSETS_DIR):
    app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")

# Catch-all para servir el index.html del frontend (SPA)
@app.get("/{rest_of_path:path}")
async def serve_frontend(rest_of_path: str):
    # Si la ruta comienza con api/ y no fue capturada por los endpoints definidos arriba
    if rest_of_path.startswith("api/"):
        return {"error": "API route not found"}, 404
        
    index_file = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    
    return {"error": "Frontend build not found"}
