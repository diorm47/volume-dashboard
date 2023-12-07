import React from "react";
import "./settings.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Profile from "./profile";
import ApiKeys from "./api-keys";
import Security from "./security";

function Settings() {
  return (
    <>
      <div className="settings_navigation">
        <NavLink to="profile">
          <p>Профиль</p>
        </NavLink>
        <NavLink to="security">
          <p>Безопасность</p>
        </NavLink>
        <NavLink to="api-keys">
          <p>Ключи API</p>
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
