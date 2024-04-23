import React, { useState } from "react";
import "./create-algorithm.css";
import { ReactComponent as Info } from "../../assets/icons/info.svg";
import { ReactComponent as Allow } from "../../assets/icons/trade-allow.svg";
import { ReactComponent as Refresh } from "../../assets/icons/refreah.svg";
import { ReactComponent as RefreshBlack } from "../../assets/icons/refresh-black.svg";
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

function CreateAlgorithm() {
  const [mode, setMode] = useState(localStorage.getItem("mode"));
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
  const customOptionsKey = [
    {
      value: "binance",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={binance} alt="" />

            <p>Binance Futures ***************************</p>
          </div>{" "}
        </div>
      ),
    },
  ];
  const customOptionsTrade = [
    {
      value: "1",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade1} alt="" />
            <p>1000PEPEUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "2",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade2} alt="" />
            <p>SOLUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "3",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade3} alt="" />
            <p>SHIB1000USDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "4",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade4} alt="" />
            <p>TONUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "5",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade5} alt="" />
            <p>AVAXUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "6",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade6} alt="" />
            <p>NEARUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "7",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade7} alt="" />
            <p>XVGUSDT</p>
          </div>{" "}
        </div>
      ),
    },
    {
      value: "8",
      label: (
        <div className="drop_api_item">
          <div className="drop_api_item_name">
            <img src={trade8} alt="" />
            <p>APTUSDT</p>
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
  const [selectedOptionKey, setSelectedOptionKey] = useState();
  const [selectedOptionTrade, setSelectedOptionTrade] = useState();
  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption.value);
  };
  const handleSelectKey = (selectedOption) => {
    setSelectedOptionKey(selectedOption.value);
  };
  const handleSelectTrade = (selectedOption) => {
    setSelectedOptionTrade(selectedOption.value, () => {
      console.log(selectedOptionTrade);
    });
  };

  const [algorithmType, setAlgorithmType] = useState();

  return (
    <div className="algorithm_wrapper">
      <div className="algorithm_wrapper_title">
        <h1>Создание алгоритма</h1>
      </div>
      <div className="algorithm_line"></div>
      <div className="algorithm_item">
        <div className="algorithm_item_title">
          <p>Биржа</p>
          <Info />
        </div>
        <div className="api_modal_dropdown create_algo_birj">
          <Select
            placeholder="Выберите биржу"
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
          <p>API ключ</p>
          <Info />
        </div>
        <div className="api_modal_dropdown create_algo_birj">
          <Select
            placeholder="Выберите API ключ"
            options={customOptionsKey}
            styles={
              localStorage.getItem("mode") &&
              localStorage.getItem("mode") == "dark"
                ? customStylesDark
                : customStyles
            }
            onChange={handleSelectKey}
            value={customOptionsKey.find(
              (option) => option.value === selectedOptionKey
            )}
          />
        </div>
      </div>
      <div className="trade_allow">
        <Allow />
        <p>Торговля разрешена</p>
      </div>
      <div className="algorithm_line"></div>
      <div className="algorithm_item">
        <div className="algorithm_item_title">
          <p>Режим настройки</p>
          <Info />
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
              <h4>Автоматический</h4>
              <div className="algo_regim_item_rec">Рекомендуем</div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
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
              <h4>Ручной</h4>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
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
                <p>Реинвестирование прибыли</p>
                <Info />
              </div>
              <Switch open={true} />
            </div>
          </div>
          <div className="algorithm_line"></div>
          <div className="algorithm_item">
            <div className="algorithm_item_title">
              <p>Депозит </p>
              <Info />
            </div>
            <div className="algorithm_item_input">
              <input type="text" placeholder="Укажите сумму депозита" />
              <div className="algorithm_item_input_add">
                <p>Доступно: 3500.13 USDT</p>

                {mode === "dark" ? <RefreshBlack /> : <Refresh />}
              </div>
            </div>
          </div>
          <div className="algorithm_line"></div>
          <div className="algorithm_item">
            <div className="reinv_inputs">
              <div className="algorithm_item_title">
                <p>Стоп-лосс</p>
                <Info />
              </div>
              <Switch open={true} />
            </div>
            <div className="algorithm_item_input">
              <input
                type="text"
                placeholder="Введите максимально приемлемый убыток"
              />
              <div className="algorithm_item_input_add">
                <p>%</p>
              </div>
            </div>
            <div className="stop_lost_text">
              <p>
                Если ваш чистый убыток достигнет -- USDT, торговля прекратится
              </p>
            </div>
          </div>
          <div className="algorithm_line"></div>
          <div className="algorithm_btns">
            <div class="modal_wrapper_save_btn">
              <button>Создать алгоритм</button>
            </div>
            <div class="modal_wrapper_cancel">
              <button>Отмена</button>
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
              <p>Торговые пары</p>
              <Info />
            </div>
            <div className="api_modal_dropdown create_algo_birj trade_select">
              <Select
                isMulti
                placeholder="Выберите торговые пары"
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
                <p>Реинвестирование прибыли</p>
                <Info />
              </div>
              <Switch open={true} />
            </div>
          </div>
          <div className="algorithm_line"></div>
          <div className="algorithm_item">
            <div className="reinv_inputs">
              <div className="algorithm_item_title">
                <p>Объем сделки</p>
                <Info />
              </div>
            </div>
            <div className="algorithm_item_input">
              <input type="text" placeholder="Укажите объём сделки" />
              <div className="algorithm_item_input_add">
                <p>%</p>
              </div>
            </div>
          </div>
          <div className="algorithm_line"></div>
          <div className="algorithm_item">
            <div className="reinv_inputs">
              <div className="algorithm_item_title">
                <p>Максимальное кол-во активных сделок</p>
                <Info />
              </div>
            </div>
            <div className="algorithm_item_input">
              <input type="text" placeholder="Укажите сумму депозита " />
            </div>
          </div>
          <div className="algorithm_line"></div>
          <div className="algorithm_item">
            <div className="algorithm_item_title">
              <p>Депозит </p>
              <Info />
            </div>
            <div className="algorithm_item_input">
              <input type="text" placeholder="Укажите сумму депозита" />
              <div className="algorithm_item_input_add">
                <p>Доступно: 3500.13 USDT</p>
                <Refresh />
              </div>
            </div>
          </div>
          <div className="algorithm_line"></div>
          <div className="algorithm_item">
            <div className="reinv_inputs">
              <div className="algorithm_item_title">
                <p>Стоп-лосс</p>
                <Info />
              </div>
              <Switch open={true} />
            </div>
            <div className="algorithm_item_input">
              <input
                type="text"
                placeholder="Введите максимально приемлемый убыток"
              />
              <div className="algorithm_item_input_add">
                <p>%</p>
              </div>
            </div>
            <div className="stop_lost_text">
              <p>
                Если ваш чистый убыток достигнет -- USDT, торговля прекратится
              </p>
            </div>
          </div>
          <div className="algorithm_line"></div>
          <div className="algorithm_btns">
            <div class="modal_wrapper_save_btn">
              <button>Создать алгоритм</button>
            </div>
            <div class="modal_wrapper_cancel">
              <button>Отмена</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CreateAlgorithm;
