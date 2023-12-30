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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
