# backend/modules/pintura/router.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database.conexion import get_db

from .services import (
    registrar_registro_pintura,
    registrar_consumo_pintura,
    listar_registros,
    listar_consumos,
    obtener_inventario
)

from .schemas import RegistroCrear, ConsumoCrear

router = APIRouter(
    prefix="/api/pintura",
    tags=["Control de Consumo de Pintura"]
)


@router.post("/registro", response_model=dict)
def crear_registro(
    datos: RegistroCrear,
    db: Session = Depends(get_db)
):
    """
    Recibe los datos de un registro de pintura (entrada al inventario),
    actualiza el stock y guarda el registro en pintura_registro.
    """
    resultado = registrar_registro_pintura(db, datos)

    if resultado.get("status") == "error":
        raise HTTPException(status_code=400, detail=resultado.get("message"))

    return {
        "mensaje": "Registro procesado con éxito",
        "id": resultado.get("id")
    }


@router.post("/consumo", response_model=dict)
def crear_consumo(
    datos: ConsumoCrear,
    db: Session = Depends(get_db)
):
    """
    Recibe los datos de un consumo de pintura (salida),
    valida stock, resta del inventario y guarda en formato_pintura_consumo.
    """
    resultado = registrar_consumo_pintura(db, datos)

    if resultado.get("status") == "error":
        raise HTTPException(status_code=400, detail=resultado.get("message"))

    return {
        "mensaje": "Consumo procesado con éxito",
        "id": resultado.get("id")
    }


@router.get("/registros", response_model=dict)
def listar_registros_endpoint(
    db: Session = Depends(get_db)
):
    """
    Devuelve todos los registros de pintura con los datos del inventario anidados.
    """
    registros = listar_registros(db)
    return {"data": registros}


@router.get("/consumos", response_model=dict)
def listar_consumos_endpoint(
    db: Session = Depends(get_db)
):
    """
    Devuelve todos los consumos de pintura con los datos del inventario anidados.
    """
    consumos = listar_consumos(db)
    return {"data": consumos}


@router.get("/inventario", response_model=dict)
def listar_inventario_endpoint(
    db: Session = Depends(get_db)
):
    """
    Devuelve todos los registros de inventario de pintura.
    """
    inventario = obtener_inventario(db)
    return {"data": inventario}