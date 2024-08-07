import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import { mainApi } from "../../components/utils/main-api";
import Snackbar from "../../components/snackbar/snackbar";

function Security() {
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    document.title = `${t("securitySettings")} | &Volume`;
  }, [t]);
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordConfirmModal, setPasswordConfirmModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const closeModals = () => {
    setPasswordModal(false);
    setEmailModal(false);
    setPasswordConfirmModal(false);
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

  useEffect(() => {
    if (passwordModal || passwordConfirmModal || emailModal) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      const scrollY = document.body.style.top;
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [passwordModal, passwordConfirmModal, emailModal]);

  //   // // // // // // // //

  const formatDateWithTime = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "d MMM yyyy 'г.,' HH:mm:ss", { locale: ru });
  };

  const formatDateWithoutTime = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "d MMM yyyy", { locale: ru });
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [loginHistory, setLoginHistory] = useState();
  const [email, setEmail] = useState("");

  const getLoginHistory = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://api.nvolume.com/private-api/v1/users/security/ips-history", {
      method: "GET",

      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoginHistory(data.data.ips);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refresh = () => {
    mainApi
      .reEnter()
      .then((res) => {
        const data = res.data.user;

        setEmail(data.email);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoginHistory();
      refresh();
    }
  }, [localStorage.getItem("token")]);

  // timer
  const [timer, setTimer] = useState(300);
  const startTimer = () => {
    setTimer(300);
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        clearInterval(interval);
        return 0;
      });
    }, 1000);
  };
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // reset
  const [token, setToken] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, confirmNetNewPassword] = useState("");

  const handleChangeOtp = (value) => {
    if (value.length <= 6) {
      setOtp(value);
    }
  };

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
          console.log(data.success);
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
          setToken(data.data.token);
          handleSetNewPassword(data.data.token);
        } else {
          snackOptions("Неправильный код подтверждения!", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSetNewPassword = (tokenData) => {
    let headersList = {
      Accept: "*/*",
    };

    let bodyContent = new FormData();
    bodyContent.append("email", email);
    bodyContent.append("token", tokenData);
    bodyContent.append("password", newPassword);
    bodyContent.append("password_confirmation", confirmNewPassword);

    fetch("https://api.nvolume.com/public-api/v1/users/set-new-password", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.success);
          snackOptions(t("passwordChangeSuccess"), "success");
        } else {
          snackOptions(t("passwordChangeError"), "error");
        }
        setPasswordConfirmModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCodeModal = () => {
    if (newPassword !== confirmNewPassword) {
      snackOptions("Пароль не совпадает", "error");
    } else if (newPassword.length < 8 || confirmNewPassword.length < 8) {
      snackOptions(
        "Количество символов в поле должно быть не меньше 8",
        "error"
      );
    } else {
      setPasswordModal(false);
      setPasswordConfirmModal(true);
      handleSubmit();
      startTimer();
    }
  };

  const sumbitModalHandle = () => {
    handleSubmitCode();
  };

  return (
    <>
      <div className="profile_page security_page">
        <div className="secondary_block_wrapper user_image_block">
          <h2>{t("securitySettings")}</h2>
          <p>{t("changeSettingsBelow")}</p>
          <div className="order_history_list_line"></div>
          <div className="user_data_item">
            <span>{t("currentPassword")}</span>
            <div>
              <svg
                className="password_templ"
                width="300"
                height="21"
                viewBox="0 0 300 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6359 13.074C11.3279 13.3913 10.9499 13.55 10.5019 13.55C10.0539 13.55 9.67125 13.3913 9.35391 13.074C9.04591 12.7473 8.89191 12.3693 8.89191 11.94C8.89191 11.5107 9.04591 11.1373 9.35391 10.82C9.67125 10.4933 10.0539 10.33 10.5019 10.33C10.9499 10.33 11.3279 10.4933 11.6359 10.82C11.9532 11.1373 12.1119 11.5107 12.1119 11.94C12.1119 12.3693 11.9532 12.7473 11.6359 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M32.6359 13.074C32.3279 13.3913 31.9499 13.55 31.5019 13.55C31.0539 13.55 30.6712 13.3913 30.3539 13.074C30.0459 12.7473 29.8919 12.3693 29.8919 11.94C29.8919 11.5107 30.0459 11.1373 30.3539 10.82C30.6712 10.4933 31.0539 10.33 31.5019 10.33C31.9499 10.33 32.3279 10.4933 32.6359 10.82C32.9532 11.1373 33.1119 11.5107 33.1119 11.94C33.1119 12.3693 32.9532 12.7473 32.6359 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M53.6359 13.074C53.3279 13.3913 52.9499 13.55 52.5019 13.55C52.0539 13.55 51.6712 13.3913 51.3539 13.074C51.0459 12.7473 50.8919 12.3693 50.8919 11.94C50.8919 11.5107 51.0459 11.1373 51.3539 10.82C51.6712 10.4933 52.0539 10.33 52.5019 10.33C52.9499 10.33 53.3279 10.4933 53.6359 10.82C53.9532 11.1373 54.1119 11.5107 54.1119 11.94C54.1119 12.3693 53.9532 12.7473 53.6359 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M74.6359 13.074C74.3279 13.3913 73.9499 13.55 73.5019 13.55C73.0539 13.55 72.6712 13.3913 72.3539 13.074C72.0459 12.7473 71.8919 12.3693 71.8919 11.94C71.8919 11.5107 72.0459 11.1373 72.3539 10.82C72.6712 10.4933 73.0539 10.33 73.5019 10.33C73.9499 10.33 74.3279 10.4933 74.6359 10.82C74.9532 11.1373 75.1119 11.5107 75.1119 11.94C75.1119 12.3693 74.9532 12.7473 74.6359 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M95.6359 13.074C95.3279 13.3913 94.9499 13.55 94.5019 13.55C94.0539 13.55 93.6712 13.3913 93.3539 13.074C93.0459 12.7473 92.8919 12.3693 92.8919 11.94C92.8919 11.5107 93.0459 11.1373 93.3539 10.82C93.6712 10.4933 94.0539 10.33 94.5019 10.33C94.9499 10.33 95.3279 10.4933 95.6359 10.82C95.9532 11.1373 96.1119 11.5107 96.1119 11.94C96.1119 12.3693 95.9532 12.7473 95.6359 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M116.636 13.074C116.328 13.3913 115.95 13.55 115.502 13.55C115.054 13.55 114.671 13.3913 114.354 13.074C114.046 12.7473 113.892 12.3693 113.892 11.94C113.892 11.5107 114.046 11.1373 114.354 10.82C114.671 10.4933 115.054 10.33 115.502 10.33C115.95 10.33 116.328 10.4933 116.636 10.82C116.953 11.1373 117.112 11.5107 117.112 11.94C117.112 12.3693 116.953 12.7473 116.636 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M137.636 13.074C137.328 13.3913 136.95 13.55 136.502 13.55C136.054 13.55 135.671 13.3913 135.354 13.074C135.046 12.7473 134.892 12.3693 134.892 11.94C134.892 11.5107 135.046 11.1373 135.354 10.82C135.671 10.4933 136.054 10.33 136.502 10.33C136.95 10.33 137.328 10.4933 137.636 10.82C137.953 11.1373 138.112 11.5107 138.112 11.94C138.112 12.3693 137.953 12.7473 137.636 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M158.636 13.074C158.328 13.3913 157.95 13.55 157.502 13.55C157.054 13.55 156.671 13.3913 156.354 13.074C156.046 12.7473 155.892 12.3693 155.892 11.94C155.892 11.5107 156.046 11.1373 156.354 10.82C156.671 10.4933 157.054 10.33 157.502 10.33C157.95 10.33 158.328 10.4933 158.636 10.82C158.953 11.1373 159.112 11.5107 159.112 11.94C159.112 12.3693 158.953 12.7473 158.636 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M179.636 13.074C179.328 13.3913 178.95 13.55 178.502 13.55C178.054 13.55 177.671 13.3913 177.354 13.074C177.046 12.7473 176.892 12.3693 176.892 11.94C176.892 11.5107 177.046 11.1373 177.354 10.82C177.671 10.4933 178.054 10.33 178.502 10.33C178.95 10.33 179.328 10.4933 179.636 10.82C179.953 11.1373 180.112 11.5107 180.112 11.94C180.112 12.3693 179.953 12.7473 179.636 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M200.636 13.074C200.328 13.3913 199.95 13.55 199.502 13.55C199.054 13.55 198.671 13.3913 198.354 13.074C198.046 12.7473 197.892 12.3693 197.892 11.94C197.892 11.5107 198.046 11.1373 198.354 10.82C198.671 10.4933 199.054 10.33 199.502 10.33C199.95 10.33 200.328 10.4933 200.636 10.82C200.953 11.1373 201.112 11.5107 201.112 11.94C201.112 12.3693 200.953 12.7473 200.636 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M221.636 13.074C221.328 13.3913 220.95 13.55 220.502 13.55C220.054 13.55 219.671 13.3913 219.354 13.074C219.046 12.7473 218.892 12.3693 218.892 11.94C218.892 11.5107 219.046 11.1373 219.354 10.82C219.671 10.4933 220.054 10.33 220.502 10.33C220.95 10.33 221.328 10.4933 221.636 10.82C221.953 11.1373 222.112 11.5107 222.112 11.94C222.112 12.3693 221.953 12.7473 221.636 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M242.636 13.074C242.328 13.3913 241.95 13.55 241.502 13.55C241.054 13.55 240.671 13.3913 240.354 13.074C240.046 12.7473 239.892 12.3693 239.892 11.94C239.892 11.5107 240.046 11.1373 240.354 10.82C240.671 10.4933 241.054 10.33 241.502 10.33C241.95 10.33 242.328 10.4933 242.636 10.82C242.953 11.1373 243.112 11.5107 243.112 11.94C243.112 12.3693 242.953 12.7473 242.636 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M263.636 13.074C263.328 13.3913 262.95 13.55 262.502 13.55C262.054 13.55 261.671 13.3913 261.354 13.074C261.046 12.7473 260.892 12.3693 260.892 11.94C260.892 11.5107 261.046 11.1373 261.354 10.82C261.671 10.4933 262.054 10.33 262.502 10.33C262.95 10.33 263.328 10.4933 263.636 10.82C263.953 11.1373 264.112 11.5107 264.112 11.94C264.112 12.3693 263.953 12.7473 263.636 13.074Z"
                  fill="#111112"
                />
                <path
                  d="M284.636 13.074C284.328 13.3913 283.95 13.55 283.502 13.55C283.054 13.55 282.671 13.3913 282.354 13.074C282.046 12.7473 281.892 12.3693 281.892 11.94C281.892 11.5107 282.046 11.1373 282.354 10.82C282.671 10.4933 283.054 10.33 283.502 10.33C283.95 10.33 284.328 10.4933 284.636 10.82C284.953 11.1373 285.112 11.5107 285.112 11.94C285.112 12.3693 284.953 12.7473 284.636 13.074Z"
                  fill="#111112"
                />
              </svg>

              <p
                onClick={() => setPasswordModal(true)}
                className="change_password_security_btn"
              >
                {t("changePassword")}
                <span>{t("password")}</span>
              </p>
            </div>
          </div>
          {/* <div className="order_history_list_line"></div> */}
          {/* <div className="user_data_item">
            <span>Аутентификация по email</span>
            <div>
              <p>{email || ""}</p>
              <p onClick={() => setEmailModal(true)}>Отключить </p>
            </div>
          </div> */}
        </div>
        <div className="secondary_block_wrapper user_image_block">
          <h2>{t("loginHistory.title")}</h2>
          <p>{t("loginHistory.description")}</p>
          <div className="user_login_history">
            <div className="user_login_history_titles">
              <p>{t("loginHistory.time")}</p>
              <p>{t("loginHistory.location")}</p>
              <p>{t("loginHistory.ipAddress")}</p>
            </div>
            <div className="order_history_list_line"></div>
            {loginHistory && loginHistory.length >= 1
              ? loginHistory.map((login) => (
                  <div
                    className="user_login_history_item_wrapper"
                    key={login.created_at}
                  >
                    <div className="user_login_history_item">
                      <p>
                        {isMobile
                          ? formatDateWithoutTime(login.created_at)
                          : formatDateWithTime(login.created_at)}
                      </p>
                      <p>{login.country}</p>
                      <p>{login.ip}</p>
                    </div>
                    <div className="order_history_list_line"></div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>

      <div
        className={
          passwordModal || emailModal || passwordConfirmModal
            ? "overlay visible_overlay"
            : "overlay"
        }
        onClick={closeModals}
      ></div>

      <div
        className={
          passwordModal
            ? "modal_wrapper crud_modal visible_modal_wrapper"
            : "modal_wrapper crud_modal"
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("passwordChange.title")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>{t("passwordChange.currentPassword")}</p>
            <input type="password" />
          </div>
          <div className="modal_wrapper_content_item">
            <p>{t("passwordChange.newPassword")}</p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>{t("passwordChange.confirmNewPassword")}</p>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => confirmNetNewPassword(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={getCodeModal}>
                {t("passwordChange.confirm")}
              </button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>
                {t("passwordChange.cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          passwordConfirmModal
            ? "modal_wrapper crud_modal visible_modal_wrapper"
            : "modal_wrapper  crud_modal"
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("passwordChange.title")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>
              {t("codeSentTo")} {email}
            </p>
            <div className="recovery_inputs">
              <input
                type="text"
                value={otp}
                onChange={(e) => handleChangeOtp(e.target.value)}
              />
            </div>
            <p className="recovery_time">
              {formatTimer() == "00:00" ? (
                <p onClick={getCodeModal} style={{ cursor: "pointer" }}>
                  {t("resendCodeIn")}
                </p>
              ) : (
                <p>
                  {t("resendCodeIn")} ({formatTimer()})
                </p>
              )}
            </p>
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={sumbitModalHandle} disabled={otp.length < 6}>
                {t("passwordChange.confirm")}
              </button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>{t("cancel")}</button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />

      {/* <div
        className={
          emailModal ? "modal_wrapper visible_modal_wrapper" : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("emailChange.title")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>{t("emailChange.newEmail")}</p>
            <input type="text" />
          </div>
          <div className="modal_wrapper_content_item">
            <p>{t("emailChange.confirmNewEmail")}</p>
            <input type="text" />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button
                onClick={() => {
                  setEmailModal(false);
                  setPasswordConfirmModal(true);
                }}
              >
                {t("emailChange.confirm")}
              </button>
            </div>
            <div className="modal_wrapper_cancel">
              <button>{t("emailChange.cancel")}</button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Security;
