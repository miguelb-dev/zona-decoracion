import { Outlet, NavLink, useLocation } from "react-router-dom";
import styles from "./consumo-de-pintura.module.css";

export const ConsumoDePintura = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/consumo-pintura";

  return (
    <div className={styles.container}>
      {/* Título del módulo (siempre visible) */}
      <header className={styles.moduleHeader}>
        <h1 className={styles.moduleTitle}>Consumo de Pintura</h1>
        <p className={styles.moduleSubtitle}>
          {isRoot
            ? "Selecciona una opción para continuar"
            : "Gestión de inventario de pintura"}
        </p>
      </header>

      {/* Si estamos en la raíz del módulo, mostramos las tarjetas */}
      {isRoot ? (
        <div className={styles.landing}>
          <div className={styles.actions}>
            <NavLink
              to="/consumo-pintura/consumir"
              className={styles.actionCard}
            >
              <div className={styles.actionIcon}>📤</div>
              <h3>Consumir Pintura</h3>
              <p>Registra la salida de pintura del inventario</p>
              <span className={styles.actionBadge}>Formulario</span>
            </NavLink>

            <NavLink
              to="/consumo-pintura/suministrar"
              className={styles.actionCard}
            >
              <div className={styles.actionIcon}>📥</div>
              <h3>Suministrar Pintura</h3>
              <p>Registra la entrada de pintura al inventario</p>
              <span className={styles.actionBadge}>Formulario</span>
            </NavLink>
          </div>
        </div>
      ) : (
        /* Si estamos en un submódulo, mostramos navegación secundaria + contenido */
        <>
          <nav className={styles.subNav}>
            <NavLink
              to="/consumo-pintura"
              className={({ isActive }) =>
                isActive
                  ? `${styles.subNavLink} ${styles.active}`
                  : styles.subNavLink
              }
            >
              ← Volver
            </NavLink>
            <span className={styles.subNavTitle}>
              {location.pathname.includes("consumir")
                ? "Consumir"
                : "Suministrar"}{" "}
              Pintura
            </span>
          </nav>

          <div className={styles.content}>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
