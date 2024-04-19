import React, { useEffect } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import "./referal.css";

import { useTranslation } from "react-i18next";
import ReferalPage from "./referal-page";
import ReferalTransactions from "./transactions";

function Referals() {
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
        <NavLink to="referals">
          <p>{t("ref_prog")}</p>
        </NavLink>
        <NavLink to="transactions">
          <p>{t("transactions")}</p>
        </NavLink>
      </div>
      <div className="pages_wrapper settings_page">
        <div className="settings_page_wrapper">
          <Routes>
            <Route path="/" element={<ReferalPage />} />
            <Route path="referals" element={<ReferalPage />} />
            <Route path="transactions" element={<ReferalTransactions />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Referals;
