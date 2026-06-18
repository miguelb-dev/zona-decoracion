#importar las clases de los archivos 
from .models import ControlConsumoPintura
from .schemas import PinturaCreada, PinturaResponde

# utils/funciones.py (importado en services.py)
from backend.utils.funciones import insertar_registro, obtener_registros

#funcion para crear un nuevo registro de pintura
def registrar_nueva_pintura(datos: PinturaCreada):
    # El nombre de tu tabla sql
    tabla = "control_consumo_pintura"
    
    # Mapeamos los datos del esquema (lo que viene del front) 
    # a las columnas exactas de tu tabla SQL
    datos_a_guardar = {
        "fecha_inicio_consumo": datos.fecha_inicio_consumo,
        "proveedor": datos.proveedor,
        "color": datos.color,
        "numero_lote": datos.numero_lote,
        "cantidad_recibida": datos.cantidad_recibida,
        "unidad_medida": datos.unidad_medida,
        "fecha_finalizacion_consumo": datos.fecha_finalizacion_consumo,
        "revisado_por": datos.revisado_por,
        "observaciones": datos.observaciones
    }
    
    # Llamamos a tu función genérica y retornamos el resultado
    return insertar_registro(tabla, datos_a_guardar)

#funcion para obtener todos los registros y rellenar la tabla del frontend
def listar_todas_las_pinturas():
    # El nombre de tu tabla según sql
    tabla = "control_consumo_pintura"
    
    # Llamamos a la función genérica de utils para traer la lista de diccionarios
    return obtener_registros(tabla)
