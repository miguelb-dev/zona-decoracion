# services/dashboard_service.py

# Importamos la función genérica que acabamos de crear en utils
from backend.utils.funciones import filtrar_registros_dashboard
# Importamos defaultdict, una herramienta nativa de Python súper útil para agrupar datos
from collections import defaultdict
import datetime

def obtener_datos_dashboard(fromDate: str, toDate: str):
    """
    Obtiene y agrupa los datos de producción lisa, envases decorados y defectuosos
    para enviarlos listos para consumir por los gráficos de React.
    """
    
    # 1. Obtenemos los datos crudos de cada tabla usando nuestra función genérica.
    # Le pasamos la tabla y el nombre exacto de la columna de fecha que tiene en la BBDD.
    res_lisa = filtrar_registros_dashboard("produccion_lisa", "fecha_produccion_lisa", fromDate, toDate)
    res_decorados = filtrar_registros_dashboard("envases_decorados", "fecha_decorado", fromDate, toDate)
    res_defectuosos = filtrar_registros_dashboard("envases_defectuosos", "fecha_produccion", fromDate, toDate)

    # Si alguna de las consultas falló, retornamos el error al router inmediatamente
    if res_lisa["status"] == "error": return res_lisa
    if res_decorados["status"] == "error": return res_decorados
    if res_defectuosos["status"] == "error": return res_defectuosos

    # 2. Agrupamos los datos por fecha. 
    # El diccionario se inicializa automáticamente con 0 si es una fecha nueva.
    agrupado = defaultdict(lambda: {
        "produceLisa": 0,
        "envasesDecorados": 0,
        "envasesDefectuosos": 0
    })

    # Procesamos Producción Lisa
    for fila in res_lisa["data"]:
        # Convertimos la fecha a string (YYYY-MM-DD) para usarla como llave y enviarla al frontend
        fecha_str = str(fila["fecha_produccion_lisa"])
        agrupado[fecha_str]["produceLisa"] += fila["cantidad_produccion"]
        agrupado[fecha_str]["date"] = fecha_str # Agregamos la fecha al objeto final

    # Procesamos Envases Decorados
    for fila in res_decorados["data"]:
        fecha_str = str(fila["fecha_decorado"])
        # Ojo: Usamos "canditad_decorada" (con 't') porque así está en la tabla de la BBDD
        agrupado[fecha_str]["envasesDecorados"] += fila["canditad_decorada"]
        agrupado[fecha_str]["date"] = fecha_str

    # Procesamos Envases Defectuosos
    for fila in res_defectuosos["data"]:
        fecha_str = str(fila["fecha_produccion"])
        agrupado[fecha_str]["envasesDefectuosos"] += fila["cantidad_defectuosa"]
        agrupado[fecha_str]["date"] = fecha_str

    # 3. Convertimos el diccionario agrupado en una lista normal de Python
    resultado_final = list(agrupado.values())
    
    # Ordenamos la lista cronológicamente para que el gráfico no se dibuje al revés
    resultado_final.sort(key=lambda x: x["date"])

    # 4. Retornamos el JSON con la misma estructura del "sampleData" de React
    return {
        "status": "success",
        "data": resultado_final
    }