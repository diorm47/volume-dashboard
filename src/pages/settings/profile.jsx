import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import { ReactComponent as UpdateIcon } from "../../assets/icons/update-img.svg";
import avatarImg from "../../assets/images/avatar-big.png";
import Snackbar from "../../components/snackbar/snackbar";
import { mainApi } from "../../components/utils/main-api";

function Profile() {
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    document.title = `${t("profile")} | &Volume`;
  }, []);
  const [nameModal, setNameModal] = useState(false);
  const [usernameModal, setUserNameModal] = useState(false);
  const [numberModal, setNumberModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordConfirmModal, setPasswordConfirmModal] = useState(false);

  const closeModals = () => {
    setNameModal(false);
    setUserNameModal(false);
    setNumberModal(false);
    setEmailModal(false);
    setPasswordConfirmModal(false);
  };

  useEffect(() => {
    if (nameModal || usernameModal || numberModal || emailModal) {
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
  }, [nameModal, usernameModal, numberModal, emailModal, passwordConfirmModal]);

  // crud
  const userLanguage = localStorage.getItem("locale") || "ru";
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [phone, setPhone] = useState("");
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

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const refresh = () => {
    mainApi
      .reEnter()
      .then((res) => {
        const data = res.data.user;
        setUserName(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setFormData({
          lastName: data.last_name,
          firstName: data.name,
          middleName: data.patronymic,
        });
        setAvatar(data.avatar);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      refresh();
    }
  }, [localStorage.getItem("token")]);

  const handleChangeName = () => {
    const localization = {
      en: {
        nameUpdatedSuccess: "Full name updated successfully!",
        requestError: "Error!",
      },
      ru: {
        nameUpdatedSuccess: "ФИО успешно обновлено!",
        requestError: "Ошибка!",
      },
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("name", formData.firstName);
    bodyContent.append("last_name", formData.lastName);
    bodyContent.append("patronymic", formData.middleName);

    fetch("https://api.nvolume.com/private-api/v1/users/profile/fio", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        closeModals();
        snackOptions(localization[userLanguage].nameUpdatedSuccess, "success");
      })
      .catch((error) => {
        console.log(error);
        snackOptions(localization[userLanguage].requestError, "error");
      });
  };

  const handleChangeUserName = () => {
    const localization = {
      en: {
        usernameUpdatedSuccess: "Username updated successfully!",
        requestError: "Error!",
      },
      ru: {
        usernameUpdatedSuccess: "Юзернейм успешно обновлен!",
        requestError: "Ошибка!",
      },
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("username", userName);

    fetch("https://api.nvolume.com/private-api/v1/users/profile/username", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        closeModals();
        snackOptions(
          localization[userLanguage].usernameUpdatedSuccess,
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
        snackOptions(localization[userLanguage].requestError, "error");
      });
  };

  const handleChangeEmail = () => {
    const localization = {
      en: {
        emailUpdatedSuccess: "Email address updated successfully!",
        requestError: "Error!",
      },
      ru: {
        emailUpdatedSuccess: "Адрес электронной почты успешно обновлен!",
        requestError: "Ошибка!",
      },
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("new_email", email);
    bodyContent.append("new_email_confirmation", email2);

    fetch("https://api.nvolume.com/private-api/v1/users/profile/email", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        closeModals();
        setEmailModal(false);
        setPasswordConfirmModal(true);
        snackOptions(localization[userLanguage].emailUpdatedSuccess, "success");
      })
      .catch((error) => {
        console.log(error);
        snackOptions(localization[userLanguage].requestError, "error");
      });
  };

  const handleChangePhone = () => {
    const localization = {
      en: {
        phoneUpdatedSuccess: "Phone number updated successfully!",
        requestError: "Error!",
      },
      ru: {
        phoneUpdatedSuccess: "Номер телефона успешно обновлен!",
        requestError: "Ошибка!",
      },
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("phone", phone);

    fetch("https://api.nvolume.com/private-api/v1/users/profile/phone", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        closeModals();
        snackOptions(localization[userLanguage].phoneUpdatedSuccess, "success");
      })
      .catch((error) => {
        console.log(error);
        snackOptions(localization[userLanguage].requestError, "error");
      });
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
  const handleSubmitCode = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("code", otp);

    fetch("https://api.nvolume.com/private-api/v1/users/two-factor", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        snackOptions("Почта yспушно обновлён!", "success");
        closeModals();
      })
      .catch((error) => {
        console.error("Error:", error);
        snackOptions("Ошибка!", "error");
      });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const updateAvatar = async () => {
    const localization = {
      en: {
        avatarUpdatedSuccess: "Avatar updated successfully!",
        networkError: "Network error occurred.",
      },
      ru: {
        avatarUpdatedSuccess: "Аватар успешно обновлен!",
        networkError: "Произошла ошибка сети.",
      },
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("avatar", selectedFile);

    fetch("https://api.nvolume.com/private-api/v1/users/profile/avatar", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(localization[userLanguage].networkError);
        }
        return response.json();
      })
      .then((data) => {
        snackOptions(
          localization[userLanguage].avatarUpdatedSuccess,
          "success"
        );
        setSelectedFile(null);
        refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
        snackOptions(error.message, "error");
      });
  };

  useEffect(() => {
    if (selectedFile) {
      updateAvatar();
    }
  }, [selectedFile]);

  return (
    <>
      <div className="profile_page">
        <div className="secondary_block_wrapper user_image_block">
          <h2>{t("profileImage")}</h2>
          <p>{t("changeProfileImage")}</p>
          <div className="order_history_list_line"></div>
          <div className="user_img">
            <div
              className="user_img_wrapper"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <img src={avatar || avatarImg} alt="" />
              <div className="user_img_update">
                <UpdateIcon />
              </div>
            </div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />

            <p>
              {t("supportedFormats")} <br />
              {t("maxFileSize")}
            </p>
          </div>
        </div>
        <div className="secondary_block_wrapper user_image_block">
          <h2>{t("accountInfo")}</h2>
          <p>{t("changeDataBelow")}</p>
          <div className="order_history_list_line"></div>
          <div className="user_data_item">
            <span>{t("fullName")}</span>
            <div>
              <p>
                {`${formData.lastName || ""} ${formData.firstName || ""} ${
                  formData.middleName || ""
                }`}{" "}
              </p>
              <p onClick={() => setNameModal(true)}>
                {t("change")} <span>{t("name")}</span>
              </p>
            </div>
          </div>
          <div className="order_history_list_line"></div>
          <div className="user_data_item">
            <span>{t("nickname")}</span>
            <div>
              <p>{userName || t("not_have")}</p>
              <p onClick={() => setUserNameModal(true)}>
                {t("change")} <span>{t("nickname")}</span>
              </p>
            </div>
          </div>
          <div className="order_history_list_line"></div>

          <div className="user_data_item">
            <span>{t("email")}</span>
            <div>
              <p>{email || t("not_have")}</p>
              <p onClick={() => setEmailModal(true)}>
                {t("change")} <span>{t("email")}</span>
              </p>
            </div>
          </div>
          <div className="order_history_list_line"></div>

          <div className="user_data_item">
            <span>{t("phoneNumber")}</span>
            <div>
              {phone ? <p>+{phone}</p> : <p>{t("not_have")}</p>}

              <p onClick={() => setNumberModal(true)}>
                {t("change")} <span>{t("phoneNumber")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          nameModal ||
          usernameModal ||
          numberModal ||
          emailModal ||
          passwordConfirmModal
            ? "overlay visible_overlay"
            : "overlay"
        }
        onClick={closeModals}
      ></div>

      <div
        className={
          nameModal ? "modal_wrapper visible_modal_wrapper" : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("changeName")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>{t("lastName")}</p>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>{t("firstName")}</p>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>{t("middleName")}</p>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={handleChangeName}>{t("save")}</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>{t("cancel")}</button>
            </div>{" "}
          </div>
        </div>
      </div>

      <div
        className={
          usernameModal
            ? "modal_wrapper visible_modal_wrapper"
            : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("changeUsername")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>{t("username")}</p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={handleChangeUserName}>{t("save")}</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>{t("cancel")}</button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          numberModal ? "modal_wrapper visible_modal_wrapper" : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("changePhoneNumber")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>{t("phoneNumber")}</p>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={handleChangePhone}>{t("save")}</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>{t("cancel")}</button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          emailModal ? "modal_wrapper visible_modal_wrapper" : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("changeEmail")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>{t("newEmail")}</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>{t("confirmNewEmail")}</p>
            <input
              type="text"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={handleChangeEmail}>{t("confirm")}</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>{t("cancel")}</button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          passwordConfirmModal
            ? "modal_wrapper visible_modal_wrapper"
            : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("enterCode")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>{t("codeSentTo", { email })}</p>
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
              <p>{t("resendCodeIn", { timer: formatTimer() })}</p>
            </div>
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button
                onClick={handleSubmitCode}
                disabled={otp.length < 6}
              >
                {t("confirm")}
              </button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>{t("cancel")}</button>
            </div>
          </div>
        </div>
      </div>

      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default Profile;
