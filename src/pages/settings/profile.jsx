import React, { useEffect, useState } from "react";
import userImg from "../../assets/icons/user-img.svg";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";

function Profile() {
  React.useEffect(() => {
    document.title = `Профиль | &Volume`;
  }, []);
  const [nameModal, setNameModal] = useState(false);
  const [usernameModal, setUserNameModal] = useState(false);
  const [numberModal, setNumberModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);

  const closeModals = () => {
    setNameModal(false);
    setUserNameModal(false);
    setNumberModal(false);
    setEmailModal(false);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      (nameModal || usernameModal || numberModal || emailModal) &&
      windowWidth < 450
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [nameModal, usernameModal, numberModal, emailModal]);

  return (
    <>
      <div className="profile_page">
        <div className="secondary_block_wrapper user_image_block">
          <h2>Изображение профиля</h2>
          <p>Вы можете изменить изображение вашего профиля</p>
          <div class="order_history_list_line"></div>
          <div className="user_img">
            <img src={userImg} alt="" />
            <p>
              Поддерживаются форматы JPG, PNG. Максимальный размер файла <br />{" "}
              для загрузки: 10 Мб
            </p>
          </div>
        </div>
        <div className="secondary_block_wrapper user_image_block">
          <h2>Информация об учетной записи</h2>
          <p>Вы можете поменять данные ниже</p>
          <div class="order_history_list_line"></div>
          <div className="user_data_item">
            <span>Полное имя</span>
            <div>
              <p>Овчинников Данил Игоревич</p>
              <p onClick={() => setNameModal(true)}>
                Изменить <span>имя</span>
              </p>
            </div>
          </div>
          <div class="order_history_list_line"></div>
          <div className="user_data_item">
            <span>Псевдоним</span>
            <div>
              <p>DanilOvchinnikovill</p>
              <p onClick={() => setUserNameModal(true)}>
                Изменить <span>псевдоним</span>
              </p>
            </div>
          </div>
          <div class="order_history_list_line"></div>

          <div className="user_data_item">
            <span>Адрес электронной почты</span>
            <div>
              <p>nvolume@mail.ru</p>
              <p onClick={() => setEmailModal(true)}>
                Изменить <span>электронную почту</span>
              </p>
            </div>
          </div>
          <div class="order_history_list_line"></div>

          <div className="user_data_item">
            <span>Номер телефона</span>
            <div>
              <p>+79000000000</p>
              <p onClick={() => setNumberModal(true)}>
                Изменить <span>номер телефона</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {nameModal || usernameModal || numberModal || emailModal ? (
        <div className="overlay" onClick={closeModals}></div>
      ) : (
        ""
      )}

      {nameModal ? (
        <div className="modal_wrapper">
          <div className="modal_wrapper_title">
            <p>Изменить имя</p>
            <ExitModal onClick={closeModals} />
          </div>
          <div className="modal_wrapper_content">
            <div className="modal_wrapper_content_item">
              <p>Фамилия</p>
              <input type="text" />
            </div>
            <div className="modal_wrapper_content_item">
              <p>Имя</p>
              <input type="text" />
            </div>
            <div className="modal_wrapper_content_item">
              <p>Отчество</p>
              <input type="text" />
            </div>
            <div className="modal_wrapper_save_btn">
              <button>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button>Отмена</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {usernameModal ? (
        <div className="modal_wrapper">
          <div className="modal_wrapper_title">
            <p>Изменить псевдоним</p>
            <ExitModal onClick={closeModals} />
          </div>
          <div className="modal_wrapper_content">
            <div className="modal_wrapper_content_item">
              <p>Псевдоним</p>
              <input type="text" />
            </div>

            <div className="modal_wrapper_save_btn">
              <button>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button>Отмена</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {numberModal ? (
        <div className="modal_wrapper">
          <div className="modal_wrapper_title">
            <p>Изменить номер телефона</p>
            <ExitModal onClick={closeModals} />
          </div>
          <div className="modal_wrapper_content">
            <div className="modal_wrapper_content_item">
              <p>Номер телефона</p>
              <input type="text" />
            </div>

            <div className="modal_wrapper_save_btn">
              <button>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button>Отмена</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {emailModal ? (
        <div className="modal_wrapper">
          <div className="modal_wrapper_title">
            <p>Изменить электронную почту</p>
            <ExitModal onClick={closeModals} />
          </div>
          <div className="modal_wrapper_content">
            <div className="modal_wrapper_content_item">
              <p>Электронная почтф</p>
              <input type="text" />
            </div>

            <div className="modal_wrapper_save_btn">
              <button>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button>Отмена</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Profile;
