import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { ConsumoDePintura } from "../components/Formatos/ConsumoDePintura";

// Formularios
import { ConsumirPintura } from "../components/Formatos/ConsumoDePintura/ConsumirPintura";
import { SuministrarPintura } from "../components/Formatos/ConsumoDePintura/SuministrarPintura";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Módulo Consumo de Pintura - rutas anidadas pero sin Layout extra */}
      <Route path="/consumo-pintura" element={<ConsumoDePintura />}>
        <Route path="consumir" element={<ConsumirPintura />} />
        <Route path="suministrar" element={<SuministrarPintura />} />
      </Route>
    </Routes>
  );
};
