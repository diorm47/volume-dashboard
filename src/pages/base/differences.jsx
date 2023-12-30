import React from "react";
import { NavLink } from "react-router-dom";

import "./base.css";
import { useTranslation } from "react-i18next";

function Differences() {
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    document.title = `${t("differencesTitle")} | &Volume`;
  }, [t]);


  return (
    <div className="base_page_wrapper">
      <div className="base_top_block">
        <div className="base_top_block_wrapper">
          <div className="base_top_block_left">
            <div className="base_top_block_wrapper_nav">
              <div>
                <p>
                  <NavLink to="/base">{t("knowledgeBase")}</NavLink>{" "}
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
                  <NavLink to="/base"> {t("nav_menu_3")}</NavLink>{" "}
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
                  {t("differencesTitle")}
                </p>
              </div>
            </div>
            <h1> {t("differencesTitle")}</h1>
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
          <h2>{t("investmentMethodD.differences")}</h2>
          <p>
            {t("investmentMethodD.investmentMethodsDescription")}
            <br /> <br />
            {t("investmentMethodD.conservativeMethodDescription")}
            <br /> <br />
            {t("investmentMethodD.moderateMethodDescription")}
            <br /> <br />
            {t("investmentMethodD.aggressiveMethodDescription")}
            <br />
            <br />
            <b>{t("investmentMethodD.conclusion")}</b>
            <br />
            <br />
            {t("investmentMethodD.conservativeMethodConclusion")}
            <br />
            <br />
            {t("investmentMethodD.moderateMethodConclusion")}
            <br />
            <br />
            {t("investmentMethodD.aggressiveMethodConclusion")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Differences;
