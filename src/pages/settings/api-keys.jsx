import React, { useEffect, useState } from "react";
import Select from "react-select";
import empty_block from "../../assets/icons/empty-block.png";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";

import { ReactComponent as DeleteWarning } from "../../assets/icons/delete-warning.svg";
import { ReactComponent as Info } from "../../assets/icons/info.svg";

import "react-dropdown/style.css";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import bybit from "../../assets/icons/bybit-icon.png";
import binance from "../../assets/icons/binance-icon.png";
import Snackbar from "../../components/snackbar/snackbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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
            <img src={binance} alt="" />

            <p>Binance Futures</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "bybit",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={bybit} alt="" />
            <p>ByBit Futures</p>
          </div>{" "}
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
  const [name, setName] = useState("&Volume");

  const [publickKey, setPublickKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const navigate = useNavigate();
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
          navigate("/investments");
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
          </div>
        </div>

        <div className="user_login_history">
          <table>
            {apiList && apiList.id ? (
              <div className="active_api_item">
                <div className="active_api_item_left">
                  {apiList.exchange == "bybit" ? (
                    <div className="api_item_type">
                      <img src={bybit} alt="" />
                      <p>Bybit Future</p>
                    </div>
                  ) : (
                    <div className="api_item_type">
                      <img src={binance} alt="" />
                      <p>Binance Future</p>
                    </div>
                  )}
                  <div className="active_api_item_kesys">
                    <div>
                      <p>Приватный ключ:</p> <span>********************</span>
                    </div>
                    <div>
                      <p>Секретный ключ:</p>{" "}
                      <span>********************************************</span>
                    </div>
                  </div>
                </div>
                <div
                  className="api_delete_btn"
                  onClick={() => setDeleteModal(true)}
                >
                  <p>{t("apiTable.delete")}</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </table>
          {!apiList ? (
            <div className="main_block_wrapper_bottom empty_block_wrapper">
              <div className="empty_api_block">
                <p>{t("api_empty.title")}</p>
                <span>
                {t("api_empty.desc1")} <br />  {t("api_empty.desc2")}
                </span>
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
          ) : (
            ""
          )}
        </div>
      </div>

      {/* <div className="secondary_block_wrapper mob_api_list">
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
      </div> */}

      <div
        className={
          apiModal || apiActiveModal || apiActiveEditModal || deleteModal
            ? "overlay visible_overlay"
            : "overlay"
        }
        onClick={closeModals}
      ></div>

      {/* Api modal */}
      <div
        className={
          apiModal
            ? "modal_wrapper api_modal_wrapper visible_modal_wrapper"
            : "modal_wrapper api_modal_wrapper"
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("apiModal.title")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content api_modal_content">
          <div className="modal_wrapper_content_item">
            <div className="modal_wrapper_content_item_title">
              <p>{t("apiModal.exchange")}</p>
              <Info />
            </div>

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
              />
            </div>
          </div>

          <Tabs>
            {/* <TabList>
              <Tab>{t("api_auto")}</Tab>
              <Tab>{t("api_handle")}</Tab>
            </TabList> */}

            {/* <TabPanel>
              <div className="bybit_on_tap_desc">
                <div className="bybit_on_tap_desc_item">
                  <div className="bybit_on_tap_desc_item_num">
                    <p>1</p>
                  </div>
                  <p>{t("bybit.desc1")} </p>
                </div>

                <div className="bybit_on_tap_desc_item">
                  <div className="bybit_on_tap_desc_item_num">
                    <p>2</p>
                  </div>
                  <p>{t("bybit.desc2")} </p>
                </div>

                <div className="bybit_on_tap_desc_item">
                  <div className="bybit_on_tap_desc_item_num">
                    <p>3</p>
                  </div>
                  <p>{t("bybit.desc3")} </p>
                </div>
              </div>
              <div className="modal_wrapper_btns add_api_btns">
                <div className="modal_wrapper_save_btn">
                  <button>{t("bybit.button")}</button>
                  <a href="https://www.bybit.com/en/oauth?client_id=bb8fc8894f7e&response_type=code&scope=openapi&redirect_uri=https://dashboard.nvolume.com/investments">
                  <button>{t("bybit.button")}</button>
                </a>
                </div>

                <div className="modal_wrapper_cancel">
                  <button onClick={closeModals}>{t("cancel")}</button>
                </div>
              </div>
            </TabPanel> */}
            <TabPanel>
              <div className="modal_wrapper_content_item modal_wrapper_content_item_input">
                <p>{t("apiModal.publicKey")}</p>
                <input
                  type="text"
                  value={publickKey}
                  onChange={(e) => setPublickKey(e.target.value)}
                />
              </div>
              <div className="modal_wrapper_content_item modal_wrapper_content_item_input">
                <p>{t("apiModal.privateKey")}</p>
                <input
                  type="text"
                  value={secretKey}
                  className="mb_0"
                  onChange={(e) => setSecretKey(e.target.value)}
                />
              </div>
              <div className="modal_wrapper_btns add_api_btns">
                <div className="modal_wrapper_save_btn">
                  {/* onClick={addApi} */}
                  <button onClick={addApi}>  {t("apiModal.addButton")}</button>
                </div>

                <div className="modal_wrapper_cancel">
                  <button onClick={closeModals}>{t("cancel")}</button>
                </div>
              </div>
            </TabPanel>
          </Tabs>
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
