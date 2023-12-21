import React, { useEffect, useRef, useState } from "react";
import PasswordValidator from "./password-validator";
import { NavLink } from "react-router-dom";

function Reset() {
  const [section, setSection] = useState(1);
  const [email, setEmail] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isEmailError, setIsEmailError] = useState(true);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
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
  return (
    <div className="login_page_wrapper">
      <div className="login_page reset_page">
        {section === 1 ? (
          <div className="reset_section reset_username_section">
            <div className="login_title">
              <h2>Сбросить пароль</h2>
            </div>
            <div id="loginForm">
              <div>
                <div className="login_input_titles">
                  <p>Электронная почта</p>
                </div>
                <div className="login_input">
                  <input
                    type="email"
                    id="resetusername"
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

              <button
                type="submit"
                id="submitBtn"
                className="resetEmailbtn"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                Получить код подтверждения
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
                Мы отправили код на{" "}
                <span className="sending_email">{email}</span>
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
          <div className="reset_section reset_username_block">
            <div className="login_title">
              <h2>Пароль изменен</h2>
            </div>
            <p className="reset_text">Ваш пароль успешно изменен</p>
            <NavLink to="/login">
              <button type="submit" id="submitBtn">
                Войти
              </button>
            </NavLink>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Reset;
