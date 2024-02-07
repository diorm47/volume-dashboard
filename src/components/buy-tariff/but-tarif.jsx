import React from "react";
import "./but-tarif.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as Icon } from "../../assets/icons/tarif-icon.svg";
import { useTranslation } from "react-i18next";
function BuyTariff() {
  const { t, i18n } = useTranslation();

  return (
    <div className="buy_tariff_notif">
      <div className="buy_tariff_wrapper">
        <div className="buy_tariff_wrapper_left">
          <Icon />
          <div>
            <p>{t("tariff.title")}</p>
            <span>{t("tariff.descr")}</span>
          </div>
        </div>
        <NavLink to="/pricing/pricing">
          <p> {t("tariff.button")}</p>
        </NavLink>
      </div>{" "}
    </div>
  );
}

export default BuyTariff;
