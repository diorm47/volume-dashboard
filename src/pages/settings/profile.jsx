import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as UpdateIcon } from "../../assets/icons/update-img.svg";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import avatar from "../../assets/images/avatar.png";
import { mainApi } from "../../components/utils/main-api";
import Snackbar from "../../components/snackbar/snackbar";

function Profile() {
  React.useEffect(() => {
    document.title = `Профиль | &Volume`;
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

  const [userName, setUserName] = useState("");
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
  useEffect(() => {
    if (localStorage.getItem("token")) {
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
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [localStorage.getItem("token")]);

  const handleChangeName = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("name", formData.firstName);
    bodyContent.append("last_name", formData.lastName);
    bodyContent.append("patronymic", formData.middleName);

    fetch("https://trade.margelet.org/private-api/v1/users/profile/fio", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        closeModals();
        snackOptions("ФИО успешно обновлён!", "success");
      })
      .catch((error) => {
        console.log(error);
        snackOptions("Ошибка!", "error");
      });
  };

  const handleChangeUserName = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("username", userName);

    fetch("https://trade.margelet.org/private-api/v1/users/profile/username", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        closeModals();
        snackOptions("Юзернейм успeшно обновлён!", "success");
      })
      .catch((error) => {
        console.log(error);
        snackOptions("Ошибка!", "error");
      });
  };

  const handleChangeEmail = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("new_email", email);
    bodyContent.append("new_email_confirmation", email2);

    fetch("https://trade.margelet.org/private-api/v1/users/profile/email", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        closeModals();

        setEmailModal(false);
        setPasswordConfirmModal(true);
      })
      .catch((error) => {
        console.log(error);
        snackOptions("Ошибка!", "error");
      });
  };

  const handleChangePhone = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("phone", phone);

    fetch("https://trade.margelet.org/private-api/v1/users/profile/phone", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        closeModals();
        snackOptions("Телефон номер успeшно обновлён!", "success");
      })
      .catch((error) => {
        console.log(error);
        snackOptions("Ошибка!", "error");
      });
  };
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(300);
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
  const handleSubmitCode = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("code", otp.join(""));

    fetch("https://trade.margelet.org/private-api/v1/users/two-factor", {
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
  return (
    <>
      <div className="profile_page">
        <div className="secondary_block_wrapper user_image_block">
          <h2>Изображение профиля</h2>
          <p>Вы можете изменить изображение вашего профиля</p>
          <div className="order_history_list_line"></div>
          <div className="user_img">
            <div className="user_img_wrapper">
              <img src={avatar} alt="" />
              <div className="user_img_update">
                <UpdateIcon />
              </div>
            </div>

            <p>
              Поддерживаются форматы JPG, PNG. Максимальный размер файла <br />{" "}
              для загрузки: 10 Мб
            </p>
          </div>
        </div>
        <div className="secondary_block_wrapper user_image_block">
          <h2>Информация об учетной записи</h2>
          <p>Вы можете поменять данные ниже</p>
          <div className="order_history_list_line"></div>
          <div className="user_data_item">
            <span>Полное имя</span>
            <div>
              <p>
                {`${formData.lastName} ${formData.firstName} ${formData.middleName}`}{" "}
              </p>
              <p onClick={() => setNameModal(true)}>
                Изменить <span>имя</span>
              </p>
            </div>
          </div>
          <div className="order_history_list_line"></div>
          <div className="user_data_item">
            <span>Псевдоним</span>
            <div>
              <p>{userName || "---"}</p>
              <p onClick={() => setUserNameModal(true)}>
                Изменить <span>псевдоним</span>
              </p>
            </div>
          </div>
          <div className="order_history_list_line"></div>

          <div className="user_data_item">
            <span>Адрес электронной почты</span>
            <div>
              <p>{email || "---"}</p>
              <p onClick={() => setEmailModal(true)}>
                Изменить <span>электронную почту</span>
              </p>
            </div>
          </div>
          <div className="order_history_list_line"></div>

          <div className="user_data_item">
            <span>Номер телефона</span>
            <div>
              <p>+{phone || ""}</p>
              <p onClick={() => setNumberModal(true)}>
                Изменить <span>номер телефона</span>
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
          <p>Изменить имя</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>Фамилия</p>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Имя</p>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Отчество</p>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={handleChangeName}>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>Отмена</button>
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
          <p>Изменить псевдоним</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>Псевдоним</p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={handleChangeUserName}>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>Отмена</button>
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
          <p>Изменить номер телефона</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>Номер телефона</p>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={handleChangePhone}>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>Отмена</button>
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
          <p>Изменить электронную почту</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>Новая электронная почта</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Новая электронная почта ещё раз</p>
            <input
              type="text"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={handleChangeEmail}>Подтвердить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>Отмена</button>
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
          <p>Введите код</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>Мы отправили код на {email}</p>
            <div id="otp" className="fillcode_inputs">
              {otp.map((data, index) => (
                <input
                  key={index}
                  className="text-center form-control"
                  type="number"
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
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button
                onClick={handleSubmitCode}
                disabled={otp.join("").length < 6}
              >
                Подтвердить
              </button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>Отмена</button>
            </div>
          </div>
        </div>
      </div>

      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default Profile;
