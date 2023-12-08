import React, { useEffect, useState } from "react";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function ApiKeys() {
  React.useEffect(() => {
    document.title = `Ключи API | &Volume`;
  }, []);
  const [apiModal, setapiModal] = useState(false);
  const [apiActiveModal, setapiActiveModal] = useState(false);
  const [apiActiveEditModal, setapiActiveEditModal] = useState(false);

  const closeModals = () => {
    setapiModal(false);
    setapiActiveModal(false);
    setapiActiveEditModal(false);
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
      (apiModal || apiActiveModal || apiActiveEditModal) &&
      windowWidth < 450
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [apiModal, apiActiveModal, apiActiveEditModal]);
  const options = ["Binance", "CommeEX", "Okx"];
  return (
    <>
      <div className="api_keys_title">
        <div className="api_keys_title_top">
          <h2>Ключи API</h2>
          <div className="add_key_btn">
            <button onClick={() => setapiModal(true)}>
              + Добавить ключ API
            </button>
          </div>{" "}
        </div>
        <span>
          Добавьте пожалуйста подключение API для дальнейшего использования
          &Volume.
        </span>
      </div>
      <div class="secondary_block_wrapper user_image_block add_key_history">
        <div class="user_login_history">
          <table>
            <thead>
              <tr>
                <td>Время добавления</td>
                <td>Статус</td>
                <td>Название</td>
                <td>Биржа</td>
                <td>Действие</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>26 окт. 2023 г., 00:29:16</td>
                <td>Активное</td>
                <td>MyAPI</td>
                <td>Binance</td>
                <td>
                  <div className="api_actions">
                    <p>Редактировать </p>
                    <p>|</p>
                    <p>Удалить</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="secondary_block_wrapper add_key_history_mobile">
        <div className="add_key_history_mobile_title">
          <h2>MyAPI</h2>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="10" height="10" rx="5" fill="#31BD65" />
          </svg>
        </div>
        <div class="order_history_list_line"></div>
        <div
          className="add_key_history_mobile_list"
          onClick={() => setapiActiveModal(true)}
        >
          <div>
            <p>Время добавления</p>
            <h4>26 окт. 2023 г., 00:29:16</h4>
          </div>
          <div>
            <p>Биржа</p>
            <h4>Binance</h4>
          </div>
        </div>
      </div>

      <div
        className={
          apiModal || apiActiveModal || apiActiveEditModal
            ? "overlay visible_overlay"
            : "overlay"
        }
        onClick={closeModals}
      ></div>

      <div
        className={
          apiModal ? "modal_wrapper visible_modal_wrapper" : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>API</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>Название</p>
            <input type="text" />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Биржа</p>
            <Dropdown
              options={options}
              placeholder={options[0]}
              arrowClosed={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8.00001 8.78141L11.3 5.48141L12.2427 6.42408L8.00001 10.6667L3.75734 6.42408L4.70068 5.48141L8.00068 8.78141"
                    fill="#111112"
                  />
                </svg>
              }
              arrowOpen={
                <svg
                  className="open_arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8.00001 8.78141L11.3 5.48141L12.2427 6.42408L8.00001 10.6667L3.75734 6.42408L4.70068 5.48141L8.00068 8.78141"
                    fill="#111112"
                  />
                </svg>
              }
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Приватный ключ</p>
            <input type="text" />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Секретный ключ</p>
            <input type="text" />
          </div>

          <div className="modal_wrapper_save_btn">
            <button>Добавить</button>
          </div>
          <div className="modal_wrapper_cancel">
            <button>Отмена</button>
          </div>
        </div>
      </div>

      <div
        className={
          apiActiveModal
            ? "modal_wrapper visible_modal_wrapper"
            : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>API</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="secondary_block_wrapper my_active_api">
            <div className="add_key_history_mobile_title">
              <h2>MyAPI</h2>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="10" height="10" rx="5" fill="#31BD65" />
              </svg>
            </div>

            <div
              className="add_key_history_mobile_list"
              onClick={() => setapiActiveModal(true)}
            >
              <div>
                <p>Время добавления</p>
                <h4>26 окт. 2023 г., 00:29:16</h4>
              </div>
              <div>
                <p>Биржа</p>
                <h4>Binance</h4>
              </div>
            </div>
          </div>
          <div className="modal_wrapper_save_btn">
            <button
              onClick={() => {
                closeModals();
                setapiActiveEditModal(true);
              }}
            >
              Редактировать
            </button>
          </div>
          <div className="modal_wrapper_cancel api_delete_btn">
            <button>Удалить</button>
          </div>
        </div>
      </div>

      <div
        className={
          apiActiveEditModal
            ? "modal_wrapper visible_modal_wrapper"
            : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>API</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>Приватный ключ</p>
            <input type="text" />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Секретный ключ</p>
            <input type="text" />
          </div>

          <div className="modal_wrapper_save_btn">
            <button>Сохранить</button>
          </div>
          <div className="modal_wrapper_cancel api_delete_btn">
            <button>Удалить</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApiKeys;
