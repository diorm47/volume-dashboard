import React, { useEffect, useState } from "react";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import Dropdown from "react-dropdown";
import empty_block from "../../assets/icons/empty-block.png";

import "react-dropdown/style.css";
import Snackbar from "../../components/snackbar/snackbar";

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

  useEffect(() => {
    if (apiModal || apiActiveModal || apiActiveEditModal) {
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
  }, [apiModal, apiActiveModal, apiActiveEditModal]);

  const [apiList, setapiList] = useState();

  const [selectedOption, setSelectedOption] = useState("binance");

  const optionsMap = {
    Binance: "binance",
    ByBit: "bybit",
  };
  const options = Object.keys(optionsMap);

  const handleSelect = (option) => {
    const value = optionsMap[option.value];
    setSelectedOption(value);
  };

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

  // add key
  const [name, setName] = useState("");

  const [publickKey, setPublickKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const addApi = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("title", name);
    bodyContent.append("exchange", selectedOption);
    bodyContent.append("api_key", publickKey);
    bodyContent.append("api_secret", secretKey);

    fetch("https://trade.margelet.org/private-api/v1/users/api-keys/store", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        closeModals();
        snackOptions("API ключ успешно подключен.", "success");

      })
      .catch((error) => {
        console.log(error);
        snackOptions("Ошибка подключения API ключа. Проверьте правильность введенных данных или создайте новый API ключ.", "error");
      });
  };
  return (
    <>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />

      <div className="page_title analyse_title api_key_title">
        <h2>Ключи API</h2>
        <div className="add_key_btn">
          <button onClick={() => setapiModal(true)}>Добавить ключ API</button>
        </div>
      </div>
      <div className="secondary_block_wrapper user_image_block add_key_history">
        <div className="user_login_history">
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
            {apiList ? (
              <tbody>
                <tr>
                  <td>26 окт. 2023 г., 00:29:16</td>
                  <td>Активное</td>
                  <td>MyAPI</td>
                  <td>Binance</td>
                  <td>
                    <div className="api_actions">
                      <p onClick={() => setapiActiveEditModal(true)}>
                        Редактировать{" "}
                      </p>
                      <p>|</p>
                      <p>Удалить</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              ""
            )}
          </table>
          {!apiList ? (
            <div className="main_block_wrapper_bottom empty_block_wrapper">
              <div className="empty_block">
                <img src={empty_block} alt="" />
                <p>Нет подключенных API.</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {apiList ? (
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
          <div className="order_history_list_line"></div>
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
      ) : (
        <div className="main_block_wrapper_bottom empty_block_wrapper">
          <div className="empty_block">
            <img src={empty_block} alt="" />
            <p>Нет подключенных API.</p>
          </div>
        </div>
      )}

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
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Биржа</p>
            <Dropdown
              options={options}
              placeholder={options[0]}
              onChange={handleSelect}
              value={options.find(
                (option) => optionsMap[option] === selectedOption
              )}
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
            <p>Публичный ключ</p>
            <input
              type="text"
              value={publickKey}
              onChange={(e) => setPublickKey(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Приватный ключ</p>
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={addApi}>Добавить</button>
            </div>
            <div className="modal_wrapper_cancel">
              <button onClick={closeModals}>Отмена</button>
            </div>
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
          <div className="modal_wrapper_btns">
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
      </div>

      <div
        className={
          apiActiveEditModal
            ? "modal_wrapper visible_modal_wrapper"
            : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>Редактировать ключь API</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>Публичный ключ</p>
            <input type="text" />
          </div>
          <div className="modal_wrapper_content_item">
            <p>Приватный ключ</p>
            <input type="text" />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button>Сохранить</button>
            </div>
            <div className="modal_wrapper_cancel api_delete_btn">
              <button>Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApiKeys;
