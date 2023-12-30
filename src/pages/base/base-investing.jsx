import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./base.css";
import { useTranslation } from "react-i18next";

function ConnectiongInvest() {
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    document.title = `${t("nav_menu_3")} | &Volume`;
  }, [t]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [localStorage.getItem("token")]);
  return (
    <div className="base_page_wrapper">
      <div className="base_top_block">
        <div className="base_top_block_wrapper">
          <div className="base_top_block_left">
            <div className="base_top_block_wrapper_nav">
              <div>
                <p>
                  <NavLink to="/base">{t("nav_menu_11")}</NavLink>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.9768 9.99999L6.85183 5.87499L8.03016 4.69666L13.3335 9.99999L8.03016 15.3033L6.85183 14.1242L10.9768 9.99916"
                      fill="#92979C"
                    />
                  </svg>
                  <NavLink to="/base">{t("connection")}</NavLink>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.9768 9.99999L6.85183 5.87499L8.03016 4.69666L13.3335 9.99999L8.03016 15.3033L6.85183 14.1242L10.9768 9.99916"
                      fill="#92979C"
                    />
                  </svg>
                  {t("nav_menu_3")}
                </p>
              </div>
            </div>
            <h1>{t("nav_menu_3")}</h1>
          </div>
        </div>
      </div>

      <div className="pages_wrapper register_page">
        <div className="register_page_top_data">
          <p>
            {t("published")} 1 {t("dec")} 2023 {t("year")}
          </p>
          <p>|</p>
          <p>2 {t("minToRead")}</p>
        </div>
        <div className="text_pages_wrapper">
          <h2>{t("investmentMethodBase.selection")}</h2>
          <p>{t("investmentMethodBase.autoTradeDescription")}</p>
          <h2>{t("investmentMethodBase.conservative")}</h2>
          <p>{t("investmentMethodBase.conservativeDescription")}</p>
          <div className="api_list_ul_ol">
            <ul>
              <li>{t("investmentMethodBase.lowRisk")}</li>
              <li>{t("investmentMethodBase.predictedProfit1")}</li>
            </ul>
            <br />
            {t("investmentMethodBase.recommendedForLowRisk")}
          </div>
          <h2>{t("investmentMethodBase.moderate")}</h2>
          <p>{t("investmentMethodBase.moderateDescription")}</p>
          <div className="api_list_ul_ol">
            <ul>
              <li>{t("investmentMethodBase.moderateRisk")}</li>
              <li>{t("investmentMethodBase.predictedProfit2")}</li>
            </ul>
            <br />
            {t("investmentMethodBase.recommendedForModerateRisk")}
          </div>
          <h2>{t("investmentMethodBase.aggressive")}</h2>
          <p>{t("investmentMethodBase.aggressiveDescription")}</p>
          <div className="api_list_ul_ol">
            <ul>
              <li>{t("investmentMethodBase.highRisk")}</li>
              <li>{t("investmentMethodBase.predictedProfit3")}</li>
            </ul>
            <br />
            {t("investmentMethodBase.recommendedForHighRisk")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectiongInvest;
