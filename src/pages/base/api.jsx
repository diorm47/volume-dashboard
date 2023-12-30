import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import img1 from "../../assets/images/api/api-b-1.png";
import img2 from "../../assets/images/api/api-b-2.png";
import img3 from "../../assets/images/api/api-b-3.png";
import img4 from "../../assets/images/api/api-b-4.png";
import img5 from "../../assets/images/api/api-b-5.png";
import img6 from "../../assets/images/api/api-b-6.png";
import img7 from "../../assets/images/api/api-b-7.png";

// import bybit1 from "../../assets/images/api/api-by-1.png";
import { ReactComponent as Bybit1 } from "../../assets/images/api/api-by-1.svg";
import bybit2 from "../../assets/images/api/api-by-2.png";
import bybit3 from "../../assets/images/api/api-by-3.png";
import bybit4 from "../../assets/images/api/api-by-4.png";
import bybit5 from "../../assets/images/api/api-by-5.png";
import bybit6 from "../../assets/images/api/api-by-6.png";

import "./base.css";
import { useTranslation } from "react-i18next";

function ApiConnectiong() {
  React.useEffect(() => {
    document.title = `API | &Volume`;
  }, []);
  const [section, setSection] = useState(1);
  const { t, i18n } = useTranslation();

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
                  {t("api")}
                </p>
              </div>
            </div>
            <h1>{t("api")}</h1>
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
           <h2>{t('createAPIKey.title')}</h2>
         </div>
         <div className="api_list_ul_ol">
           <h4>{t('createAPIKey.note')}</h4>
           <ul>
             <li>
               {t('createAPIKey.noteContent')}
             </li>
           </ul>
         </div>
         <div className="register_page_text">
           <p>
             {t('createAPIKey.step1')}
             <a
               target="_blank"
               href="https://www.binance.com/ru/my/settings/api-management"
             >
               {t('createAPIKey.apiManagement')}
             </a>{" "}
           </p>
         </div>
         <img src={img1} alt="" />
         <div className="api_list_ul_ol">
           <h4>
             {t('createAPIKey.preRequirements')}
           </h4>
           <ul>
             <li>
               {t('createAPIKey.enable2FA')}
               <a
                 target="_blank"
                 href="https://www.binance.com/ru/support/faq/account-functions?c=1&navId=1#11"
               >
                 {t('createAPIKey.2FA')}
               </a>{" "}
               {t('createAPIKey.onYourAccount')}
             </li>
             <li>
               {t('createAPIKey.depositSpotWallet')}
             </li>
             <li>
               {t('createAPIKey.completeVerification')}
               <a
                 target="_blank"
                 href="https://www.binance.com/ru/support/faq/360027287111"
               >
                 {t('createAPIKey.verifyIdentity')}
               </a>{" "}
             </li>{" "}
             <li>
               {t('createAPIKey.goToFutures')}
               <a
                 target="_blank"
                 href="https://www.binance.com/en/futures/BNXUSDT"
               >
                 {t('createAPIKey.futuresAccount')}
               </a>{" "}
             </li>
           </ul>
         </div>
         <div className="register_page_text">
           <p>{t('createAPIKey.step2')}</p>
         </div>
         <img src={img2} alt="" />
         <div className="register_page_text">
           <p>{t('createAPIKey.step3')}</p>
         </div>
         <img src={img3} alt="" />
         <div className="register_page_text">
           <p>{t('createAPIKey.step4')}</p>
         </div>
         <img src={img4} alt="" />
         <div className="register_page_text">
           <p>{t('createAPIKey.step5')}</p>
         </div>
         <img src={img5} alt="" />
         <div className="register_page_text">
           <p>
             {t('createAPIKey.step6')}
           </p>
         </div>
         <img src={img6} alt="" />
         <div className="register_page_text">
           <p>{t('createAPIKey.step7')}</p>
         </div>
         <img src={img7} alt="" />
         <div className="register_page_text">
           <p>{t('createAPIKey.step8')}</p>
         </div>
       </>
        ) : (
          <>
          <div className="register_page_block_title">
            <h2>{t('createAPIKeyBybit.title')}</h2>
          </div>
          <div className="api_list_ul_ol">
            <h4>{t('createAPIKeyBybit.note')}</h4>
            <ul>
              <li>
                {t('createAPIKeyBybit.noteContent')}
              </li>
            </ul>
          </div>
          <div className="register_page_text">
            <p>
              {t('createAPIKeyBybit.step1')}
              <a
                target="_blank"
                href="https://www.bybit.com/app/user/api-management"
              >
                {t('createAPIKeyBybit.api')}
              </a>{" "}
            </p>
          </div>
          {/* <img src={bybit1} alt="" /> */}
          <Bybit1 className="by_bit_api_img_" />
          <div className="api_list_ul_ol">
            <h4>
              {t('createAPIKeyBybit.preRequirements')}
            </h4>
            <ul>
              <li>
                {t('createAPIKeyBybit.enable2FA')}
                <a
                  target="_blank"
                  href="https://www.bybit.com/app/user/security"
                >
                  {t('createAPIKeyBybit.2FA')}
                </a>{" "}
                {t('createAPIKeyBybit.onYourAccount')}
              </li>
              <li>
                {t('createAPIKeyBybit.depositSpotWallet')}
              </li>
              <li>
                {t('createAPIKeyBybit.completeVerification')}
                <a
                  target="_blank"
                  href="https://www.bybit.com/app/user/security"
                >
                  {t('createAPIKeyBybit.verifyIdentity')}
                </a>{" "}
              </li>{" "}
            </ul>
          </div>
          <div className="register_page_text">
            <p>{t('createAPIKeyBybit.step2')}</p>
          </div>
          <img src={bybit2} alt="" />
          <div className="register_page_text">
            <p>{t('createAPIKeyBybit.step3')}</p>
          </div>
          <img src={bybit3} alt="" />
          <div className="register_page_text">
            <p>{t('createAPIKeyBybit.step4')}</p>
          </div>
          <img src={bybit4} alt="" />
          <img src={bybit5} alt="" />
          <div className="register_page_text">
            <p>
              {t('createAPIKeyBybit.step5')}
            </p>
          </div>
          <div className="register_page_text">
            <p>{t('createAPIKeyBybit.step6')}</p>
          </div>
          <div className="api_list_ul_ol">
            <h4>{t('createAPIKeyBybit.note2')}</h4>
            <ul>
              <li>
                {t('createAPIKeyBybit.noteContent2')}
              </li>
            </ul>
          </div>
          <img src={bybit6} alt="" />
          <div className="register_page_text">
            <p>{t('createAPIKeyBybit.step7')}</p>
          </div>
        </>
        )}
      </div>
    </div>
  );
}

export default ApiConnectiong;
