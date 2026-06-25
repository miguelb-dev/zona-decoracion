# backend/modules/pintura/services.py

from sqlalchemy.orm import Session
from .models import PinturaInventario, PinturaRegistro, PinturaConsumo
from .schemas import RegistroCrear, ConsumoCrear


# =================================================================
# LÓGICA DE REGISTROS (ENTRADAS DE INSUMO)
# =================================================================

def registrar_registro_pintura(db: Session, datos: RegistroCrear):
    """
    Registra una entrada de pintura (registro) y suma automáticamente al inventario.
    """
    # 1. Obtenemos el registro de inventario base
    inventario = db.query(PinturaInventario).filter(PinturaInventario.id == datos.id_pintura_inventario).first()
    
    if not inventario:
        return {"status": "error", "message": "Insumo no encontrado en inventario"}

    try:
        # 2. Actualizamos el stock
        inventario.cantidad_actual += datos.cantidad_registrada

        # 3. Guardamos el formato de registro
        nuevo_registro = PinturaRegistro(**datos.model_dump(by_alias=False))
        db.add(nuevo_registro)

        # 4. Confirmamos la transacción
        db.commit()
        db.refresh(nuevo_registro)
        return {"status": "success", "id": nuevo_registro.id}
    except Exception as e:
        db.rollback()
        return {"status": "error", "message": str(e)}


# =================================================================
# LÓGICA DE CONSUMO (SALIDAS DE INSUMO)
# =================================================================

def registrar_consumo_pintura(db: Session, datos: ConsumoCrear):
    """
    Registra una salida de pintura (consumo) y resta automáticamente del inventario.
    """
    inventario = db.query(PinturaInventario).filter(PinturaInventario.id == datos.id_pintura_inventario).first()
    
    if not inventario:
        return {"status": "error", "message": "Insumo no encontrado"}

    # Validación de stock
    if inventario.cantidad_actual < datos.cantidad_consumida:
        return {"status": "error", "message": "Stock insuficiente"}

    try:
        # 1. Restamos del stock
        inventario.cantidad_actual -= datos.cantidad_consumida

        # 2. Guardamos el formato de consumo
        nuevo_consumo = PinturaConsumo(**datos.model_dump(by_alias=False))
        db.add(nuevo_consumo)

        db.commit()
        db.refresh(nuevo_consumo)
        return {"status": "success", "id": nuevo_consumo.id}
    except Exception as e:
        db.rollback()
        return {"status": "error", "message": str(e)}


# =================================================================
# LÓGICA DE CONSULTAS (LISTADOS)
# =================================================================

def listar_registros(db: Session):
    """Retorna todos los registros con la relación inventario cargada."""
    return db.query(PinturaRegistro).all()

def listar_consumos(db: Session):
    """Retorna todos los consumos con la relación inventario cargada."""
    return db.query(PinturaConsumo).all()

def obtener_inventario(db: Session):
    """Retorna todos los registros del inventario de pintura."""
    return db.query(PinturaInventario).all()