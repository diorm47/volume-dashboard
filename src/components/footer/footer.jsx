import React from "react";
import "./footer.css";
import QuestionWidget from "../question/question";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      {" "}
      <QuestionWidget />
      <div className="footer_wrapper">
        <div className="footer_left">
          <p>
            <span>{t("rightsReserved")}</span>
          </p>
          <p>
            <a href="#">{t("policy")}</a>
            <a href="#">{t("agreement")}</a>
          </p>
          <p className="footer_adress"><span>&VOLUME LTD. Student Enterprise Hub, Appleton Tower, 11 Crichton Street, Edinburgh, Scotland, EH8 9LE</span></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
