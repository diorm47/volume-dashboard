import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import PasswordValidator from "./password-validator";

function Auth() {
  const [section, setSection] = useState(1);
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isReferralHidden, setIsReferralHidden] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isEmailError, setIsEmailError] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleReferralChange = (e) => {
    setReferralCode(e.target.value);
  };

  const toggleReferral = () => {
    setIsReferralHidden(!isReferralHidden);
  };

  const validateEmail = (email) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    setIsSubmitDisabled(!isValidEmail);
    setIsEmailError(!isValidEmail);
  };

  const handleSubmit = () => {
    setSection(2);
  };

  // code  6
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(300); // 5 minutes timer
  const inputsRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (element, index) => {
    const value = element.value;
    setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);

    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyUp = (event, index) => {
    if (event.keyCode === 8 && index > 0) {
      // Move to previous input
      inputsRef.current[index - 1].focus();
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmitCode = () => {
    setSection(3);
    console.log("Submitted OTP:", otp.join(""));
  };

  // user data
  const [realName, setRealName] = useState("");
  const [lastName, setLastName] = useState("");

  // Проверяем, заполнены ли оба поля
  const isFormComplete = realName && lastName;

  // Обработчики событий для изменения состояния
  const handleRealNameChange = (e) => {
    setRealName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  // Обработчик отправки формы
  const handleLastSubmit = (e) => {
    e.preventDefault();
    // Здесь логика отправки данных
  };

  const finishAuth = () => {
    console.log("okey");
  };

  return (
    <div class="login_page auth_page">
      {section === 1 ? (
        <div class="auth_section auth_input">
          <div class="login_title">
            <h2>Регистрация</h2>
          </div>
          <div id="loginForm" class="authForm">
            <div>
              <div class="login_input_titles">
                <p>Электронная почта</p>
              </div>
              <div class="login_input">
                <input
                  type="email"
                  id="username"
                  class="auth_user_email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {email ? (
                  <svg
                    id="clearUsername"
                    onClick={() => setEmail("")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15ZM9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM10.9425 6L9 7.9425L7.0575 6L6 7.0575L7.9425 9L6 10.9425L7.0575 12L9 10.0575L10.9425 12L12 10.9425L10.0575 9L12 7.0575L10.9425 6Z"
                      fill="#EAEAEA"
                    />
                  </svg>
                ) : (
                  ""
                )}
                {email.length >= 1 ? (
                  <div className="error_email">
                    {!isEmailError ? "" : "Неправильный email"}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              id="referal_block"
              className={isReferralHidden ? "hidden_referal" : ""}
            >
              <div class="login_input_titles">
                <p>Реферальный код (необязательно)</p>
                <svg
                  onClick={toggleReferral}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div class="login_input">
                <input
                  type="text"
                  id="referal"
                  value={referralCode}
                  onChange={handleReferralChange}
                />
              </div>
            </div>

            <button
              id="submitBtn"
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
            >
              Создать аккаунт
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {section === 2 ? (
        <div className="auth_section fill_code">
          <div className="login_title">
            <h2>Введите код</h2>
            <p>
              Мы отправили код на <span className="sending_email">{email}</span>
            </p>
          </div>
          <div id="otp" className="fillcode_inputs">
            {otp.map((data, index) => (
              <input
                key={index}
                className="text-center form-control"
                type="password"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyUp={(e) => handleKeyUp(e, index)}
                ref={(ref) => (inputsRef.current[index] = ref)}
              />
            ))}
          </div>
          <div className="getcode_timer">
            <p>Отправить повторно ({formatTimer()})</p>
          </div>
          <button
            id="submitBtn"
            className="fill_code_svm"
            onClick={handleSubmitCode}
            disabled={otp.join("").length < 6}
          >
            Проверить
          </button>
        </div>
      ) : (
        ""
      )}
      {section === 3 ? <PasswordValidator setSection={setSection} /> : ""}
      {section === 4 ? (
        <div className="auth_section user_datas">
          <div className="login_title">
            <h2>Введите данные</h2>
          </div>
          <form id="loginForm" className="authForm" onSubmit={handleSubmit}>
            <div>
              <div className="login_input_titles">
                <p>Имя</p>
              </div>
              <div className="login_input">
                <input
                  type="text"
                  id="userrealname"
                  value={realName}
                  onChange={handleRealNameChange}
                />
                <svg
                  id="clearUsername"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  onClick={() => setRealName("")}
                >
                  <path
                    d="M9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15ZM9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM10.9425 6L9 7.9425L7.0575 6L6 7.0575L7.9425 9L6 10.9425L7.0575 12L9 10.0575L10.9425 12L12 10.9425L10.0575 9L12 7.0575L10.9425 6Z"
                    fill="#EAEAEA"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div className="login_input_titles">
                <p>Фамилия</p>
              </div>
              <div className="login_input">
                <input
                  type="text"
                  id="userlastname"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
                <svg
                  id="clearUsername"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  onClick={() => setLastName("")}
                >
                  <path
                    d="M9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15ZM9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM10.9425 6L9 7.9425L7.0575 6L6 7.0575L7.9425 9L6 10.9425L7.0575 12L9 10.0575L10.9425 12L12 10.9425L10.0575 9L12 7.0575L10.9425 6Z"
                    fill="#EAEAEA"
                  />
                </svg>
              </div>
            </div>
            <button
              id="submitBtn"
              className="last_auth_btn"
              disabled={!isFormComplete}
              onClick={() => finishAuth()}
              
            >
              Создать аккаунт
            </button>
          </form>
        </div>
      ) : (
        ""
      )}

      <div class="toggle_auth">
        <p>
          Уже есть аккаунт? <NavLink to="/login">Войти</NavLink>
        </p>
      </div>
      <div class="login_line"></div>
      <div class="login_privacy">
        <p>
          Продолжая регистрацию или вход, вы принимаете условия <br />
          <a href="./agreement.html">Пользовательского соглашения</a> и{" "}
          <a href="./policy.html">Политики конфиденциальности.</a>
        </p>
      </div>
    </div>
  );
}

export default Auth;
