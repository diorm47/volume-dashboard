import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FillCode from "./fill-code";
import "./login-auth.css";
import Snackbar from "../../components/snackbar/snackbar";

function Login() {
  const [section, setSection] = useState(1);
  const [errorResponce, setErrorResponce] = useState(false);
  useEffect(() => {
    if (errorResponce) {
      setTimeout(() => {
        setErrorResponce(false);
      }, 3000);
    }
  }, [errorResponce]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setErrorResponce(false);
    if (!validateEmail(newEmail)) {
      setEmailError("Неправильный email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setErrorResponce(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const loginAction = () => {
    let headersList = {
      Accept: "*/*",
    };

    let bodyContent = new FormData();
    bodyContent.append("email", email);
    bodyContent.append("password", password);

    fetch("https://trade.margelet.org/public-api/v1/users/login", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.data.user.token);
        setSection(2);
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorResponce(true);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setPasswordError("Введите email и пароль");
    } else {
      setPasswordError("");
      loginAction();
    }
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

  // hide modal
  const handleClickHideSnackbar = () => {
    setErrorResponce(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickHideSnackbar);
    return () => {
      document.removeEventListener("click", handleClickHideSnackbar);
    };
  }, []);

  return (
    <div className="login_page_wrapper">
      {section === 1 ? (
        <div className="login_page">
          <div className="login_title">
            <h2>Войти</h2>
          </div>
          <div
            id="loginForm"
            className={errorResponce ? "error_filled_status" : ""}
          >
            <div>
              <div className="login_input_titles">
                <p>Электронная почта</p>
              </div>
              <div className={`login_input ${emailError ? "error_input" : ""}`}>
                <input
                  type="email"
                  id="username"
                  value={email}
                  onChange={handleEmailChange}
                  className={getInputClass("field1")}
                  onFocus={() => handleFocus("field1")}
                  onBlur={handleBlur}
                />
                {email && (
                  <svg
                    id="clearUsername"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    onClick={() => setEmail("")}
                  >
                    <path
                      d="M9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15ZM9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM10.9425 6L9 7.9425L7.0575 6L6 7.0575L7.9425 9L6 10.9425L7.0575 12L9 10.0575L10.9425 12L12 10.9425L10.0575 9L12 7.0575L10.9425 6Z"
                      fill="#EAEAEA"
                    />
                  </svg>
                )}
                <div className="error_email">{emailError}</div>
              </div>
            </div>
            <div>
              <div className="login_input_titles recovery_password">
                <p>Пароль</p>
                <NavLink to="/reset"> Забыли пароль?</NavLink>
              </div>

              <div
                className={`login_input ${passwordError ? "error_input" : ""}`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={getInputClass("field2")}
                  onFocus={() => handleFocus("field2")}
                  onBlur={handleBlur}
                />
                {password && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="togglePassword"
                    className="not_visible_password"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    onClick={handleTogglePassword}
                  >
                    <path
                      d="M1.5 3.9525L2.46 3L15 15.54L14.0475 16.5L11.7375 14.19C10.875 14.475 9.96 14.625 9 14.625C5.25 14.625 2.0475 12.2925 0.75 9C1.2675 7.68 2.0925 6.5175 3.1425 5.595L1.5 3.9525ZM9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9C11.2504 9.25542 11.2073 9.50905 11.1225 9.75L8.25 6.8775C8.49095 6.79274 8.74458 6.74962 9 6.75ZM9 3.375C12.75 3.375 15.9525 5.7075 17.25 9C16.6379 10.5549 15.5977 11.9045 14.25 12.8925L13.185 11.82C14.2222 11.1025 15.0587 10.1318 15.615 9C15.0087 7.76245 14.0673 6.71983 12.898 5.99063C11.7286 5.26143 10.3781 4.87491 9 4.875C8.1825 4.875 7.38 5.01 6.63 5.25L5.475 4.1025C6.555 3.6375 7.7475 3.375 9 3.375ZM2.385 9C2.99133 10.2375 3.93268 11.2802 5.10205 12.0094C6.27142 12.7386 7.6219 13.1251 9 13.125C9.5175 13.125 10.0275 13.0725 10.5 12.9675L8.79 11.25C8.26812 11.1941 7.78112 10.9612 7.40998 10.59C7.03884 10.2189 6.80594 9.73188 6.75 9.21L4.2 6.6525C3.4575 7.29 2.835 8.085 2.385 9Z"
                      fill="#EAEAEA"
                    />
                  </svg>
                )}
                {password && (
                  <svg
                    className="visible_password"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    onClick={handleTogglePassword}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 7.001V7C2.003 6.984 2.017 6.896 2.095 6.723C2.181 6.532 2.32 6.292 2.519 6.015C2.917 5.462 3.512 4.823 4.264 4.217C5.777 2.996 7.812 2 10 2C12.188 2 14.223 2.996 15.736 4.216C16.488 4.822 17.083 5.461 17.481 6.014C17.681 6.291 17.819 6.531 17.905 6.722C17.983 6.895 17.997 6.983 18 6.999V7C17.997 7.016 17.983 7.104 17.905 7.277C17.787 7.52619 17.645 7.76331 17.481 7.985C17.083 8.538 16.488 9.177 15.736 9.783C14.224 11.004 12.188 12 10 12C7.812 12 5.777 11.004 4.264 9.784C3.512 9.178 2.917 8.539 2.519 7.986C2.35491 7.7644 2.2129 7.52727 2.095 7.278C2.05129 7.19024 2.01935 7.09711 2 7.001ZM10 0C7.217 0 4.752 1.254 3.009 2.659C2.132 3.365 1.409 4.133 0.896 4.846C0.653079 5.17599 0.443708 5.52941 0.271 5.901C0.123 6.23 0 6.611 0 7C0 7.388 0.123 7.771 0.27 8.099C0.425 8.441 0.64 8.799 0.896 9.154C1.409 9.867 2.132 10.634 3.009 11.341C4.752 12.746 7.217 14 10 14C12.783 14 15.248 12.746 16.991 11.341C17.868 10.635 18.591 9.867 19.104 9.154C19.361 8.798 19.575 8.441 19.729 8.099C19.877 7.771 20 7.389 20 7C20 6.612 19.877 6.229 19.73 5.901C19.5567 5.52949 19.347 5.1761 19.104 4.846C18.591 4.133 17.868 3.366 16.991 2.659C15.248 1.254 12.783 0 10 0ZM9 7C9 6.73478 9.10536 6.48043 9.29289 6.29289C9.48043 6.10536 9.73478 6 10 6C10.2652 6 10.5196 6.10536 10.7071 6.29289C10.8946 6.48043 11 6.73478 11 7C11 7.26522 10.8946 7.51957 10.7071 7.70711C10.5196 7.89464 10.2652 8 10 8C9.73478 8 9.48043 7.89464 9.29289 7.70711C9.10536 7.51957 9 7.26522 9 7ZM10 4C9.20435 4 8.44129 4.31607 7.87868 4.87868C7.31607 5.44129 7 6.20435 7 7C7 7.79565 7.31607 8.55871 7.87868 9.12132C8.44129 9.68393 9.20435 10 10 10C10.7956 10 11.5587 9.68393 12.1213 9.12132C12.6839 8.55871 13 7.79565 13 7C13 6.20435 12.6839 5.44129 12.1213 4.87868C11.5587 4.31607 10.7956 4 10 4Z"
                      fill="black"
                    />
                  </svg>
                )}
                <div id="error">{passwordError}</div>
              </div>
            </div>

            <button
              type="submit"
              id="submitBtn"
              disabled={!email || !password}
              onClick={handleSubmit}
            >
              Войти
            </button>
          </div>
          <div className="toggle_auth">
            <p>
              Еще нет аккаунта? <NavLink to="/auth">Создать аккаунт</NavLink>
            </p>
          </div>
          <div className="login_line"></div>
          <div className="login_privacy">
            <p>
              Продолжая регистрацию или вход, вы принимаете условия <br />
              <a target="_blank" href="https://nvolume.com/agreement.html">Пользовательского соглашения</a> и{" "}
              <a target="_blank" href="https://nvolume.com/policy.html">Политики конфиденциальности.</a>
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      {section === 2 ? (
        <div className="login_page">
          <FillCode email={email} />
        </div>
      ) : (
        ""
      )}

      <Snackbar
        text="Ошибка электронной почты или пароля. Проверьте правильность введенных данных."
        status="error"
        visible={errorResponce}
      />
    </div>
  );
}

export default Login;
