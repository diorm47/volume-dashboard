import React from "react";
import "./footer.css";
import QuestionWidget from "../question/question";

function Footer() {
  return (
    <footer>
      {" "}
      <QuestionWidget />
      <div class="footer_wrapper">
        <div class="footer_left">
          <p>
            <span>© 2023</span> &amp;Volume, <span>все права защищены</span>
          </p>
          <p>
            <a href="#">Политика</a>
            <a href="#">Соглашение</a>
          </p>
        </div>
   
      </div>
    </footer>
  );
}

export default Footer;
