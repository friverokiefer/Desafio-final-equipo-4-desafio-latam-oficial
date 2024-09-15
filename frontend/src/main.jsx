// frontend/src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Importar Bootstrap CSS y JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Necesario para componentes como Toasts

// Importar estilos personalizados si los tienes
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
