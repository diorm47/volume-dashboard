import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import img1 from "../../assets/images/register/image 1.png";
import img2 from "../../assets/images/register/image 3.png";
import { ReactComponent as Img3 } from "../../assets/images/register/bybit/3.svg";
import img3 from "../../assets/images/register/image 4.png";
import img4 from "../../assets/images/register/image 5.png";
import img5 from "../../assets/images/register/image 6.png";
import bybit1 from "../../assets/images/register/bybit/1.png";
import bybit2 from "../../assets/images/register/bybit/2.png";
// import bybit3 from "../../assets/images/register/bybit/3.png";
import "./base.css";
import { useTranslation } from "react-i18next";

function Register() {
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    document.title = `${t("registrationbase")} | &Volume`;
  }, [t]);
  const [section, setSection] = useState(1);

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
                  {t("registrationbase")}
                </p>
              </div>
            </div>
            <h1>{t("registrationbase")}</h1>
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
        <div className="register_top_togglers">
          <button
            onClick={() => setSection(1)}
            className={section == 1 ? "active_register_top_toggler" : ""}
          >
            Binance
          </button>
          <button
            onClick={() => setSection(2)}
            className={section == 2 ? "active_register_top_toggler" : ""}
          >
            Bybit
          </button>
        </div>
        {section == 1 ? (
          <>
            {" "}
            <div className="register_page_block_title">
              <h2>{t("registration.title")}</h2>
            </div>
            <div className="register_page_text">
              <p>
                {t("registration.step1")}
                <a target="_blank" href="https://www.binance.com/">
                  {" "}
                  Binance
                </a>{" "}
                {t("registration.step2")}
              </p>
            </div>
            <img src={img1} alt="" />
            <div className="register_page_text_block">
              <p>{t("registration.info1")}</p>
            </div>
            <div className="register_page_text">
              <p>{t("registration.step3")}</p>
            </div>
            <img src={img2} alt="" />
            <div className="register_page_text">
              <p>{t("registration.step4")}</p>
            </div>
            <img src={img3} alt="" />
            <img src={img4} alt="" />
            <div className="register_page_text">
              <p>{t("registration.step5")}</p>
            </div>
            <img src={img5} alt="" />
            <div className="register_page_text">
              <p>{t("registration.step6")}</p>
            </div>
          </>
        ) : (
          <>
            <div className="register_page_block_title">
              <h2>{t("bybitRegistration.title")}</h2>
            </div>
            <div className="register_page_text">
              <p>
                {t("bybitRegistration.step1")}
                <a target="_blank" href="https://www.bybit.com/en/login">
                  {" "}
                  Bybit
                </a>{" "}
                {t("bybitRegistration.step1.continuation")}
              </p>
            </div>
            <img src={bybit1} alt="" />
            <div className="register_page_text">
              <p>{t("bybitRegistration.step2")}</p>
            </div>
            <img src={bybit2} alt="" />
            <div className="register_page_text">
              <p>{t("bybitRegistration.step3")}</p>
            </div>
            <Img3 className="by_bit_api_img_" />
            <div className="register_page_text">
              <p>{t("bybitRegistration.step4")}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
