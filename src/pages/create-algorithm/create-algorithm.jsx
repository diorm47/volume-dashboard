import React, { useEffect, useState } from "react";
import "./create-algorithm.css";
import { ReactComponent as Info } from "../../assets/icons/info.svg";
import { ReactComponent as Allow } from "../../assets/icons/trade-allow.svg";
import { ReactComponent as DisAllow } from "../../assets/icons/trade-dis.svg";
import { ReactComponent as Refresh } from "../../assets/icons/refreah.svg";
import Select from "react-select";
import bybit from "../../assets/icons/bybit-icon.png";
import binance from "../../assets/icons/binance-icon.png";
import Switch from "../../components/switch/switch";

import trade1 from "../../assets/images/trade/1.png";
import trade2 from "../../assets/images/trade/2.png";
import trade3 from "../../assets/images/trade/3.png";
import trade4 from "../../assets/images/trade/4.png";
import trade5 from "../../assets/images/trade/5.png";
import trade6 from "../../assets/images/trade/6.png";
import trade7 from "../../assets/images/trade/7.png";
import trade8 from "../../assets/images/trade/8.png";
import trade9 from "../../assets/images/trade/9.png";
import trade10 from "../../assets/images/trade/10.png";
import trade11 from "../../assets/images/trade/11.png";
import trade12 from "../../assets/images/trade/12.png";
import trade13 from "../../assets/images/trade/13.png";
import trade14 from "../../assets/images/trade/14.png";
import trade15 from "../../assets/images/trade/15.png";
import trade16 from "../../assets/images/trade/16.png";
import trade17 from "../../assets/images/trade/17.png";
import trade18 from "../../assets/images/trade/18.png";
import trade19 from "../../assets/images/trade/19.png";
import trade20 from "../../assets/images/trade/20.png";
import trade21 from "../../assets/images/trade/21.png";
import trade22 from "../../assets/images/trade/22.png";
import trade23 from "../../assets/images/trade/23.png";
import trade24 from "../../assets/images/trade/24.png";
import trade25 from "../../assets/images/trade/25.png";
import trade26 from "../../assets/images/trade/26.png";
import trade27 from "../../assets/images/trade/27.png";
import trade28 from "../../assets/images/trade/28.png";
import trade29 from "../../assets/images/trade/29.png";
import trade30 from "../../assets/images/trade/30.png";
import trade31 from "../../assets/images/trade/31.png";
import trade32 from "../../assets/images/trade/32.png";
import trade33 from "../../assets/images/trade/33.png";
import trade34 from "../../assets/images/trade/34.png";
import trade35 from "../../assets/images/trade/35.png";
import trade36 from "../../assets/images/trade/36.png";
import trade37 from "../../assets/images/trade/37.png";
import { NavLink } from "react-router-dom";
import { mainApi } from "../../components/utils/main-api";
import CreateApiModal from "../../components/create-api-modal/create-api-modal";
import { useTranslation } from "react-i18next";

function CreateAlgorithm({ updatebalance }) {
  const { t } = useTranslation();
  const [stopLossInput, setStopLossInput] = useState(false);
  React.useEffect(() => {
    document.title = `${t("createAlgo.title")} Sigma AI | &Volume`;
  }, [t]);

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
  const customOptionsKeyBinance = [
    // {
    //   value: "binance",
    //   label: (
    //     <div className="drop_api_item">
    //       <div className="drop_api_item_name">
    //         <img src={binance} alt="" />
    //         <p>Binance Futures ***************************</p>
    //       </div>{" "}
    //     </div>
    //   ),
    // },
  ];
  const customOptionsKeyBybit = [
    {
      value: "bybit",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={bybit} alt="" />
            <p>ByBit Futures ***************************</p>
          </div>{" "}
        </div>
      ),
    },
  ];

  const customOptionsTrade = [
    {
      value: "BTCUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade1} alt="" />
            <p>BTCUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "UNIUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade2} alt="" />
            <p>UNIUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "MATICUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade3} alt="" />
            <p> MATICUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "XMRUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade4} alt="" />
            <p>XMRUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "FLOWUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade5} alt="" />
            <p>FLOWUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "ALGOUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade6} alt="" />
            <p>ALGOUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "CRVUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade7} alt="" />
            <p>CRVUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "1INCHUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade8} alt="" />
            <p>1INCHUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "ETHUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade9} alt="" />
            <p>ETHUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "AAVEUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade10} alt="" />
            <p>AAVEUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "MKRUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade11} alt="" />
            <p>MKRUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "ATOMUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade12} alt="" />
            <p>ATOMUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "ZRXUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade13} alt="" />
            <p>ZRXUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "HBARUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade14} alt="" />
            <p>HBARUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "DASHUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade15} alt="" />
            <p> DASHUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "ZECUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade16} alt="" />
            <p> ZECUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "BNBUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade17} alt="" />
            <p>BNBUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "APTUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade18} alt="" />
            <p>APTUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "LDOUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade19} alt="" />
            <p>LDOUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "MANAUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade20} alt="" />
            <p>MANAUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "GRTUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade21} alt="" />
            <p>GRTUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "XTZUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade22} alt="" />
            <p>XTZUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "NEARUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade23} alt="" />
            <p>NEARUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "AXSUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade24} alt="" />
            <p>AXSUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "RPLUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade25} alt="" />
            <p>RPLUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "ADAUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade26} alt="" />
            <p>ADAUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "DOTUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade27} alt="" />
            <p>DOTUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "YFIUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade28} alt="" />
            <p>YFIUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "ENJUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade29} alt="" />
            <p>ENJUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "NEOUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade30} alt="" />
            <p>NEOUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "IOTXUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade31} alt="" />
            <p>IOTXUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "LINKUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade32} alt="" />
            <p>LINKUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "AVAXUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade33} alt="" />
            <p>AVAXUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "SANDUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade34} alt="" />
            <p>SANDUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "SNXUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade35} alt="" />
            <p>SNXUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "XLMUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade36} alt="" />
            <p>XLMUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "ZILUSDT",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade37} alt="" />
            <p>ZILUSDT</p>
          </div>{" "}
        </div>
      ),
    },
  ];
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

  const [selectedOption, setSelectedOption] = useState();
  const [stopLoss, setStopLoss] = useState("--");
  const [selectedOptionKey, setSelectedOptionKey] = useState();
  const [selectedOptionTrade, setSelectedOptionsTrade] = useState([]);
  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption.value);
  };
  const handleSelectKey = (selectedOption) => {
    setSelectedOptionKey(selectedOption.value);
  };
  const handleSelectTrade = (selected) => {
    setSelectedOptionsTrade(selected);
  };
  const [algorithmType, setAlgorithmType] = useState();

  //
  const [apiKeyBinance, setApiKeyBinance] = useState();
  const [apiKeyBybit, setApiKeyBybit] = useState();
  const customOptionsKey =
    selectedOption === "binance" && apiKeyBinance
      ? customOptionsKeyBinance
      : selectedOption === "bybit" && apiKeyBybit
      ? customOptionsKeyBybit
      : [];
  // get api
  const getApiKeys = () => {
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
        if (data.data.api_keys[0].exchange == "binance") {
          setApiKeyBinance(data.data.api_keys[0]);
        } else {
          setApiKeyBybit(data.data.api_keys[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // balance
  const userLanguage = localStorage.getItem("locale") || "ru";
  const [userBalance, setUserBalance] = useState();
  const [isRotating, setIsRotating] = useState(false);
  const getUserbalance = () => {
    mainApi
      .reEnter()
      .then((res) => {
        setUserBalance(res.data.user.balance);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const refreshUserBalance = () => {
    updatebalance();
    setIsRotating(true);
    getUserbalance();
    setTimeout(() => setIsRotating(false), 1000);
  };

  useEffect(() => {
    getApiKeys();
    getUserbalance();
  }, []);
  const [apiKeyTrade, setApiKeyTrade] = useState();

  const checkApiForTrade = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch(
      `https://api.nvolume.com/private-api/v1/users/api-keys/can-trade?exchange=${selectedOption}`,
      {
        method: "POST",
        headers: headersList,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setApiKeyTrade(data.data.can_trade);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (customOptionsKey.length == 1 && selectedOption) {
      checkApiForTrade();
    }
  }, [customOptionsKey.length, selectedOption]);

  const [deposite, setDeposite] = useState();
  const [depositeError, setDepositeError] = useState();
  const handleBlurDeposite = () => {
    if (deposite < 100) {
      setDepositeError(
        "Депозит не может быть менее 100 USDT, увеличьте депозит"
      );
    } else if (deposite > userBalance) {
      setDepositeError(
        "Вы указали депозит больше, чем доступные баланс на бирже. Уменьшите сумму депозита."
      );
    } else {
      setDepositeError("");
    }
  };

  const [activeTR, setActiveTR] = useState();
  const [activeTRError, setActiveTRError] = useState();
  const handleBlurActiveTR = () => {
    if (activeTR > selectedOptionTrade.length) {
      setActiveTRError(
        `Максимальное кол-во активных сделок не может быть больше ${selectedOptionTrade.length}`
      );
    } else if (activeTR < 1) {
      setActiveTRError(
        "Максимальное кол-во активных сделок не может быть меньше 1"
      );
    } else {
      setActiveTRError("");
    }
  };

  const [volume, setVolume] = useState();
  const [volumeError, setVolumeError] = useState();
  const handleBlurVolume = () => {
    if (volume > deposite / 10) {
      setVolumeError(
        "Объём сделки не может быть более 10% от депозита, снизьте обьем"
      );
    } else if (volume < deposite / 1000) {
      setVolumeError(
        "Объём сделки не может быть менее 0,1% от депозита, увеличьте объём"
      );
    } else if (volume > 100) {
      setVolumeError("Объём сделки не может быть больше 100%");
    } else {
      setVolumeError("");
    }
  };

  const [shoulder, setShoulder] = useState();
  const [shoulderError, setShoulderError] = useState();
  const handleBlurShoulder = () => {
    if (shoulder > 10) {
      setShoulderError("Плечо не может быть более 10x, снизьте плечо");
    } else if (shoulder < 1) {
      setShoulderError("Плечо не может быть менее 1x, увеличьте плечо");
    } else {
      setShoulderError("");
    }
  };
  const [addApiVisible, setAddApi] = useState(false);

  return (
    <>
      <div className="algorithm_wrapper">
        <div className="algorithm_wrapper_title">
          <h1> {t("createAlgo.title")} Sigma AI</h1>
        </div>
        <div className="algorithm_line"></div>
        <div className="algorithm_item">
          <div className="algorithm_item_title">
            <p>{t("createAlgo.birja")}</p>
            <Info title="Выберите используемую биржу" />
          </div>
          <div className="api_modal_dropdown create_algo_birj">
            <Select
              placeholder={t("createAlgo.birja_p")}
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
        <div className="algorithm_line"></div>
        <div className="algorithm_item">
          <div className="algorithm_item_title">
            <p>{t("createAlgo.api")}</p>
            <Info title="Выберите API ключи из списка или создайте новый" />
          </div>
          <div className="api_modal_dropdown create_algo_birj select_api_key_sl">
            <Select
              placeholder={t("createAlgo.api_p")}
              options={customOptionsKey}
              styles={
                localStorage.getItem("mode") &&
                localStorage.getItem("mode") === "dark"
                  ? customStylesDark
                  : customStyles
              }
              isDisabled
              onChange={handleSelectKey}
              value={customOptionsKey.find(
                (option) => option.value === selectedOption
              )}
            />
          </div>
        </div>
        {customOptionsKey.length !== 1 && selectedOption ? (
          <button
            className="add_new_api_key_btn"
            onClick={() => setAddApi(!addApiVisible)}
          >
          {t("createAlgo.api_add")}
          </button>
        ) : (
          ""
        )}
        {customOptionsKey.length == 1 &&
        selectedOption &&
        apiKeyTrade == true ? (
          <div className="trade_allow">
            <Allow />
            <p>Торговля разрешена</p>
          </div>
        ) : (
          ""
        )}
        {customOptionsKey.length == 1 &&
        selectedOption &&
        apiKeyTrade == false ? (
          <>
            <div className="trade_allow trade_not_allow">
              <DisAllow />
              <p>Торговля запрешена</p>
            </div>
            <NavLink to="/settings/api">
              <button className="add_new_api_key_btn">
              {t("createAlgo.api_add")}
              </button>
            </NavLink>
          </>
        ) : (
          ""
        )}
        <div className="algorithm_line"></div>
        <div className="algorithm_item">
          <div className="algorithm_item_title">
            <p> {t("createAlgo.settings_reg")}</p>
            <Info title="Выберите режим настройки алгоритма" />
          </div>
          <div className="algo_regim ">
            <div
              className={
                algorithmType == "auto"
                  ? "algo_regim_item algo_regim_item_active"
                  : "algo_regim_item "
              }
              onClick={() => setAlgorithmType("auto")}
            >
              <div className="algo_regim_item_title">
                <h4>{t("createAlgo.sr_auto")}</h4>
                <div className="algo_regim_item_rec">{t("createAlgo.sr_rec")}</div>
              </div>
              <p>
              {t("createAlgo.sr_reg_auto")}
              </p>
            </div>
            <div
              onClick={() => setAlgorithmType("handle")}
              className={
                algorithmType == "handle"
                  ? "algo_regim_item algo_regim_item_active"
                  : "algo_regim_item "
              }
            >
              <div className="algo_regim_item_title">
                <h4>  {t("createAlgo.sr_han")}</h4>
              </div>
              <p>
              {t("createAlgo.sr_reg_han")}
              </p>
            </div>
          </div>
          <div className="algorithm_line"></div>
        </div>
        {algorithmType == "auto" ? (
          <div className="auto_regim_content">
            <div className="algorithm_item">
              <div className="reinv_inputs">
                <div className="algorithm_item_title">
                  <p>{t("createAlgo.reinv")}</p>
                  <Info title="Использовать в торговле полученную прибыль" />
                </div>
                <Switch open={true} />
              </div>
            </div>
            <div className="algorithm_line"></div>
            <div className="algorithm_item">
              <div className="algorithm_item_title">
                <p>{t("createAlgo.depos")} </p>
                <Info title="Укажите выделенную сумму депозита для алгоритма" />
              </div>
              <div className="algorithm_item_input algo_deposit">
                <input
                  type="number"
                  placeholder={t("createAlgo.depo_s")}
                  value={deposite}
                  onChange={(e) => setDeposite(e.target.value)}
                  onBlur={handleBlurDeposite}
                />
                <div className="algorithm_item_input_add">
                  <p>
                  {t("createAlgo.depo_d")}:{" "}
                    {customOptionsKey.length == 1 &&
                    selectedOption &&
                    apiKeyTrade == true
                      ? userBalance
                      : "0.0"}{" "}
                    USDT
                  </p>

                  <div className="algo_refresh" onClick={refreshUserBalance}>
                    <Refresh
                      className={` ${isRotating ? "rotate-animation" : ""}`}
                    />
                  </div>
                </div>
              </div>

              {depositeError && (
                <p className="error_input_validate">{depositeError}</p>
              )}
            </div>
            <div className="algorithm_line"></div>
            <div className="algorithm_item">
              <div className="reinv_inputs">
                <div className="algorithm_item_title">
                  <p> {t("createAlgo.stopl")}</p>
                  <Info title="Укажите сумму максимального убытка в % от депозита" />
                </div>
                <div onClick={() => setStopLossInput(!stopLossInput)}>
                  <Switch open={stopLossInput} />
                </div>
              </div>
              {stopLossInput ? (
                <>
                  <div className="algorithm_item_input">
                    <input
                      type="number"
                      placeholder={t("createAlgo.stopls")}
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                    />
                    <div className="algorithm_item_input_add">
                      <p>%</p>
                    </div>
                  </div>
                  <div className="stop_lost_text">
                    <p>
                      Если ваш чистый убыток достигнет {stopLoss} USDT, торговля
                      прекратится
                    </p>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="algorithm_line"></div>
            <div className="algorithm_btns">
              <div className="modal_wrapper_save_btn">
                <button>{t("createAlgo.create_btn")}</button>
              </div>
              <div className="modal_wrapper_cancel">
                <button>{t("createAlgo.cancel_btn")}</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {algorithmType == "handle" ? (
          <div className="algo_regim_second_content">
            <div className="algorithm_item">
              <div className="algorithm_item_title">
                <p>{t("createAlgo.trade_pairs")}</p>
                <Info title="Выберите торговые пары для торговли " />
              </div>
              <div className="api_modal_dropdown create_algo_birj trade_select">
                <Select
                  isMulti
                  placeholder={t("createAlgo.trade_pairs_se")}
                  options={customOptionsTrade}
                  styles={
                    localStorage.getItem("mode") &&
                    localStorage.getItem("mode") == "dark"
                      ? customStylesDark
                      : customStyles
                  }
                  onChange={handleSelectTrade}
                  value={customOptionsTrade.find(
                    (option) => option.value === selectedOptionTrade
                  )}
                />
              </div>
            </div>
            <div className="algorithm_line"></div>
            <div className="algorithm_item">
              <div className="reinv_inputs">
                <div className="algorithm_item_title">
                  <p>{t("createAlgo.reinv")}</p>
                  <Info title="Использовать в торговле полученную прибыль" />
                </div>
                <Switch open={true} />
              </div>
            </div>
            <div className="algorithm_line"></div>

            <div className="algorithm_item">
              <div className="algorithm_item_title">
                <p>{t("createAlgo.depos")} </p>
                <Info title="Укажите выделенную сумму депозита для алгоритма" />
              </div>
              <div className="algorithm_item_input algo_deposit">
                <input
                  type="number"
                  placeholder={t("createAlgo.depo_s")}
                  value={deposite}
                  onChange={(e) => setDeposite(e.target.value)}
                  onBlur={handleBlurDeposite}
                />
                <div className="algorithm_item_input_add">
                  <p>
                  {t("createAlgo.depo_d")}:{" "}
                    {customOptionsKey.length == 1 &&
                    selectedOption &&
                    apiKeyTrade == true
                      ? userBalance
                      : "0.0"}{" "}
                    USDT
                  </p>

                  <div className="algo_refresh" onClick={refreshUserBalance}>
                    <Refresh
                      className={` ${isRotating ? "rotate-animation" : ""}`}
                    />
                  </div>
                </div>
              </div>

              {depositeError && (
                <p className="error_input_validate">{depositeError}</p>
              )}
            </div>
            <div className="algorithm_line"></div>
            <div className="algorithm_item">
              <div className="reinv_inputs">
                <div className="algorithm_item_title">
                  <p>  {t("createAlgo.q_a_o")}</p>
                  <Info />
                </div>
              </div>
              <div className="algorithm_item_input">
                <input
                  type="number"
                  placeholder={t("createAlgo.qoas")}
                  value={activeTR}
                  onChange={(e) => setActiveTR(e.target.value)}
                  onBlur={handleBlurActiveTR}
                />
              </div>
              {activeTRError && (
                <p className="error_input_validate">{activeTRError}</p>
              )}
            </div>
            <div className="algorithm_line"></div>

            <div className="algorithm_item">
              <div className="reinv_inputs">
                <div className="algorithm_item_title">
                  <p>{t("createAlgo.order_ob")}</p>
                  <Info title="Укажите обьем сделки в % от депозита" />
                </div>
              </div>
              <div className="algorithm_item_input">
                <input
                  type="number"
                  placeholder={t("createAlgo.order_ob_s")}
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  onBlur={handleBlurVolume}
                />
                <div className="algorithm_item_input_add">
                  <p>%</p>
                </div>
              </div>
              {volumeError && (
                <p className="error_input_validate">{volumeError}</p>
              )}
            </div>

            <div className="algorithm_item mt_24">
              <div className="reinv_inputs">
                <div className="algorithm_item_title">
                  <p>{t("createAlgo.plecho")}</p>
                  <Info />
                </div>
              </div>
              <div className="algorithm_item_input">
                <input
                  type="number"
                  placeholder={t("createAlgo.plecho_s")}
                  value={shoulder}
                  onChange={(e) => setShoulder(e.target.value)}
                  onBlur={handleBlurShoulder}
                />
              </div>

              {shoulderError && (
                <p className="error_input_validate">{shoulderError}</p>
              )}
            </div>
            <div className="algorithm_line"></div>
            <div className="algorithm_item">
              <div className="reinv_inputs">
                <div className="algorithm_item_title">
                  <p>{t("createAlgo.stopl")}</p>
                  <Info title="Укажите сумму максимального убытка в % от депозита" />
                </div>

                <div onClick={() => setStopLossInput(!stopLossInput)}>
                  <Switch open={stopLossInput} />
                </div>
              </div>
              {stopLossInput ? (
                <>
                  <div className="algorithm_item_input">
                    <input
                      type="number"
                      placeholder={t("createAlgo.stopls")}
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                    />
                    <div className="algorithm_item_input_add">
                      <p>%</p>
                    </div>
                  </div>
                  <div className="stop_lost_text">
                    <p>
                      Если ваш чистый убыток достигнет {stopLoss} USDT, торговля
                      прекратится
                    </p>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="algorithm_line"></div>
            <div className="algorithm_btns">
              <div className="modal_wrapper_save_btn">
                <button>{t("createAlgo.create_btn")}</button>
              </div>
              <div className="modal_wrapper_cancel">
                <button>{t("createAlgo.cancel_btn")}</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {addApiVisible ? (
        <CreateApiModal
          addApiVisible={addApiVisible}
          setAddApi={setAddApi}
          getApiKeys={getApiKeys}
          updatebalance={updatebalance}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default CreateAlgorithm;
