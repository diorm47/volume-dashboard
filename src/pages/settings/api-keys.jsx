import React, { useEffect, useState } from "react";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import Dropdown from "react-dropdown";
import empty_block from "../../assets/icons/empty-block.png";

import "react-dropdown/style.css";
import Snackbar from "../../components/snackbar/snackbar";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

function ApiKeys({ setRec }) {
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    document.title = `${t("apiKeyPage.title")} | &Volume`;
  }, [t]);
  const userLanguage = localStorage.getItem("locale") || "ru";

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

  const [apiList, setapiList] = useState([]);

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

  // get api
  const refresh = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://api.nvolume.com/private-api/v1/users/api-keys", {
      method: "GET",
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        setapiList(data.data.api_keys[0]);
        if (!data.data.api_keys[0] && localStorage.getItem("token")) {
          setRec(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      refresh();
    }
  }, [localStorage.getItem("token")]);

  // add key
  const [name, setName] = useState("");

  const [publickKey, setPublickKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const addApi = () => {
    const localization = {
      en: {
        apiAddedSuccess:
          "The API key was successfully connected. Connection may take up to 5 minutes.",
        apiAddError:
          "Error adding API key. Check the entered data or create a new API key.",
        requestError: "Error!",
      },
      ru: {
        apiAddedSuccess:
          "API ключ успешно подключен. Подключение может занять до 5 минут.",
        apiAddError:
          "Ошибка добавления API ключа. Проверьте правильность введенных данных или создайте новый API ключ.",
        requestError: "Ошибка!",
      },
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("title", name);
    bodyContent.append("exchange", selectedOption);
    bodyContent.append("api_key", publickKey);
    bodyContent.append("api_secret", secretKey);

    fetch("https://api.nvolume.com/private-api/v1/users/api-keys/store", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          refresh();
          closeModals();
          snackOptions(localization[userLanguage].apiAddedSuccess, "success");
        } else {
          snackOptions(localization[userLanguage].apiAddError, "error");
        }
      })
      .catch((error) => {
        console.log(error);
        snackOptions(localization[userLanguage].requestError, "error");
      });
  };

  const deleteApi = () => {
    const localization = {
      en: {
        apiDeletedSuccess: "API key deleted successfully!",
        apiDeleteError: "Error!",
      },
      ru: {
        apiDeletedSuccess: "API ключ успешно удален!",
        apiDeleteError: "Ошибка!",
      },
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("id", apiList.id);

    fetch("https://api.nvolume.com/private-api/v1/users/api-keys/destroy", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          refresh();
          closeModals();
          snackOptions(localization[userLanguage].apiDeletedSuccess, "success");
        } else {
          snackOptions(localization[userLanguage].apiDeleteError, "error");
        }
      })
      .catch((error) => {
        console.log(error);
        snackOptions(localization[userLanguage].apiDeleteError, "error");
      });
  };

  const editApi = () => {
    const localization = {
      en: {
        apiUpdatedSuccess: "API key updated successfully!",
        apiUpdateError: "Error!",
      },
      ru: {
        apiUpdatedSuccess: "API ключ успешно обновлен!",
        apiUpdateError: "Ошибка!",
      },
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("id", apiList.id);
    bodyContent.append("api_key", publickKey);
    bodyContent.append("api_secret", secretKey);

    fetch("https://api.nvolume.com/private-api/v1/users/api-keys/update", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          closeModals();
          refresh();
          snackOptions(localization[userLanguage].apiUpdatedSuccess, "success");
        } else {
          snackOptions(localization[userLanguage].apiUpdateError, "error");
        }
      })
      .catch((error) => {
        console.log(error);
        snackOptions(localization[userLanguage].apiUpdateError, "error");
      });
  };

  const handleSetEditode = () => {
    setapiActiveEditModal(true);
  };

  return (
    <>
      <div className="page_title analyse_title api_key_title">
        <h2>{t("apiKeyPage.title")}</h2>
        <div className="add_key_btn">
          <button
            onClick={() => setapiModal(true)}
            disabled={apiList && apiList.id}
          >
            {t("apiKeyPage.addApiKey")}
          </button>
        </div>
      </div>
      <div className="secondary_block_wrapper user_image_block add_key_history">
        <div className="user_login_history">
          <table>
            <thead>
              <tr>
                <td>{t("apiTable.timeAdded")}</td>
                <td>{t("apiTable.status")}</td>
                <td>{t("apiTable.name")}</td>
                <td>{t("apiTable.exchange")}</td>
                <td>{t("apiTable.action")}</td>
              </tr>
            </thead>
            {apiList && apiList.id ? (
              <tbody>
                <tr>
                  <td>-</td>
                  <td>{t("apiTable.activeStatus")}</td>
                  <td>{apiList.title}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {apiList.exchange}
                  </td>
                  <td>
                    <div className="api_actions">
                      <p onClick={handleSetEditode}>{t("apiTable.edit")}</p>
                      <p>|</p>
                      <p onClick={deleteApi}>{t("apiTable.delete")}</p>
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
                <p>{t("apiTable.noApiConnected")}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="secondary_block_wrapper mob_api_list">
        {!apiList ? (
          <div className="main_block_wrapper_bottom empty_block_wrapper">
            <div className="empty_block">
              <img src={empty_block} alt="" />
              <p>{t("apiTable.noApiConnected")}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="add_key_history_mobile_title ">
              <h2>{apiList.title}</h2>
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
                <p>{t("labels.timeAdded")}</p>
                <h4>-</h4>
              </div>
              <div>
                <p>{t("labels.exchange")}</p>
                <h4 style={{ textTransform: "capitalize" }}>
                  {apiList.exchange}
                </h4>
              </div>
            </div>
          </>
        )}
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
          <p>{t("apiModal.title")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>{t("apiModal.name")}</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>{t("apiModal.exchange")}</p>
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
            <p>{t("apiModal.publicKey")}</p>
            <input
              type="text"
              value={publickKey}
              onChange={(e) => setPublickKey(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>{t("apiModal.privateKey")}</p>
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_btns add_api_btns">
            <div className="redirect_btn">
              <NavLink to="">
                <p>{t("apiADittionals.question")}</p>
              </NavLink>
            </div>
            <div className="modal_wrapper_save_btn">
              <button
                onClick={addApi}
                disabled={!name || !publickKey || !secretKey}
              >
                {t("apiModal.addButton")}
              </button>
            </div>
            <div className="create_acc_r">
              {selectedOption == "binance" ? (
                <p>
                  {t("apiADittionals.binanceQuest")}{" "}
                  <a href="https://www.binance.com/en" target="_blank">
                    {t("apiADittionals.create")}
                  </a>
                </p>
              ) : (
                <p>
                  {t("apiADittionals.bybitQuest")}{" "}
                  <a href="https://www.bybit.com/en/" target="_blank">
                    {t("apiADittionals.create")}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {apiList && apiList.id ? (
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
                <h2>{apiList.title}</h2>
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
                  <h4>-</h4>
                </div>
                <div>
                  <p>Биржа</p>
                  <h4 style={{ textTransform: "capitalize" }}>
                    {apiList.exchange}
                  </h4>
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
                <button onClick={deleteApi}>Удалить</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div
        className={
          apiActiveEditModal
            ? "modal_wrapper visible_modal_wrapper"
            : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("apiEditModal.title")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content">
          <div className="modal_wrapper_content_item">
            <p>{t("apiEditModal.publicKey")}</p>
            <input
              type="text"
              value={publickKey}
              onChange={(e) => setPublickKey(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_content_item">
            <p>{t("apiEditModal.privateKey")}</p>
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
          <div className="modal_wrapper_btns">
            <div className="modal_wrapper_save_btn">
              <button onClick={editApi} disabled={!publickKey || !secretKey}>
                {t("apiEditModal.saveButton")}
              </button>
            </div>
            <div className="modal_wrapper_cancel api_delete_btn">
              <button onClick={deleteApi}>
                {t("apiEditModal.deleteButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default ApiKeys;
