# Importamos los tipos de datos exactos que necesita SQLAlchemy
from sqlalchemy import Column, Integer, String, Date, Numeric, Text

# Importamos un "sello oficial" desde el archivo de conexión que acabamos de arreglar.
from backend.database.conexion import Base
#Ahora le decimos a Python que vamos a crear un "molde" (una Clase) llamado ControlConsumoPintura y que este molde representa exactamente a la tabla que tenemos en MySQL
class ControlConsumoPintura(Base):
    __tablename__ = "control_consumo_pintura"

#Aquí es donde tomamos el archivo .sql y lo traducimos a Python. Por cada columna que hay en la base de datos, se crea una variable en Python.
#nullable=False significa que en MySQL le pusiste NOT NULL (es obligatorio).
#nullable=True significa que en MySQL le pusiste DEFAULT NULL (puede quedar vacío).
# Tu clave primaria, que se autoincrementa sola
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # El resto de tus campos de pintura
    fecha_inicio_consumo = Column(Date, nullable=False)
    proveedor = Column(String(100), nullable=False)
    color = Column(String(50), nullable=False)
    numero_lote = Column(String(50), nullable=False)
    
    # Numeric(10, 2) es lo mismo que decimal(10,2) en tu SQL
    cantidad_recibida = Column(Numeric(10, 2), nullable=False) 
    
    unidad_medida = Column(String(50), nullable=False)
    fecha_finalizacion_consumo = Column(Date, nullable=False)
    revisado_por = Column(String(100), nullable=False)
    
    # Las observaciones pueden quedar vacías, por eso es nullable=True
    observaciones = Column(Text, nullable=True)

#models.py. Python ya sabe exactamente cómo es tu tabla en la base de datos.

'''
# ---------------------------------------------------------
# CÓDIGO DE PRUEBA LOCAL (Solo para verificar el modelo)
# ---------------------------------------------------------
if __name__ == "__main__":
    # Importamos la "fábrica de sesiones" desde tu archivo de conexión
    from backend.database.conexion import SessionLocal

    # 1. Abrimos la conexión (descolgamos el teléfono)
    db = SessionLocal()
    
    try:
        # 2. Le pedimos a SQLAlchemy que cuente los registros usando tu Clase
        cantidad = db.query(ControlConsumoPintura).count()
        print("¡Éxito! El modelo está perfectamente enlazado a la base de datos.")
        print(f"Actualmente tienes {cantidad} registros en la tabla 'control_consumo_pintura'.")
        
    except Exception as e:
        # Si algo sale mal, nos dirá exactamente qué fue
        print(f"Uy, hubo un error al probar el modelo: {e}")
        
    finally:
        # 3. Cerramos la conexión (colgamos el teléfono)
        db.close()

#ejecuta ese codigo para ver que funcione para el 0
#python -m backend.modules.pintura.models

'''