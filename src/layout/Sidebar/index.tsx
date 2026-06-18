import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  return (
    <nav className={styles.sidebar} id="sidebar">
      <ul>
        <li>
          <Link to="/src/components/Formatos/ConsumoDePintura">
            Consumo de Pintura
          </Link>
        </li>
        <li>
          <Link to="/src/components/Dashboard">Métricas</Link>
        </li>
      </ul>
    </nav>
  );
};
