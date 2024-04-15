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
        <p className="footer_left_text">
          Ⓒ 2024 &Volume. Все права защищены. &Volume LTD. Enterprise Hub,
          Appleton Tower, 11 Crichton Street Newington Student, Edinburgh EH8
          9LE
        </p>
        <div className="footer_links">
          <p>
            {" "}
            <a href="#">{t("policy")}</a>
          </p>
          <p>
            <a href="#">{t("agreement")}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
