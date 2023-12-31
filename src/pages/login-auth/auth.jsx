import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordValidator from "./password-validator";
import FillCode from "./fill-code";
import Snackbar from "../../components/snackbar/snackbar";

function Auth() {
  const [section, setSection] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setAuthPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isReferralHidden, setIsReferralHidden] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isEmailError, setIsEmailError] = useState(true);
  const [errorResponce, setErrorResponce] = useState(false);
  useEffect(() => {
    if (errorResponce) {
      setTimeout(() => {
        setErrorResponce(false);
      }, 3000);
    }
  }, [errorResponce]);

  // snackbar

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackStatus, setSnackStatus] = useState("");
  const snackOptions = (text, status) => {
    setVisibleSnack(true);
    setSnackText(text);
    setSnackStatus(status);
    setTimeout(() => {
      setVisibleSnack(false);
    }, 2000);
  };
  const setNewPassword = () => {
    console.log();
  };
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
    let headersList = {
      Accept: "*/*",
    };

    let bodyContent = new FormData();
    bodyContent.append("email", email);

    fetch("https://api.nvolume.com/public-api/v1/users/email-check", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSection(3);
        } else {
          setErrorResponce(true);
          snackOptions(
            "Кажется, вы уже зарегистрированы в нашей системе. Пожалуйста, нажмите войти.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
    let headersList = {
      Accept: "*/*",
    };

    let bodyContent = new FormData();
    bodyContent.append("email", email);
    bodyContent.append("password", password);
    bodyContent.append("name", realName);
    bodyContent.append("last_name", lastName);
    bodyContent.append("password_confirmation", password);
    if (realName.length < 3 || lastName.length < 3) {
      snackOptions("Имя и фамилия должны быть не менее 3 символов", "error");
      return; // Stop the function execution
    }
    fetch("https://api.nvolume.com/public-api/v1/users/register", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.data.user.token);
        setSection(5);
      })
      .catch((error) => {
        console.error("Error:", error);

        snackOptions("Ошибка, повторите ещё раз", "error");
      });
  };

  // active
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const getInputClass = (fieldName) => {
    if (focusedField === fieldName) {
      return "input_focused";
    }
    return "inputfocused";
  };
  return (
    <div className="login_page_wrapper">
      <div className="login_page auth_page">
        {section === 1 ? (
          <div className="auth_section auth_input">
            <div className="login_title">
              <h2>Регистрация</h2>
            </div>
            <div id="loginForm" className="authForm">
              <div>
                <div className="login_input_titles">
                  <p>Электронная почта</p>
                </div>
                <div className="login_input">
                  <input
                    type="email"
                    id="username"
                    value={email}
                    onChange={handleEmailChange}
                    className={getInputClass("field1")}
                    onFocus={() => handleFocus("field1")}
                    onBlur={handleBlur}
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
                <div className="login_input_titles">
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

                <div className="login_input">
                  <input
                    type="text"
                    id="referal"
                    value={referralCode}
                    onChange={handleReferralChange}
                    className={getInputClass("field2")}
                    onFocus={() => handleFocus("field2")}
                    onBlur={handleBlur}
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

        {section === 3 ? (
          <PasswordValidator
            setAuthPassword={setAuthPassword}
            setSection={setSection}
            setNewPassword={setNewPassword}
          />
        ) : (
          ""
        )}
        {section === 4 ? (
          <div className="auth_section user_datas">
            <div className="login_title">
              <h2>Введите данные</h2>
            </div>
            <div id="loginForm" className="authForm" onSubmit={finishAuth}>
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
                    className={getInputClass("field3")}
                    onFocus={() => handleFocus("field3")}
                    onBlur={handleBlur}
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
                    className={getInputClass("field4")}
                    onFocus={() => handleFocus("field4")}
                    onBlur={handleBlur}
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
            </div>
          </div>
        ) : (
          ""
        )}
        {section === 5 ? <FillCode email={email} /> : ""}
        {section !== 5 ? (
          <>
            <div className="toggle_auth">
              <p>
                Уже есть аккаунт? <NavLink to="/login">Войти</NavLink>
              </p>
            </div>
            <div className="login_line"></div>
            <div className="login_privacy">
              <p>
                Продолжая регистрацию или вход, вы принимаете условия <br />
                <a target="_blank" href="https://nvolume.com/agreement.html">
                  Пользовательского соглашения
                </a>{" "}
                и{" "}
                <a target="_blank" href="https://nvolume.com/policy.html">
                  Политики конфиденциальности.
                </a>
              </p>
            </div>
          </>
        ) : (
          ""
        )}
        <Snackbar
          text={snackText}
          status={snackStatus}
          visible={visibleSnack}
        />
      </div>
    </div>
  );
}

export default Auth;
