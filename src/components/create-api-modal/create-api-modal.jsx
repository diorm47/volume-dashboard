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

function CreateApiModal({ setRec, updatebalance, addApiVisible, setAddApi }) {
  const { t, i18n } = useTranslation();

  const userLanguage = localStorage.getItem("locale") || "ru";


  const [apiActiveModal, setapiActiveModal] = useState(false);
  const [apiActiveEditModal, setapiActiveEditModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const closeModals = () => {
    setAddApi(false);
    setapiActiveModal(false);
    setapiActiveEditModal(false);
    setDeleteModal(false);
  };



  const [apiList, setapiList] = useState([]);

  const [selectedOption, setSelectedOption] = useState("bybit");

  const customOptions = [
    // {
    //   value: "binance",
    //   label: (
    //     <div className="drop_api_item">
    //       <div className="drop_api_item_name">
    //         <img src={binance} alt="" />

    //         <p>Binance Futures</p>
    //       </div>{" "}
    //     </div>
    //   ),
    // },
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
          updatebalance();
        } else {
          snackOptions(localization[userLanguage].apiAddError, "error");
        }
      })
      .catch((error) => {
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
        refresh();
        closeModals();
        snackOptions(localization[userLanguage].apiDeletedSuccess, "success");
        setRec(true);
        updatebalance();
      })
      .catch((error) => {
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
      <div
        className={
            addApiVisible || apiActiveModal || apiActiveEditModal || deleteModal
            ? "overlay visible_overlay"
            : "overlay"
        }
        onClick={closeModals}
      ></div>

      {/* Api modal */}
      <div
        className={
            addApiVisible
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
                  <button onClick={addApi}> {t("apiModal.addButton")}</button>
                </div>

                <div className="modal_wrapper_cancel">
                  <button onClick={closeModals}>{t("cancel")}</button>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />

      {/* delete modal */}
      <div
        className={
          deleteModal
            ? "modal_wrapper api_delete_warning visible_modal_wrapper"
            : "modal_wrapper api_delete_warning"
        }
      >
        <div className="warning_delete_modal ">
          <div className="warning_delete_modal_title">
            <h3>Удаление API</h3> <ExitModal onClick={closeModals} />
          </div>
          <div className="warning_delete_modal_desc">
            <p>
              Если у вас есть активные сделки, удаление API ключей может
              привести к их автоматическому закрытию и удалению алгоритма. Вы
              уверены в том, что хотите удалить API ключи?
            </p>
          </div>
          <div className="warning_delete_modal_actions">
            <button onClick={deleteApi}>
              <p> Да, удалить</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateApiModal;
