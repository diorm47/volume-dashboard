import React from "react";
import { NavLink } from "react-router-dom";

import "./base.css";
import { useTranslation } from "react-i18next";

function Limits() {
  React.useEffect(() => {
    document.title = `Торговые лимиты | &Volume`;
  }, []);
  const { t } = useTranslation();

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
                  <NavLink to="/base"> {t("nav_menu_4")}</NavLink>{" "}
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
                  {t("tradeLimitTitle")}
                </p>
              </div>
            </div>
            <h1> {t("tradeLimitTitle")}</h1>
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
          <h2>{t("tradeAmountLimit.title")}</h2>
          <p>{t("tradeAmountLimit.description1")}</p>
          <p>
            <b>{t("tradeAmountLimit.exampleTitle")}</b>
          </p>
          <p>
            {t("tradeAmountLimit.exampleDescription", {
              tariffName: t("tradeAmountLimit.startTariffName"),
              amount: "$400",
              totalAmount: "$10,000",
            })}
          </p>
          <p>
            {t("tradeAmountLimit.exampleContinuation", {
              tariffName: t("tradeAmountLimit.startTariffName"),
              amount: "$400",
            })}
          </p>
          <p>{t("tradeAmountLimit.increaseAmountDescription")}</p>
        </div>
      </div>
    </div>
  );
}

export default Limits;
