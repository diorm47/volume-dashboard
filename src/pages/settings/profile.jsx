import React, { useEffect, useRef, useState } from "react";
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

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();
  const input5Ref = useRef();
  const input6Ref = useRef();
  const handleInput = (e, setInput, nextInputRef) => {
    const value = e.target.value;
    setInput(value);
    if (value.length === 1 && nextInputRef) {
      nextInputRef.current.focus();
    }
  };

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

      <div
        className={
          nameModal || usernameModal || numberModal || emailModal || passwordConfirmModal
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
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button>Отмена</button>
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
            <input type="text" />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button>Отмена</button>
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
            <input type="text" />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button>Отмена</button>
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
            <input type="text" />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Новая электронная почта ещё раз</p>
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
                Подтвердить
              </button>
            </div>
            <div className="modal_wrapper_cancel">
              <button>Отмена</button>
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
          <p>Изменить пароль</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>Мы отправили код на nvolume@mail.ru</p>
            <div className="recovery_inputs">
              <input
                type="text"
                value={input1}
                onChange={(e) => handleInput(e, setInput1, input2Ref)}
                maxLength={1}
              />
              <input
                ref={input2Ref}
                type="text"
                value={input2}
                onChange={(e) => handleInput(e, setInput2, input3Ref)}
                maxLength={1}
              />
              <input
                ref={input3Ref}
                type="text"
                value={input3}
                onChange={(e) => handleInput(e, setInput3, input4Ref)}
                maxLength={1}
              />
              <input
                ref={input4Ref}
                type="text"
                value={input4}
                onChange={(e) => handleInput(e, setInput4, input5Ref)}
                maxLength={1}
              />
              <input
                ref={input5Ref}
                type="text"
                value={input5}
                onChange={(e) => handleInput(e, setInput5, input6Ref)}
                maxLength={1}
              />
              <input
                ref={input6Ref}
                type="text"
                value={input6}
                onChange={(e) => handleInput(e, setInput6, null)}
                maxLength={1}
                onKeyUp={(e) => e.key === "Enter"}
              />
            </div>
            <p className="recovery_time">Отправить повторно (5:00)</p>
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button>Подтвердить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button>Отмена</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
