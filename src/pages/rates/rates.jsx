import React, { useEffect } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import RatesPage from "./rates-page";
import "./rates.css";
import Transactions from "./transactions";
import { useTranslation } from "react-i18next";

function Rates({updatebalance}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [localStorage.getItem("token")]);
  
  return (
    <>
      <div className="settings_navigation">
        <NavLink to="pricing">
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
            <Route path="pricing" element={<RatesPage  updatebalance={updatebalance}/>} />
            <Route path="transactions" element={<Transactions />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Rates;
