import React, { useEffect, useState } from "react";
import Select from "react-select";
import empty_block from "../../assets/icons/empty-block.png";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";

import { ReactComponent as DeleteWarning } from "../../assets/icons/delete-warning.svg";

import "react-dropdown/style.css";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Snackbar from "../../components/snackbar/snackbar";

function ApiKeys({ setRec }) {
  const { t, i18n } = useTranslation();

  const userLanguage = localStorage.getItem("locale") || "ru";

  const [apiModal, setapiModal] = useState(false);
  const [apiActiveModal, setapiActiveModal] = useState(false);
  const [apiActiveEditModal, setapiActiveEditModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const closeModals = () => {
    setapiModal(false);
    setapiActiveModal(false);
    setapiActiveEditModal(false);
    setDeleteModal(false);
  };

  useEffect(() => {
    if (apiModal || apiActiveModal || apiActiveEditModal || deleteModal) {
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
  }, [apiModal, apiActiveModal, apiActiveEditModal, deleteModal]);

  const [apiList, setapiList] = useState([]);

  const [selectedOption, setSelectedOption] = useState("binance");

  const customOptions = [
    {
      value: "binance",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <svg
              width="5"
              height="6"
              viewBox="0 0 5 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.5" width="5" height="5" rx="2.5" fill="#31BD65" />
            </svg>

            <p>Binance Futures</p>
          </div>{" "}
          <span>{t("supported")}</span>
        </div>
      ),
    },
    {
      value: "bybit",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <svg
              width="5"
              height="6"
              viewBox="0 0 5 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.5" width="5" height="5" rx="2.5" fill="#31BD65" />
            </svg>
            <p>ByBit Futures</p>
          </div>{" "}
          <span>{t("supported")}</span>
        </div>
      ),
    },
  ];

  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption.value);
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
        } else {
          setRec(false);
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
          setRec(true);
        } else {
          snackOptions(localization[userLanguage].apiDeleteError, "error");
        }
      })
      .catch((error) => {
        console.log(error);
        snackOptions(localization[userLanguage].apiDeleteError, "error");
      });
  };

  // const editApi = () => {
  //   const localization = {
  //     en: {
  //       apiUpdatedSuccess: "API key updated successfully!",
  //       apiUpdateError: "Error!",
  //     },
  //     ru: {
  //       apiUpdatedSuccess: "API ключ успешно обновлен!",
  //       apiUpdateError: "Ошибка!",
  //     },
  //   };

  //   let headersList = {
  //     Accept: "*/*",
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   };

  //   let bodyContent = new FormData();
  //   bodyContent.append("id", apiList.id);
  //   bodyContent.append("api_key", publickKey);
  //   bodyContent.append("api_secret", secretKey);

  //   fetch("https://api.nvolume.com/private-api/v1/users/api-keys/update", {
  //     method: "POST",
  //     body: bodyContent,
  //     headers: headersList,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         closeModals();
  //         refresh();
  //         snackOptions(localization[userLanguage].apiUpdatedSuccess, "success");
  //         setRec(false);
  //       } else {
  //         snackOptions(localization[userLanguage].apiUpdateError, "error");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       snackOptions(localization[userLanguage].apiUpdateError, "error");
  //     });
  // };

  // const handleSetEditode = () => {
  //   setapiActiveEditModal(true);
  // };

  // const hoverColor = "#383838" ||
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1111121a"
        : provided.backgroundColor,
      color: state.isSelected ? "white" : provided.color,
    }),
  };
  const customStylesDark = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1111121a"
        : provided.backgroundColor,
      color: state.isSelected ? "white" : provided.color,
      backgroundColor: state.isFocused ? "#343436" : "#18181a",
    }),
  };

  return (
    <>
      <div className="secondary_block_wrapper user_image_block add_key_history">
        <div class="main_block_wrapper_title secondary_title">
          <div className="add_api_keys_block_title">
            <div>
              <h2>{t("apiKeyPage.title")}</h2>
              <p>{t("api_keys_desc")}</p>
            </div>
            <div className="add_key_btn">
              <button
                onClick={() => setapiModal(true)}
                disabled={apiList && apiList.id}
              >
                {t("apiKeyPage.addApiKey")}
              </button>
            </div>
          </div>
        </div>

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
                      {/* <p onClick={handleSetEditode}>{t("apiTable.edit")}</p>
                      <p>|</p> */}
                      <p onClick={() => setDeleteModal(true)}>
                        {t("apiTable.delete")}
                      </p>
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
        <div className="add_api_keys_block_title">
          <div>
            <h2>{t("apiKeyPage.title")}</h2>
            <p>{t("api_keys_desc")}</p>
          </div>
          <div className="add_key_btn">
            <button
              onClick={() => setapiModal(true)}
              disabled={apiList && apiList.id}
            >
              {t("apiKeyPage.addApiKey")}
            </button>
          </div>
        </div>
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
          apiModal || apiActiveModal || apiActiveEditModal || deleteModal
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
            <div className="api_modal_dropdown">
              <Select
                options={customOptions}
                styles={
                  localStorage.getItem("mode") &&
                  localStorage.getItem("mode") == "dark"
                    ? customStylesDark
                    : customStyles
                }
                onChange={handleSelect}
                value={customOptions.find(
                  (option) => option.value === selectedOption
                )}
              />{" "}
            </div>
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
              <NavLink to="/api">
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
            <p>{i18n.t("modals.api")}</p>
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
                  <p>{i18n.t("modals.addedTime")}</p>
                  <h4>-</h4>
                </div>
                <div>
                  <p>{i18n.t("modals.exchange")}</p>
                  <h4 style={{ textTransform: "capitalize" }}>
                    {apiList.exchange}
                  </h4>
                </div>
              </div>
            </div>
            <div className="modal_wrapper_btns">
              {/* <div className="modal_wrapper_save_btn">
                <button
                  onClick={() => {
                    closeModals();
                    setapiActiveEditModal(true);
                  }}
                >
                  {i18n.t("modals.edit")}
                </button>
              </div> */}
              <div className="modal_wrapper_cancel api_delete_btn api_delete_btn_mob">
                <button onClick={() => setDeleteModal(true)}>
                  {i18n.t("modals.delete")}
                </button>
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
            {/* <div className="modal_wrapper_save_btn">
              <button onClick={editApi} disabled={!publickKey || !secretKey}>
                {t("apiEditModal.saveButton")}
              </button>
            </div> */}
            <div className="modal_wrapper_cancel api_delete_btn">
              <button onClick={() => setDeleteModal(true)}>
                {t("apiEditModal.deleteButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />

      {/* delete modal */}
      <div
        className={
          deleteModal ? "modal_wrapper visible_modal_wrapper" : "modal_wrapper "
        }
      >
        <div className="warning_delete_modal">
          <div className="warning_delete_modal_title">
            <DeleteWarning /> <h3>{t("warning_del.title")} </h3>
          </div>
          <div className="warning_delete_modal_desc">
            <p>{t("warning_del.desc_api")}</p>
          </div>
          <div className="warning_delete_modal_actions">
            <button onClick={deleteApi}>
              <p> {t("warning_del.delete")}</p>
            </button>
            <button onClick={() => setDeleteModal(false)}>
              <p>{t("warning_del.cancel")}</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApiKeys;
