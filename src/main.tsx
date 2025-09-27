import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { PreferencesProvider } from "./context/PreferencesContext";
import { ProgressProvider } from "./context/ProgressContext";
import { registerSW } from "virtual:pwa-register";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <PreferencesProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </PreferencesProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

registerSW({ immediate: true });
