import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import RatesPage from "./rates-page";
import "./rates.css";
import Transactions from "./transactions";

function Rates() {
  return (
    <>
      <div className="settings_navigation">
        <NavLink to="rates">
          <p>Тарифы</p>
        </NavLink>
        <NavLink to="transactions">
          <p>Транзакции</p>
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
