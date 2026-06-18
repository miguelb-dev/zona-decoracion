# backend/modules/pintura/schemas.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from decimal import Decimal

# ESQUEMA DE ENTRADA: Lo que envía el React al servidor
class PinturaCreada(BaseModel): 
    # Los 'alias' corresponden EXACTAMENTE a los nombres de los inputs en React.
    # FastAPI los recibirá así y los transformará automáticamente a las variables 
    # con guiones bajos que necesita MySQL.
    
    fecha_inicio_consumo: date = Field(alias="fechaInicio")
    proveedor: str = Field(alias="proveedor") # Si el nombre es igual, el alias es opcional, pero lo dejamos por claridad
    color: str = Field(alias="color")
    numero_lote: str = Field(alias="numeroDeLote")
    cantidad_recibida: Decimal = Field(alias="cantidadRecibida")
    unidad_medida: str = Field(alias="unidadDeMedida")
    fecha_finalizacion_consumo: date = Field(alias="fechaDeFinalizacion")
    revisado_por: str = Field(alias="revisadoPor")
    
    # Optional significa que si el frontend envía esto vacío, no fallará.
    observaciones: Optional[str] = Field(default=None, alias="observaciones")

    class Config:
        # Esto permite que Pydantic acepte tanto el nombre real como el alias
        populate_by_name = True


# ESQUEMA DE SALIDA es decir Lo que el servidor le responde a React
class PinturaResponde(BaseModel):
    # Aquí definimos qué le devolvemos al frontend.
    id: int
    fecha_inicio_consumo: date
    proveedor: str
    color: str
    numero_lote: str
    cantidad_recibida: Decimal
    unidad_medida: str
    fecha_finalizacion_consumo: date
    revisado_por: str
    observaciones: Optional[str] = None

    class Config:
        # Esto es vital para que Pydantic entienda los objetos de SQLAlchemy
        from_attributes = True