# backend/modules/dashboard/router.py

from fastapi import APIRouter, HTTPException, Query
# Importamos el nuevo service que creamos y que agrupa las 3 tablas
from .services import obtener_datos_dashboard

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

# ESTE ES TU ÚNICO ENDPOINT (No agregues más)
# Lo adaptamos para que reciba las fechas exactas que maneja el frontend
@router.get("/datos")
def consultar_datos_dashboard(
    fromDate: str = Query(..., description="Fecha de inicio en formato YYYY-MM-DD"),
    toDate: str = Query(..., description="Fecha de fin en formato YYYY-MM-DD")
):
    """
    Endpoint único para el dashboard.
    Tu compañero en React enviará 'fromDate' y 'toDate' desde los inputs de fecha.
    Este endpoint devuelve los datos de producción lisa, decorados y defectuosos 
    ya agrupados y listos para los gráficos.
    """
    # Llamamos a nuestra función del service pasando las fechas del frontend
    resultado = obtener_datos_dashboard(fromDate, toDate)
    
    if resultado.get("status") == "error":
        raise HTTPException(status_code=500, detail=resultado.get("message"))
        
    return resultado