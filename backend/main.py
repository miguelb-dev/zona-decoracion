'''
El main.py es el cerebro ejecutable de todo el sistema
'''

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importamos el router desde tu módulo de pintura
from backend.modules.pintura.router import router as pintura_router

# Importamos el nuevo router desde tu módulo de dashboard
from backend.modules.dashboard.router import router as dashboard_router

# Inicializamos la aplicación FastAPI
app = FastAPI(
    title="API Venvidrio Zona Decoración",
    description="Backend para el control de insumos y producción",
    version="1.0.0"
)

# Configuración de CORS: Vital para que el frontend (React) 
# pueda hacer peticiones sin que el navegador lo bloquee.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registramos las rutas del módulo de pintura
app.include_router(pintura_router)

# Registramos las rutas del módulo del dashboard
app.include_router(dashboard_router)

# Ruta base de prueba
@app.get("/")
def ruta_raiz():
    return {"mensaje": "¡El servidor de la Zona de Decoración está funcionando correctamente!"}