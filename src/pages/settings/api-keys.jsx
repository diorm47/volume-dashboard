import React, { useState } from "react";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";

function ApiKeys() {
  const [apiModal, setapiModal] = useState(false);
  const closeModals = () => {
    setapiModal(false);
  };

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
        <div className="add_key_history_mobile_list">
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

      {apiModal ? <div className="overlay" onClick={closeModals}></div> : ""}

      {apiModal ? (
        <div className="modal_wrapper">
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
              <select className="api_select" name="" id="">
                <option value="">
                  <p>Binance</p>
                </option>
                <option value="">
                  <p>CommeEX</p>
                </option>
                <option value="">
                  <p>Okx</p>
                </option>
              </select>
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
      ) : (
        ""
      )}
    </>
  );
}

export default ApiKeys;
