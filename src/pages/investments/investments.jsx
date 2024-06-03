import React, { useEffect, useState } from "react";
import "./investments.css";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import empty_block from "../../assets/icons/empty-block.png";
import algo1 from "../../assets/images/algorithm-3.png";
import algo2 from "../../assets/images/algorithm-4.png";
import Snackbar from "../../components/snackbar/snackbar";
import { ReactComponent as Icon } from "../../assets/icons/tarif-icon.svg";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { mainApi } from "../../components/utils/main-api";
import { NavLink, useNavigate } from "react-router-dom";

import { ReactComponent as DeleteWarning } from "../../assets/icons/delete-warning.svg";
import { ReactComponent as AlgoIcon } from "../../assets/icons/algorithm.svg";
import LongShortGraph from "../../components/long-short-graph/long-short-graph";
import LongTermGraph from "../../components/long-term-graph/long-term-graph";

function Investments({ updatebalance, setRec }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [localStorage.getItem("token")]);
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = `${t("investment_title")}  | &Volume`;
  }, [t]);
  const faq = [
    {
      question:
        "Какое максимальное количество алгоритмов можно запустить одновременно?",
      answer:
        "Можно одновременно запустить не более двух алгоритмов. Вы можете запустить спотовый и фьючерсный алгоритмы по отдельности.",
    },
    {
      question: "Как пополнить депозит для алгоритма, который уже создан?",
      answer:
        "Если вы хотите изменить сумму депозита для уже созданного алгоритма, вам необходимо перейти в раздел редактирования алгоритма, внести изменения, сохранить их и запустить алгоритм.",
    },
    {
      question: "Если удалить алгоритм, будут ли закрыты открытые сделки?",
      answer:
        "Если вы удалите алгоритм, все сделки будут закрыты по текущей цене с помощью маркет-ордера. Однако если вы хотите только остановить алгоритм, чтобы предотвратить открытие новых сделок, но позволить текущим сделкам закрыться в соответствии с условиями алгоритма, вы можете нажать кнопку «Остановить». После этого алгоритм не будет открывать новые сделки, но закроет текущие согласно условиям алгоритма.",
    },
    {
      question: "Можно изменить уже созданный алгоритм?",
      answer:
        "Вы можете изменять параметры алгоритма и переключать режимы настройки с автоматического на ручной, нажав на кнопку «Редактировать» для действующего алгоритма.",
    },
    {
      question:
        "Где я могу увидеть результаты торговли алгоритма за предыдущие периоды?",
      answer:
        "Вы можете посмотреть результаты бэктестирования и подробно изучить описание алгоритма, нажав кнопку «Подробнее» в правом верхнем углу интересующего вас алгоритма.",
    },
    {
      question: "Как долго алгоритм может не совершать сделки?",
      answer:
        "Согласно статистике, алгоритм обычно совершает сделки каждый день, но это зависит от рыночной ситуации. Поэтому, если сделок нет более одного дня, вы можете обратиться в службу технической поддержки или следить за состоянием текущего алгоритма.",
    },
    {
      question:
        "Как понять, что алгоритм функционирует и запуск прошёл успешно?",
      answer:
        "После создания алгоритма вы можете проверить его статус. Если статус указан как «запускается», это означает, что алгоритм всё ещё находится в процессе создания. Когда статус станет «запущен», это будет означать, что алгоритм успешно запущен и работает корректно.",
    },
  ];
  const faqEn = [
    {
      question: "How to manage risks when investing?",
      answer:
        "Cryptocurrency is a high-risk investment. Depending on the market situation, investments can bring both significant profit and substantial loss. We strongly recommend using only the part of your savings that you are willing to lose. When choosing an investment method, take into account your personal financial situation and do not risk more than you can afford.",
    },
    {
      question: "How is the projected income calculated?",
      answer:
        "Projected income is calculated based on historical profitability data for previous periods.",
    },
    {
      question: "How can I tell if everything is working?",
      answer:
        "Make sure that:\n1. Your futures trading account has at least 100 USDT.\n2. API keys are created on the exchange and connected in the &Volume Personal Cabinet in the 'Investments' section.\nOnce you connect the exchange API keys to your personal cabinet, the trading system will start to activate. This may take a few hours. If you are sure that you have done everything correctly but there are still no trades, contact customer support.",
    },
    {
      question:
        "I have been waiting for more than a day, but there are no trades, what should I do?",
      answer:
        "&Volume constantly monitors the market situation and opens trades only when the conditions are suitable. The frequency of trades depends on the selected risk level:\n1. If you have chosen low risk, the frequency of trades can vary from one trade per day to one trade per week.\n2. If you have chosen medium risk, there is typically one trade per day on average. In this risk mode, the system may be in one trade for several days.\n3. If you have chosen high risk, there are usually multiple trades per day, possibly several trades simultaneously, up to 150 trades per week or more.\nIf you are sure you have done everything correctly but there have been no trades for a day or more, please contact us for support.",
    },
    {
      question: "The system is closing all trades at a loss, what should I do?",
      answer:
        "&Volume is profitable on medium and long time frames. Do not turn off the system if you see initial deposit drawdowns. Why this may happen:\nWhen choosing a high-risk and highly profitable strategy, &Volume may open several trades simultaneously, but if a trade reverses and moves in the opposite direction beyond a certain threshold, it will be closed. There can be several such trades in a row, and even for several days.\nTherefore, you need to be patient and resilient.",
    },
  ];
  const locale = localStorage.getItem("locale");
  const faqArray = locale === "en" ? faqEn : faq;

  const [opened, setOpened] = useState();
  const [activeInvests, setActiveInvests] = useState({});
  const toggleTabs = (data) => {
    if (data == opened) {
      setOpened("");
    } else {
      setOpened(data);
    }
  };
  const invest_times = [
    {
      name: t("one_year"),
    },
    {
      name: t("six_month"),
    },
    {
      name: t("three_month"),
    },
    {
      name: t("one_month"),
    },
  ];
  const [active1, setActive1] = useState("1 месяц");
  const [active2, setActive2] = useState("1 месяц");
  const [active3, setActive3] = useState("1 месяц");
  const [activeCardSelect, setactiveCardSelect] = useState("");
  const [userData, setUserData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);

  // modals
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const [informations, setInformations] = useState(true);

  const closeModals = () => {
    setModal1(false);
    setModal2(false);
    setModal3(false);
    setDeleteModal(false);
  };

  // Switch
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    console.log("Switch Value:", event.target.checked);
  };

  // active
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const getInputClass = (fieldName) => {
    if (focusedField === fieldName) {
      return "input_focused";
    }
    return "inputfocused";
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

  // add bot
  const [amountInvestment, setAmountInvestment] = useState("");
  const [stopLos, setStopLos] = useState("");
  const [errorInvest, setErrorInvest] = useState("");
  const localization = {
    en: {
      algorithBought:
        "Limit of investment methods. There can only be one active investment method.",

      minimumInvestment: "Minimum investment amount is 100 USDT.",
      stopLossGreaterThan50:
        "Stop loss value is greater than 50% of the total balance.",
      stopLossLessThan20:
        "Stop loss value is less than 20% of the total balance.",
      apiKeysNotFound: "Error, API key not added!",
      botsLimit:
        "Error, maximum investment methods reached. Only one active investment method is allowed.",
      unpaidTariff: "Error, no active tariff!",
      botAddedSuccess: "Method added successfully!",
      requestError: "Error executing the request!",

      trial: "Your tariff plan does not allow usage beyond $200.",
      starter: "Your tariff plan does not allow usage beyond $400.",
      advanced: "Your tariff plan does not allow usage beyond $900.",
      professional: "Your tariff plan does not allow usage beyond $3000.",
    },
    ru: {
      algorithBought:
        "Лимит методов инвестирования. Активный метод инвестирования может быть только один.",
      minimumInvestment: "Минимальная сумма инвестиции 100 USDT.",
      stopLossGreaterThan50:
        "Вы указали значение стоп-лосс более 50% от общего счета.",
      stopLossLessThan20:
        "Вы указали значение стоп-лосс менее 20% от общего счета.",
      apiKeysNotFound: "Ошибка, не добавлен апи-ключ!",
      botsLimit:
        "Лимит, методов инвестирования. Активный метод инвестирования может быть только один.",
      unpaidTariff: "Ошибка, нет активного тарифа!",
      botAddedSuccess: "Метод успешно добавлен!",
      requestError: "Ошибка при выполнении запроса!",

      trial: "Ваш тарифный план не позволяет использовать более $200.",
      starter: "Ваш тарифный план не позволяет использовать более $400.",
      advanced: "Ваш тарифный план не позволяет использовать более $900.",
      professional: "Ваш тарифный план не позволяет использовать более $3000.",
    },
  };
  const userLanguage = localStorage.getItem("locale") || "ru";

  const handleAddBot = (level_risk) => {
    const localizatioooooooooooon = {
      en: {
        minimumInvestment: "Minimum investment amount is 100 USDT.",
        stopLossGreaterThan50:
          "Stop loss value is greater than 50% of the total balance.",
        stopLossLessThan20:
          "Stop loss value is less than 20% of the total balance.",
        apiKeysNotFound: "Error, API key not added!",
        botsLimit:
          "Error, maximum investment methods reached. Only one active investment method is allowed.",
        unpaidTariff: "Error, no active tariff!",
        botAddedSuccess: "You have successfully added an investment method.",
        requestError: "Error executing the request!",
      },
      ru: {
        minimumInvestment: "Минимальная сумма инвестиции 100 USDT.",
        stopLossGreaterThan50:
          "Вы указали значение стоп-лосс более 50% от общего счета.",
        stopLossLessThan20:
          "Вы указали значение стоп-лосс менее 20% от общего счета.",
        apiKeysNotFound: "Ошибка, не добавлен апи-ключ!",
        botsLimit:
          "Лимит, методов инвестирования. Активный метод инвестирования может быть только один.",
        unpaidTariff: "Ошибка, нет активного тарифа!",
        botAddedSuccess: "Вы успешно добавили метод инвестирования.",
        requestError: "Ошибка при выполнении запроса!",
      },
    };
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("level_risk", level_risk);
    bodyContent.append("amount_investment", amountInvestment);
    bodyContent.append("stop_loss", stopLos);

    fetch("https://api.nvolume.com/private-api/v1/users/bots/store", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => {
        return response.json().then((data) => {
          if (!data.success) {
            if (data.error.api_keys_not_found) {
              snackOptions(
                localizatioooooooooooon[userLanguage].apiKeysNotFound,
                "error"
              );
            } else if (data.error.bots_limit) {
              snackOptions(
                localizatioooooooooooon[userLanguage].botsLimit,
                "error"
              );
            } else if (data.error.unpaid_tariff) {
              snackOptions(
                localizatioooooooooooon[userLanguage].unpaidTariff,
                "error"
              );
            }
            throw new Error("Bad response from server");
          }

          if (data.success) {
            snackOptions(
              localizatioooooooooooon[userLanguage].botAddedSuccess,
              "success"
            );
            closeModals();
            getBots();
            updatebalance();
          }
        });
      })
      .catch((error) => {
        console.log("Error ex!");
      });
  };

  const addBot = (level_risk) => {
    if (Number(amountInvestment) < 100) {
      snackOptions(localization[userLanguage].minimumInvestment, "error");
      setErrorInvest(true);
    } else {
      setErrorInvest(false);
    }

    const precent50 = (userData.balance / 100) * 50;
    const precent20 = (userData.balance / 100) * 20;

    if (isChecked && Number(stopLos) > precent50) {
      snackOptions(localization[userLanguage].stopLossGreaterThan50, "error");
      setErrorInvest(true);
    } else if (isChecked && Number(stopLos) < precent20) {
      snackOptions(localization[userLanguage].stopLossLessThan20, "error");
      setErrorInvest(true);
    } else if (userData.tariff == "Пробный" && amountInvestment > 200) {
      snackOptions(localization[userLanguage].trial, "error");
      setErrorInvest(true);
    } else if (userData.tariff == "Стартовый" && amountInvestment > 400) {
      snackOptions(localization[userLanguage].starter, "error");
      setErrorInvest(true);
    } else if (userData.tariff == "Улучшенный" && amountInvestment > 900) {
      snackOptions(localization[userLanguage].advanced, "error");
      setErrorInvest(true);
    } else if (userData.tariff == "Продвинутый" && amountInvestment > 3000) {
      snackOptions(localization[userLanguage].professional, "error");
      setErrorInvest(true);
    } else {
      setErrorInvest(false);
    }

    if (errorInvest == false) {
      handleAddBot(level_risk);
    }
  };

  const handleSetAmountInvestment = (data) => {
    setAmountInvestment(data);
  };

  const handleSetStopLos = (data) => {
    setStopLos(data);
  };

  // get bot
  const getBots = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://api.nvolume.com/private-api/v1/users/bots", {
      method: "GET",
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setActiveInvests(data.data.bots[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const refresh = () => {
    mainApi
      .reEnter()
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getBots();
      refresh();
    }
  }, [localStorage.getItem("token")]);

  const formatTime = (time) => {
    const parsedDate = new Date(time);
    const formattedDate = format(parsedDate, "dd.MM.yyyy, HH:mm:ss");
    return formattedDate;
  };

  // deleteBot

  const deleteBot = () => {
    const localization = {
      en: {
        botDeletedSuccess: "Method deleted successfully!",
        botNotFound: "Error! Bot not found.",
        requestError: "Error!",
      },
      ru: {
        botDeletedSuccess: "Метод успешно удалён!",
        botNotFound: "Ошибка! Бот не найден.",
        requestError: "Ошибка!",
      },
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("bot_id", activeInvests.id);

    fetch("https://api.nvolume.com/private-api/v1/users/bots/destroy", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          closeModals();
          snackOptions(localization[userLanguage].botDeletedSuccess, "success");
          getBots();
        } else {
          snackOptions(localization[userLanguage].botNotFound, "error");
        }
      })
      .catch((error) => {
        console.log(error);
        snackOptions(localization[userLanguage].requestError, "error");
      });
  };

  return (
    <>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />

      <div className="pages_wrapper investments_page">
        <div className="main_page_title_template">
          <h1>{t("nav_menu_3")}</h1>
        </div>

        <div className="top_page_attention_wrapper container">
          <div>
            {" "}
            <Icon />
          </div>
          <p>
            Для каждого алгоритма есть подробная информация о принципах его
            работы, рисках, рекомендациях и результатах, полученных на основе
            анализа исторических данных. Исходя из своих целей, вы можете
            выбрать один алгоритм или комбинировать несколько, настраивая
            стратегию и уровень риска.
          </p>
        </div>
        <div className="algo_cards">
          <div className="algo_card">
            <div className="algo_card_title_wrapper">
              <div className="algo_card_title">
                <div>
                  <AlgoIcon />
                </div>{" "}
                <h3>Long-Term AI</h3>
              </div>{" "}
              <div className="algo_card_about">
                <NavLink to="/algorithm-type-ai">
                  <p>Подробнее</p>
                </NavLink>
              </div>
            </div>
            <div className="algo_card_desc">
              <p>
                Подходит для долгосрочного планирования. Больше зарабатывает на
                росте, меньше на падении. При значительном падении рынка, от
                -50% и ниже, совершает меньше сделок и сохраняет депозит. В
                среднем совершает 1-2 сделки в день.
              </p>
            </div>
            <div className="algo_card_graph">
              <LongTermGraph />
            </div>
            <div className="algo_card_precents">
              <p>2023 - 2024 </p>
              <p>+ 80.46%</p>
            </div>
            <div className="algo_card_spec">
              <div>
                <p>Торгуемая площадка</p>
                <span>Spot</span>
              </div>
              <div>
                <p>Уровень риска</p>
                <span>Минимальный</span>
              </div>
              <div>
                <p>Рекомендуемый депозит</p>
                <span>3 000 USDT</span>
              </div>
            </div>
            <button className="algo_btn algo_btn_disabled">Скоро</button>
          </div>
          <div className="algo_card">
            <div className="algo_card_title_wrapper">
              <div className="algo_card_title">
                <div>
                  <AlgoIcon />
                </div>{" "}
                <h3>Sigma</h3>
              </div>{" "}
              <div className="algo_card_about">
                <NavLink to="/algorithm-type">
                  <p>Подробнее</p>
                </NavLink>
              </div>
            </div>
            <div className="algo_card_desc">
              <p>
                Зарабатывает на росте и падении рынка, реагирует на импульсное
                движение цены, подбирает оптимальные точки входа в зависимости
                от волатильности рынка. Показывает хорошую эффективность даже на
                короткой дистанции.
              </p>
            </div>
            <div className="algo_card_graph">
              <LongShortGraph />
            </div>
            <div className="algo_card_precents">
              <p>2023 - 2024 </p>
              <p>+ 229.64%</p>
            </div>
            <div className="algo_card_spec">
              <div>
                <p>Торгуемая площадка</p>
                <span>Futures</span>
              </div>
              <div>
                <p>Уровень риска</p>
                <span>Средний</span>
              </div>
              <div>
                <p>Рекомендуемый депозит</p>
                <span>1 000 USDT</span>
              </div>
            </div>
            <NavLink to="/create-algorithm">
              <button className="algo_btn">Создать</button>
            </NavLink>
          </div>
        </div>

        <div className="investments_page_wrapper">
          <div className="orders_history_list main_block_wrapper">
            <div className="main_block_wrapper_top">
              <div className="main_block_wrapper_title secondary_title">
                <h2>{t("investments")}</h2>
                <p>{t("activeInvestmentsDescription")}</p>
              </div>
            </div>
            {activeInvests && activeInvests.exchange ? (
              <div className="main_block_wrapper_bottom ">
                <div className="order_history_list_item ">
                  <div className="order_history_list_item_title">
                    <h2 style={{ textTransform: "capitalize" }}>
                      {activeInvests.exchange}
                    </h2>
                  </div>
                  <div className="order_history_list_item_content analysis_order_items">
                    <div className="order_history_list_item_content_item">
                      <p>
                        {t("creationTime")}
                        <span>{formatTime(activeInvests.start_at)}</span>
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item">
                      <p>
                        {t("investmentMethod")}
                        {activeInvests.level_risk === "aggressive" ? (
                          <span>{t("aggressive")}</span>
                        ) : (
                          ""
                        )}
                        {activeInvests.level_risk === "moderate" ? (
                          <span>{t("moderate")}</span>
                        ) : (
                          ""
                        )}
                        {activeInvests.level_risk === "conservative" ? (
                          <span>{t("conservative")}</span>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item">
                      <p>
                        {t("initialAmount")}
                        <span>$ {activeInvests.amount_investment}</span>
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item">
                      <p>
                        {t("usedAmount")} <span>$ 0</span>
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                      <p>
                        {t("profitOrLoss")} <span>0 USDT</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="order_history_list_line"></div>
                <div className="investing_actions">
                  <div className="add_key_btn">
                    <button onClick={() => setDeleteModal(true)}>
                      {t("delete")}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="main_block_wrapper_bottom ">
                <div className="empty_api_block">
                  <p> {t("algo_empty.title")}</p>
                  <span>
                    {t("algo_empty.desc1")} <br /> {t("algo_empty.desc2")}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="page_title investments_block_title">
            <h1 className="questions_title">{t("faqTitle")}</h1>
          </div>

          <div className="faq_invest">
            {faqArray.map((item) => (
              <div
                className={
                  opened == item.question
                    ? "faq_invest_item faq_invest_item_open"
                    : "faq_invest_item"
                }
                onClick={() => toggleTabs(item.question)}
              >
                <div className="faq_invest_item_question">
                  <p>{item.question}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13 11V4H11V11H4V13H11V20H13V13H20V11H13Z"
                      fill="#111112"
                    />
                  </svg>{" "}
                </div>
                <div className="faq_invest_item_answer">
                  {item.answer.split("\n").map((line, index) => (
                    <p key={index}>
                      {line}
                      <br />
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <p>{t("warning_del.desc_algo")}</p>
          </div>
          <div className="warning_delete_modal_actions">
            <button onClick={deleteBot}>
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

export default Investments;
