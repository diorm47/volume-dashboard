import React from "react";
import "./footer.css";
import QuestionWidget from "../question/question";

function Footer() {
  return (
    <footer>
      <QuestionWidget />

      <div className="footer_wrapper">
        <p>
          © 2023 <span>&VOLUME</span>, ВСЕ ПРАВА ЗАЩИЩЕНЫ
        </p>
      </div>
    </footer>
  );
}

export default Footer;
