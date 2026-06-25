import { Routes, Route } from "react-router-dom";
import { ConsumirPintura } from "../components/Formatos/ConsumoDePintura/ConsumirPintura";
import { SuministrarPintura } from "../components/Formatos/ConsumoDePintura/SuministrarPintura";
import { Dashboard } from "../components/Dashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/src/components/Formatos/ConsumoDePintura/ConsumirPintura"
        element={<ConsumirPintura />}
      ></Route>
      <Route
        path="/src/components/Formatos/ConsumoDePintura/SuministrarPintura"
        element={<SuministrarPintura />}
      ></Route>
      <Route
        path="/src/components/Dashboard"
        element={<Dashboard></Dashboard>}
      ></Route>
    </Routes>
  );
};
