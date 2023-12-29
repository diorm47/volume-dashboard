import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./18n";
import "./index.css";
import ThemeWrapper from "./provider/theme-provider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ThemeWrapper />
  </BrowserRouter>
);
