import React, { useEffect, useRef, useState } from "react";
import PasswordValidator from "./password-validator";
import { NavLink } from "react-router-dom";
import Snackbar from "../../components/snackbar/snackbar";
import { useTranslation } from "react-i18next";

function Reset() {
  const [section, setSection] = useState(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setAuthPassword] = useState("");
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

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (value) => {
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

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

  // actions

  const handleSubmit = () => {
    let headersList = {
      Accept: "*/*",
    };

    let bodyContent = new FormData();
    bodyContent.append("email", email);

    fetch(
      "https://api.nvolume.com/public-api/v1/users/send-password-reset-token",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSection(2);
        } else {
          snackOptions("Такой email не зарегистрирован!", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmitCode = () => {
    let headersList = {
      Accept: "*/*",
    };

    let bodyContent = new FormData();
    bodyContent.append("email", email);
    bodyContent.append("token", otp);

    fetch(
      "https://api.nvolume.com/public-api/v1/users/validate-password-reset-token",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSection(3);
          setToken(data.data.token);
        } else {
          snackOptions("Неправильный код подтверждения!", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setNewPassword = () => {
    let headersList = {
      Accept: "*/*",
    };

    let bodyContent = new FormData();
    bodyContent.append("email", email);
    bodyContent.append("token", token);
    bodyContent.append("password", password);
    bodyContent.append("password_confirmation", password);

    fetch("https://api.nvolume.com/public-api/v1/users/set-new-password", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSection(4);
        } else {
          snackOptions("Ошибка!", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { t, i18n } = useTranslation();

  return (
    <div className="login_page_wrapper">
      <div className="login_page reset_page">
        {section === 1 ? (
          <div className="reset_section reset_username_section">
            <div className="login_title">
              <h2>{t("resetPassword")}</h2>
            </div>
            <div id="loginForm">
              <div>
                <div className="login_input_titles">
                  <p>{t("email")}</p>
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
                      {!isEmailError ? "" : t("invalidEmail")}
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
                {t("getConfirmationCode")}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {section === 2 ? (
          <div className="auth_section fill_code">
            <div className="login_title">
              <h2>{t("enterCode")}</h2>
              <p>
                {t("codeSentTo")} <span className="sending_email">{email}</span>
              </p>
            </div>
            <div id="otp" className="fillcode_inputs">
              <input
                className="text-center form-control"
                type="number"
                maxLength="1"
                value={otp}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
            <div className="getcode_timer">
              <p>
                {t("resendCode")} ({formatTimer()})
              </p>
            </div>
            <button
              id="submitBtn"
              className="fill_code_svm"
              onClick={handleSubmitCode}
              disabled={otp.length < 6}
            >
              {t("verify")}
            </button>
          </div>
        ) : (
          ""
        )}

        {section === 3 ? (
          <PasswordValidator
            setSection={setSection}
            setAuthPassword={setAuthPassword}
            setNewPassword={setNewPassword}
          />
        ) : (
          ""
        )}

        {section === 4 ? (
          <div className="reset_section reset_username_block">
            <div className="login_title">
              <h2>{t("passwordChanged")}</h2>
            </div>
            <p className="reset_text">{t("passwordChangedMessage")}</p>
            <NavLink to="/login">
              <button type="submit" id="submitBtn">
                {t("login.log_title")}
              </button>
            </NavLink>
          </div>
        ) : (
          ""
        )}
      </div>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </div>
  );
}

export default Reset;
