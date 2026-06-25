import os
from dotenv import load_dotenv

# Importamos las herramientas clave de SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Cargamos las variables secretas de tu archivo .env
load_dotenv()

# 1. RECOLECTAR DATOS: Traemos los datos de tu .env
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD', '') # Se deja '' por si no tienes contraseña en XAMPP
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT', '3306')
DB_NAME = os.getenv('DB_NAME')

# 2. CONSTRUIR LA RUTA: SQLAlchemy necesita una "URL" específica para saber a dónde ir.
# El formato es: mysql+pymysql://usuario:contraseña@servidor:puerto/nombre_base_datos
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# 3. CREAR EL MOTOR (Engine): Es el "corazón" de SQLAlchemy que hace el trabajo pesado de conectarse a MySQL.
engine = create_engine(DATABASE_URL)

# 4. FÁBRICA DE SESIONES (SessionLocal): Es como una operadora telefónica. 
# Cada vez que FastAPI necesite hablar con la base de datos, le pedirá una línea (sesión) a esta fábrica.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 5. LA BASE (¡EL SELLO OFICIAL!): Esta es la variable que importarás en tu archivo models.py
Base = declarative_base()

# ---------------------------------------------------------
# 6. FUNCIÓN DE DEPENDENCIA PARA FastAPI
# ---------------------------------------------------------
def get_db():
    """
    Función que se usará como dependencia en los endpoints de FastAPI.
    Proporciona una sesión de base de datos y la cierra automáticamente al finalizar.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------------------------------------------------
# CÓDIGO DE PRUEBA LOCAL (Solo se ejecuta si le das a "Play" a este archivo)
# ---------------------------------------------------------
if __name__ == "__main__":
    try:
        # Intentamos encender el motor y tocar la puerta de la base de datos
        with engine.connect() as connection:
            print("¡Éxito total! Conexión a la base de datos establecida con SQLAlchemy.")
    except Exception as e:
        print(f"Uy, hubo un error al conectar: {e}")