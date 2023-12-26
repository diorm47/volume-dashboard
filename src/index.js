import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CustomProvider } from "rsuite";
import ru_RU from "rsuite/locales/ru_RU";
import ThemeWrapper from "./provider/theme-provider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* <CustomProvider
      locale={ru_RU}
      theme={localStorage.getItem("mode") === "black" ? "dark" : "light"}
    >
      <App />
    </CustomProvider> */}
     <ThemeWrapper />
  </BrowserRouter>
);
