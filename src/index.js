import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CustomProvider } from "rsuite";
import ru_RU from "rsuite/locales/ru_RU";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CustomProvider locale={ru_RU}>
      <App />
    </CustomProvider>
  </BrowserRouter>
);
