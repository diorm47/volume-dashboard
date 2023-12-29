import React from "react";
import "./settings.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Profile from "./profile";
import ApiKeys from "./api-keys";
import Security from "./security";
import { useTranslation } from "react-i18next";

function Settings() {
  const { t, i18n } = useTranslation();
  
  return (
    <>
      <div className="settings_navigation">
        <NavLink to="profile">
          <p>{t("profile")}</p>
        </NavLink>
        <NavLink to="security">
          <p>{t("security")}</p>
        </NavLink>
        <NavLink to="api-keys">
          <p>{t("apiKeys")}</p>
        </NavLink>
      </div>
      <div className="pages_wrapper settings_page">
        <div className="settings_page_wrapper">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="security" element={<Security />} />
            <Route path="api-keys" element={<ApiKeys />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Settings;
