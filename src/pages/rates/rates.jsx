import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import RatesPage from "./rates-page";
import "./rates.css";
import Transactions from "./transactions";
import { useTranslation } from "react-i18next";

function Rates() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="settings_navigation">
        <NavLink to="rates">
          <p>{t("rates")}</p>
        </NavLink>
        <NavLink to="transactions">
          <p>{t("transactions")}</p>
        </NavLink>
      </div>
      <div className="pages_wrapper settings_page">
        <div className="settings_page_wrapper">
          <Routes>
            <Route path="/" element={<RatesPage />} />
            <Route path="rates" element={<RatesPage />} />
            <Route path="transactions" element={<Transactions />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Rates;
