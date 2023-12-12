import React from "react";
import { NavLink } from "react-router-dom";
import baseTop from "../../assets/images/base-top.png";
import "./base.css";
import img1 from "../../assets/images/register/image 1.png";
import img2 from "../../assets/images/register/image 3.png";
import img3 from "../../assets/images/register/image 4.png";
import img4 from "../../assets/images/register/image 5.png";
import img5 from "../../assets/images/register/image 6.png";

function Register() {
  React.useEffect(() => {
    document.title = `Регистрация биржевого аккаунта | &Volume`;
  }, []);
  return (
    <div className="base_page_wrapper">
      <div className="base_top_block">
        <div className="base_top_block_wrapper">
          <div className="base_top_block_left">
            <div className="base_top_block_wrapper_nav">
              <div>
                <p>
                  <NavLink to="/base">База знаний</NavLink>{" "}
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
                  <NavLink to="/base">Подключение</NavLink>{" "}
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
                  Регистрация биржевого аккаунта
                </p>
              </div>
            </div>
            <h1>Регистрация биржевого аккаунта</h1>
          </div>
         
        </div>
      </div>

      <div className="pages_wrapper register_page">
        <div className="register_page_top_data">
          <p>Опубликовано 1 дек 2023 г.</p>
          <p>|</p>
          <p>2 мин на чтение</p>
        </div>
        <div className="register_page_block_title">
          <h2>Как зарегистрировать личный аккаунт на сайте Binance</h2>
        </div>
        <div className="register_page_text">
          <p>
            1. Перейдите на сайт Binance и нажмите Зарегистрироваться или
            выберите метод регистрации напрямую: с помощью электронной почты,
            номера телефона или учетной записи Apple или Google.
          </p>
        </div>
        <img src={img1} alt="" />
        <div className="register_page_text_block">
          <p>
            Внимательно выбирайте тип учетной записи. После регистрации его
            нельзя будет изменить. Если вы хотите создать аккаунт организации,
            перейдите на вкладку «Корпоративный аккаунт», где представлено
            подробное руководство.
          </p>
        </div>
        <div className="register_page_text">
          <p>
            2. Введите адрес электронной почты / номер телефона. Если вы
            регистрируетесь на Binance по ссылке друга, укажите реферальный ID
            (необязательно). Прочитайте и примите Условия использования и
            Политику конфиденциальности и нажмите Далее.
          </p>
        </div>
        <img src={img2} alt="" />
        <div className="register_page_text">
          <p>
            3. На вашу электронную почту или телефон придет код верификации из
            шести цифр. Введите его в течение 30 минут и нажмите Подтвердить.
          </p>
        </div>
        <img src={img3} alt="" />
        <img src={img4} alt="" />
        <div className="register_page_text">
          <p>
            4. Затем создайте надежный пароль. Пароль должен содержать не менее
            восьми символов, одну заглавную букву и одну цифру. Нажмите Далее.
          </p>
        </div>
        <img src={img5} alt="" />
        <div className="register_page_text">
          <p>5. Поздравляем! Вы создали аккаунт Binance.</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
