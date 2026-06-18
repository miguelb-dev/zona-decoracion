import { Routes, Route } from "react-router-dom";
import { ConsumoDePintura } from "../components/Formatos/ConsumoDePintura";
import { Dashboard } from "../components/Dashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/src/components/Formatos/ConsumoDePintura"
        element={<ConsumoDePintura />}
      ></Route>
      <Route
        path="/src/components/Dashboard"
        element={<Dashboard></Dashboard>}
      ></Route>
    </Routes>
  );
};
