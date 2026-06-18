# backend/modules/pintura/router.py

from fastapi import APIRouter, HTTPException
# Importamos los esquemas que acabamos de crear
from .schemas import PinturaCreada, PinturaResponde
# Importamos la lógica de negocio de tu archivo services
from .services import registrar_nueva_pintura, listar_todas_las_pinturas

# Creamos el enrutador específico para el módulo de pintura
router = APIRouter(
    prefix="/api/pintura",
    tags=["Control de Consumo de Pintura"]
)

# RUTA PARA GUARDAR DATOS 
@router.post("/registrar", response_model=dict)
def crear_registro_pintura(datos: PinturaCreada):
    """
    Recibe los datos del formulario de React, los valida con Pydantic 
    (resolviendo el camelCase) y los guarda en la base de datos.
    """
    resultado = registrar_nueva_pintura(datos)
    
    if resultado.get("status") == "error":
        # Si algo falla en MySQL, disparamos un error HTTP 400
        raise HTTPException(status_code=400, detail=resultado.get("message"))
        
    return {"mensaje": "Control registrado con éxito", "id_insertado": resultado.get("id")}

# RUTA PARA LEER DATOS (Se usará luego para mostrar tablas o dashboards)
@router.get("/listar", response_model=dict)
def obtener_registros_pintura():
    """
    Extrae todas las filas de la tabla control_consumo_pintura.
    """
    resultado = listar_todas_las_pinturas()
    
    if resultado.get("status") == "error":
        raise HTTPException(status_code=500, detail=resultado.get("message"))
        
    return {"registros": resultado.get("data")}