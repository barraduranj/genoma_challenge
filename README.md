# Genoma Challenge 2026

Repositorio con el proyecto solicitado como parte de la postulación al cargo de Ingeniero de Software Junior en Genomawork.

## Stack tecnológico

- **Backend**: FastAPI (Python 3.14)
- **Frontend**: React 19 (Vite 8 + Javascript), Node.js v24.15.0
- **Base de datos relacional**: SQLite
- **Librería de componentes**: Material UI 9
- **Sistema de control de versiones**: Git
- **Nube de repositorio público**: GitHub

> Desarrollado y probado en Ubuntu 24.04.4 LTS

## Versiones mínimas recomendadas

- Python 3.12+
- Node.js 20.19+ o 22.12+

## ¿Cómo ejecutar el proyecto?

1. Clonar el repositorio con `git clone https://github.com/barraduranj/genoma_challenge.git`
2. Entrar al directorio `genoma_challenge`

### En MacOS/Linux

3. Ejecutar `bash setup.sh`
4. Ejecutar `bash init.sh`
5. El servidor se iniciará automáticamente en `http://localhost:8000`

### En Windows (o como fallback de MacOS/Linux)

3. Instalar dependencias del backend:

```cmd
cd back
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

> Reemplazar `venv\Scripts\activate` por `source venv/bin/activate` en Linux/MacOS.

4. Instalar dependencias del frontend y compilar:

```cmd
cd front
npm install
npm run build
cd ..
```

6. Iniciar el servidor:

```cmd
cd back
venv\Scripts\activate
uvicorn main:app
```

> Reemplazar `venv\Scripts\activate` por `source venv/bin/activate` en Linux/MacOS.

7. Ir a `http://localhost:8000` (o el puerto que se muestre en la terminal)

## Supuestos de cosas que no se mencionaron en el enunciado

- No se indica qué base de datos usar, por lo que se eligió SQLite.
- Dado que la simulación era destinada a una sola persona, no se aplicó rate limiting en los endpoints.
- La escala de calificación de los restaurantes se consideró de 0 a 5, con incrementos de 0.5, dado el contexto de lugares para comer.
- Se optó por usar el componente DataGrid para cumplir con el requisito de los filtros y ordenamiento en el cliente, a diferencia de una implementación manual con algoritmo de sort.
- Se insertan datos de prueba al iniciar la aplicación (si la tabla está vacía) para facilitar la prueba del frontend.

## Notas adicionales

- El archivo con el listado de paises se descargó de [world_countries](https://github.com/stefangabos/world_countries/blob/master/data/countries/es/countries.json).
