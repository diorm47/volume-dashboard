import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./profile";
import Security from "./security";
import "./settings.css";
import ApiKeys from "./api-keys";

function Settings({ setRec }) {
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
        <NavLink to="profile">
          <p>{t("profile")}</p>
        </NavLink>
        <NavLink to="security">
          <p>{t("security")}</p>
        </NavLink>
        <NavLink to="api">
          <p>API</p>
        </NavLink>
      </div>
      <div className="pages_wrapper settings_page">
        <div className="settings_page_wrapper">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="security" element={<Security />} />
            <Route path="api" element={<ApiKeys />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Settings;
