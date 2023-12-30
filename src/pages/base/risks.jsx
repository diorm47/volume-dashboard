import React from "react";
import { NavLink } from "react-router-dom";

import "./base.css";
import { useTranslation } from "react-i18next";

function Risks() {
  React.useEffect(() => {
    document.title = `Риски | &Volume`;
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
                  <NavLink to="/base">{t("nav_menu_3")}</NavLink>{" "}
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
                  {t("risks.title")}
                </p>
              </div>
            </div>
            <h1>{t("risks.title")}</h1>
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
          <h2>{t("risks.title")}</h2>
          <p>{t("risks.intro")}</p>

          <p>
            <b>1. {t("risks.marketVolatility.title")}:</b>
          </p>
          <p>
            <div className="api_list_ul_ol">
              <ul>
                <li>{t("risks.marketVolatility.description")}</li>
              </ul>
              <br />
              {t("risks.marketVolatility.consequences")}
            </div>
          </p>

          <p>
            <b>2. {t("risks.marketConditions.title")}:</b>
          </p>
          <p>
            <div className="api_list_ul_ol">
              <ul>
                <li>{t("risks.marketConditions.description")}</li>
              </ul>
              <br />
              {t("risks.marketConditions.consequences")}
            </div>
          </p>

          <p>
            <b>3. {t("risks.technical.title")}:</b>
          </p>
          <p>
            <div className="api_list_ul_ol">
              <ul>
                <li>{t("risks.technical.description")}</li>
              </ul>
              <br />
              {t("risks.technical.consequences")}
            </div>
          </p>

          <p>
            <b>4. {t("risks.regulatory.title")}:</b>
          </p>
          <p>
            <div className="api_list_ul_ol">
              <ul>
                <li>{t("risks.regulatory.description")}</li>
              </ul>
              <br />
              {t("risks.regulatory.consequences")}
            </div>
          </p>

          <p>
            <b>5. {t("risks.partner.title")}:</b>
          </p>
          <p>
            <div className="api_list_ul_ol">
              <ul>
                <li>{t("risks.partner.description")}</li>
              </ul>
              <br />
              {t("risks.partner.consequences")}
            </div>
          </p>

          <p>
            <b>6. {t("risks.liquidity.title")}:</b>
          </p>
          <p>
            <div className="api_list_ul_ol">
              <ul>
                <li>{t("risks.liquidity.description")}</li>
              </ul>
              <br />
              {t("risks.liquidity.consequences")}
            </div>
          </p>

          <p>
            <b>{t("risks.investorsShouldBeAware")}</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Risks;
