import React from "react";
import "./not-found.css";
import { ReactComponent as Arrow } from "../../assets/icons/not-found-arrow.svg";
import { NavLink } from "react-router-dom";
import img from "../../assets/images/not-found.png";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t, i18n } = useTranslation();
  return (
    <div className="not_found_page">
      <div className="not_found_wrapper">
        <div className="not_found_left">
          <h2>{t("not_found.title")}</h2>
          <p>{t("not_found.p")}</p>
          <span>{t("not_found.desc")}</span> <br />
          <NavLink to="/">
            <button>
              <Arrow />
              {t("not_found.button")}
            </button>
          </NavLink>
        </div>
        <img src={img} alt="" />
      </div>
    </div>
  );
}

export default NotFound;
