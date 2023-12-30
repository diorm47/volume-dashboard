import React, { useEffect, useState } from "react";
import "./investments.css";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import empty_block from "../../assets/icons/empty-block.png";
import Snackbar from "../../components/snackbar/snackbar";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { mainApi } from "../../components/utils/main-api";

function Investments({ updatebalance }) {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = `${t("investment_title")}  | &Volume`;
  }, [t]);
  const faq = [
    {
      question: "Как управлять рисками при инвестировании?",
      answer:
        "Криптовалюта - высокорискованный вид инвестиций. В зависимости от рыночной ситуации, инвестиции могут принести как крупную прибыль, так и ощутимый убыток. Мы настоятельно рекомендуем использовать только ту часть накоплений, которую вы готовы потерять. Выбирая метод инвестирования, принимайте во внимание вашу личную финансовую ситуацию и не рискуйте больше, чем можете себе позволить.",
    },
    {
      question: "Как рассчитывается прогнозируемый доход?",
      answer:
        "Прогнозируемый доход рассчитывается исходя из исторических данных о прибыльности за предыдущие периоды.",
    },
    {
      question: "Как понять, что всё работает?",
      answer:
        "Убедитесь, что: \n1. На вашем торговом счету фьючерсного аккаунта не меньше 100 USDT.\n2. API-ключи созданы на бирже, и подключены в Личном Кабинете &Volume в разделе “Инвестиции”. \n Как только Вы подключите API-ключи биржи в личном кабинете, система торгов начнет активироваться. Это может занять несколько часов. Если вы уверены, что всё сделали правильно, но сделок всё равно нет - обратитесь в службу поддержки. ",
    },
    {
      question: "Я жду уже больше дня, но сделок нет, что делать?",
      answer:
        "&Volume постоянно отслеживает рыночную ситуацию и открывает сделки только если ситуация подходящая. В зависимости от выбранного уровня риска зависит частота сделок. \n 1. Если Вы выбрали минимальный риск, частота сделок может варьироваться от одной сделки в день, до одной в неделю. \n 2. Если Вы выбрали средний риск, то в среднем совершается одна сделка в день. В этом режиме риска система может находиться в одной сделке несколько дней.\n 3. Если Вы выбрали высокий риск, то, как правило, происходит несколько сделок в день, возможно несколько сделок одновременно до 150 сделок в неделю и более. \n Если Вы уверены, что всё сделали верно, но сделок нет сутки и более, напишите нам в поддержку.",
    },
    {
      question: "Система закрывает все сделки в убыток, что делать?",
      answer:
        "&Volume прибылен на средних и длинных отрезках времени. Не нужно выключать систему, если вы увидели первые просадки депозита. \n Почему так может происходить: \n При выборе рисковой и самой доходной стратегии &Volume может открывать сразу несколько сделок одновременно, однако если сделка разворачивается и уходит в противоположную сторону, до определённой границы, то сделка закрывается. Таких сделок может быть несколько подряд, и даже несколько дней подряд.  \n Поэтому, нужно набраться терпения и выдержки.",
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

  // modals
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const [informations, setInformations] = useState(true);

  const closeModals = () => {
    setModal1(false);
    setModal2(false);
    setModal3(false);
  };

  // Switch
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    console.log("Switch Value:", event.target.checked);
  };

  // block site scroll
  useEffect(() => {
    if (modal1 || modal2 || modal3) {
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
  }, [modal1, modal2, modal3]);

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
      minimumInvestment: "Minimum investment amount is 100 USDT.",
      stopLossGreaterThan50:
        "Stop loss value is greater than 50% of the total balance.",
      stopLossLessThan20:
        "Stop loss value is less than 20% of the total balance.",
    },
    ru: {
      minimumInvestment: "Минимальная сумма инвестиции 100 USDT.",
      stopLossGreaterThan50:
        "Вы указали значение стоп-лосс более 50% от общего счета.",
      stopLossLessThan20:
        "Вы указали значение стоп-лосс менее 20% от общего счета.",
    },
  };
  const userLanguage = localStorage.getItem("locale") || "ru";
  const handleAddBot = (level_risk, userLanguage) => {
    const localization = {
      en: {
        apiKeysNotFound: "Error, API key not added!",
        botsLimit:
          "Error, maximum investment methods reached. Only one active investment method is allowed.",
        unpaidTariff: "Error, no active tariff!",
        botAddedSuccess: "Method added successfully!",
        requestError: "Error executing the request!",
      },
      ru: {
        apiKeysNotFound: "Ошибка, не добавлен апи-ключ!",
        botsLimit:
          "Лимит, методов инвестирования. Активный метод инвестирования может быть только один.",
        unpaidTariff: "Ошибка, нет активного тарифа!",
        botAddedSuccess: "Метод успешно добавлен!",
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

    fetch("https://trade.margelet.org/private-api/v1/users/bots/store", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => {
        return response.json().then((data) => {
          if (!data.success) {
            if (data.error.api_keys_not_found) {
              snackOptions(localization[userLanguage].apiKeysNotFound, "error");
            } else if (data.error.bots_limit) {
              snackOptions(localization[userLanguage].botsLimit, "error");
            } else if (data.error.unpaid_tariff) {
              snackOptions(localization[userLanguage].unpaidTariff, "error");
            }
            throw new Error("Bad response from server");
          }

          if (data.success) {
            snackOptions(localization[userLanguage].botAddedSuccess, "success");
            closeModals();
            getBots();
            updatebalance();
          }
        });
      })
      .catch((error) => {
        snackOptions(localization[userLanguage].requestError, "error");
        console.log("Error executing the request!");
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

    fetch("https://trade.margelet.org/private-api/v1/users/bots", {
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

  const deleteBot = (userLanguage) => {
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

    fetch("https://trade.margelet.org/private-api/v1/users/bots/destroy", {
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
        <div className="page_title investments_page_title">
          <h2>{t("investments_page_title.main_title")}</h2>
          <p>{t("investments_page_title.sub_title")}</p>
        </div>
        <div className="investments_page_wrapper">
          <div className="investing_top_cards">
            <div className="secondary_block_wrapper investing_top_card">
              <div className="main_block_wrapper_title">
                <h2>{t("conservative")}</h2>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>{t("minimumInvestmentAmount")}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99996 1.16667C3.77996 1.16667 1.16663 3.78 1.16663 7C1.16663 10.22 3.77996 12.8333 6.99996 12.8333C10.22 12.8333 12.8333 10.22 12.8333 7C12.8333 3.78 10.22 1.16667 6.99996 1.16667ZM7.58329 9.91667H6.41663V8.75H7.58329V9.91667ZM7.58329 7.58334H6.41663V4.08334H7.58329V7.58334Z"
                      fill="#747A80"
                    />
                  </svg>
                </div>
                <div className="investing_top_card_value">
                  <p>100 USDT</p>
                </div>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>{t("riskLevel")}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99996 1.16667C3.77996 1.16667 1.16663 3.78 1.16663 7C1.16663 10.22 3.77996 12.8333 6.99996 12.8333C10.22 12.8333 12.8333 10.22 12.8333 7C12.8333 3.78 10.22 1.16667 6.99996 1.16667ZM7.58329 9.91667H6.41663V8.75H7.58329V9.91667ZM7.58329 7.58334H6.41663V4.08334H7.58329V7.58334Z"
                      fill="#747A80"
                    />
                  </svg>
                </div>
                <div className="investing_top_card_value investing_top_card_value_blue">
                  <p>{t("low")}</p>
                </div>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>{t("projectedYield")}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99996 1.16667C3.77996 1.16667 1.16663 3.78 1.16663 7C1.16663 10.22 3.77996 12.8333 6.99996 12.8333C10.22 12.8333 12.8333 10.22 12.8333 7C12.8333 3.78 10.22 1.16667 6.99996 1.16667ZM7.58329 9.91667H6.41663V8.75H7.58329V9.91667ZM7.58329 7.58334H6.41663V4.08334H7.58329V7.58334Z"
                      fill="#747A80"
                    />
                  </svg>
                </div>
                <div className="investing_top_card_value investing_top_card_value_blue">
                  {active1 == "1 месяц" ? <p>{t("upTo")} 10.43%</p> : ""}
                  {active1 == "3 месяца" ? <p>{t("upTo")} 31.29%</p> : ""}
                  {active1 == "6 месяцев" ? <p>{t("upTo")} 62.58%</p> : ""}
                  {active1 == "1 год" ? <p>{t("upTo")} 125.16%</p> : ""}
                </div>
              </div>
              <div className="investing_top_card_item investing_top_card_btns">
                {invest_times.map((times) => (
                  <button
                    className={
                      active1 == times.name
                        ? "investing_top_card_active_btn"
                        : ""
                    }
                    onClick={() => setActive1(times.name)}
                  >
                    {times.name}
                  </button>
                ))}
              </div>
              <div className="investing_top_card_item investing_top_card_warning">
                <p>{t("profitabilityDisclaimer")}</p>
              </div>
              <div className="investing_top_card_select">
                {activeCardSelect == 1 ? (
                  <button className="investing_top_card_select_active">
                    {t("select")}
                  </button>
                ) : (
                  <button onClick={() => setModal1(true)}>
                    {" "}
                    {t("select")}
                  </button>
                )}
              </div>
            </div>
            <div className="secondary_block_wrapper investing_top_card">
              <div className="main_block_wrapper_title">
                <h2>{t("moderate")}</h2>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>
                    {" "}
                    <p>{t("minimumInvestmentAmount")}</p>
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99996 1.16667C3.77996 1.16667 1.16663 3.78 1.16663 7C1.16663 10.22 3.77996 12.8333 6.99996 12.8333C10.22 12.8333 12.8333 10.22 12.8333 7C12.8333 3.78 10.22 1.16667 6.99996 1.16667ZM7.58329 9.91667H6.41663V8.75H7.58329V9.91667ZM7.58329 7.58334H6.41663V4.08334H7.58329V7.58334Z"
                      fill="#747A80"
                    />
                  </svg>
                </div>
                <div className="investing_top_card_value">
                  <p>100 USDT</p>
                </div>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>
                    {" "}
                    <p>{t("riskLevel")}</p>
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99996 1.16667C3.77996 1.16667 1.16663 3.78 1.16663 7C1.16663 10.22 3.77996 12.8333 6.99996 12.8333C10.22 12.8333 12.8333 10.22 12.8333 7C12.8333 3.78 10.22 1.16667 6.99996 1.16667ZM7.58329 9.91667H6.41663V8.75H7.58329V9.91667ZM7.58329 7.58334H6.41663V4.08334H7.58329V7.58334Z"
                      fill="#747A80"
                    />
                  </svg>
                </div>
                <div className="investing_top_card_value investing_top_card_value_blue">
                  <p>{t("medium")}</p>
                </div>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>{t("projectedYield")}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99996 1.16667C3.77996 1.16667 1.16663 3.78 1.16663 7C1.16663 10.22 3.77996 12.8333 6.99996 12.8333C10.22 12.8333 12.8333 10.22 12.8333 7C12.8333 3.78 10.22 1.16667 6.99996 1.16667ZM7.58329 9.91667H6.41663V8.75H7.58329V9.91667ZM7.58329 7.58334H6.41663V4.08334H7.58329V7.58334Z"
                      fill="#747A80"
                    />
                  </svg>
                </div>
                <div className="investing_top_card_value investing_top_card_value_blue">
                  {active2 == "1 месяц" ? <p>{t("upTo")} 21.65%</p> : ""}
                  {active2 == "3 месяца" ? <p>{t("upTo")} 64.95%</p> : ""}
                  {active2 == "6 месяцев" ? <p>{t("upTo")} 129.9%</p> : ""}
                  {active2 == "1 год" ? <p>{t("upTo")} 259.8%</p> : ""}
                </div>
              </div>
              <div className="investing_top_card_item investing_top_card_btns">
                {invest_times.map((times) => (
                  <button
                    className={
                      active2 == times.name
                        ? "investing_top_card_active_btn"
                        : ""
                    }
                    onClick={() => setActive2(times.name)}
                  >
                    {times.name}
                  </button>
                ))}
              </div>
              <div className="investing_top_card_item investing_top_card_warning">
                <p>{t("profitabilityDisclaimer")}</p>
              </div>
              <div className="investing_top_card_select">
                {activeCardSelect == 2 ? (
                  <button className="investing_top_card_select_active">
                    {t("select")}
                  </button>
                ) : (
                  <button onClick={() => setModal2(true)}>
                    {" "}
                    {t("select")}
                  </button>
                )}
              </div>
            </div>
            <div className="secondary_block_wrapper investing_top_card">
              <div className="main_block_wrapper_title">
                <h2>{t("aggressive")}</h2>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title={t(
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                  )}
                >
                  <p>{t("minimumInvestmentAmount")}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99996 1.16667C3.77996 1.16667 1.16663 3.78 1.16663 7C1.16663 10.22 3.77996 12.8333 6.99996 12.8333C10.22 12.8333 12.8333 10.22 12.8333 7C12.8333 3.78 10.22 1.16667 6.99996 1.16667ZM7.58329 9.91667H6.41663V8.75H7.58329V9.91667ZM7.58329 7.58334H6.41663V4.08334H7.58329V7.58334Z"
                      fill="#747A80"
                    />
                  </svg>
                </div>
                <div className="investing_top_card_value">
                  <p>100 USDT</p>
                </div>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title={t(
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                  )}
                >
                  <p>{t("riskLevel")}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99996 1.16667C3.77996 1.16667 1.16663 3.78 1.16663 7C1.16663 10.22 3.77996 12.8333 6.99996 12.8333C10.22 12.8333 12.8333 10.22 12.8333 7C12.8333 3.78 10.22 1.16667 6.99996 1.16667ZM7.58329 9.91667H6.41663V8.75H7.58329V9.91667ZM7.58329 7.58334H6.41663V4.08334H7.58329V7.58334Z"
                      fill="#747A80"
                    />
                  </svg>
                </div>
                <div className="investing_top_card_value investing_top_card_value_blue">
                  <p>{t("high")}</p>
                </div>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title={t(
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                  )}
                >
                  <p>{t("projectedYield")}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99996 1.16667C3.77996 1.16667 1.16663 3.78 1.16663 7C1.16663 10.22 3.77996 12.8333 6.99996 12.8333C10.22 12.8333 12.8333 10.22 12.8333 7C12.8333 3.78 10.22 1.16667 6.99996 1.16667ZM7.58329 9.91667H6.41663V8.75H7.58329V9.91667ZM7.58329 7.58334H6.41663V4.08334H7.58329V7.58334Z"
                      fill="#747A80"
                    />
                  </svg>
                </div>
                <div className="investing_top_card_value investing_top_card_value_blue">
                  {active3 == "1 месяц" ? <p>{t("upTo")} 30.14%</p> : ""}
                  {active3 == "3 месяца" ? <p>{t("upTo")} 90.42%</p> : ""}
                  {active3 == "6 месяцев" ? <p>{t("upTo")} 180.84%</p> : ""}
                  {active3 == "1 год" ? <p>{t("upTo")} 361.68%</p> : ""}
                </div>
              </div>
              <div className="investing_top_card_item investing_top_card_btns">
                {invest_times.map((times) => (
                  <button
                    className={
                      active3 === times.name
                        ? "investing_top_card_active_btn"
                        : ""
                    }
                    onClick={() => setActive3(times.name)}
                  >
                    {t(times.name)}
                  </button>
                ))}
              </div>
              <div className="investing_top_card_item investing_top_card_warning">
                <p>{t("profitabilityDisclaimer")}</p>
              </div>
              <div className="investing_top_card_select ">
                {activeCardSelect === 3 ? (
                  <button className="investing_top_card_select_active">
                    {t("select")}
                  </button>
                ) : (
                  <button onClick={() => setModal3(true)}>{t("select")}</button>
                )}
              </div>
            </div>
          </div>
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
                    <button onClick={deleteBot}>{t("delete")}</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="main_block_wrapper_bottom ">
                <div className="empty_block">
                  <img src={empty_block} alt="" />
                  <p>{t("noActiveInvestments")}</p>
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

      {/* overlay */}
      <div
        className={
          modal1 || modal2 || modal3 ? "overlay visible_overlay" : "overlay"
        }
        onClick={closeModals}
      ></div>

      {/* Modal 1 */}
      <div
        className={
          modal1
            ? "modal_wrapper invest_modal visible_modal_wrapper"
            : "modal_wrapper invest_modal"
        }
      >
        <div className="invest_modal_top">
          <div className="invest_modal_top_exit">
            <ExitModal onClick={closeModals} />
          </div>
        </div>
        <div className="invest_modal__content">
          <div className="invest_modal_top_content">
            <h2>{t("conservativeTitle")}</h2>
            <div className="invest_modal_top_content_descriptions">
              <div>
                <h3>{t("riskLevel")}</h3>
                <p>{t("low")}</p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>
              <div>
                <h3>{t("maxDrawdown")}</h3>
                <p>
                  <span>3.23%</span>
                </p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>

              <div>
                <h3>{t("pnl30Days")}</h3>
                <p>+10.43%</p>
              </div>
            </div>
          </div>
          <div className="invest_modal__content_line"></div>
          <div className="invest_modal_bottom_content">
            <div className="invest_modal_bottom_content_item">
              <div
                className="invest_modal_item_title"
                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              >
                <p>{t("investment")}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7.00033 1.16797C3.78033 1.16797 1.16699 3.7813 1.16699 7.0013C1.16699 10.2213 3.78033 12.8346 7.00033 12.8346C10.2203 12.8346 12.8337 10.2213 12.8337 7.0013C12.8337 3.7813 10.2203 1.16797 7.00033 1.16797ZM7.58366 9.91797H6.41699V8.7513H7.58366V9.91797ZM7.58366 7.58464H6.41699V4.08464H7.58366V7.58464Z"
                    fill="#92979C"
                  />
                </svg>
              </div>
              <div className="invest_modal_item_input">
                <input
                  type="number"
                  placeholder={t("min100")}
                  className={getInputClass("field1")}
                  onFocus={() => handleFocus("field1")}
                  onBlur={handleBlur}
                  value={amountInvestment}
                  onChange={(e) => handleSetAmountInvestment(e.target.value)}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                {t("available")}: {userData.balance || "0.00"} <span>USDT</span>
              </p>
            </div>
            <div className="invest_modal_bottom_content_item">
              <div
                className="invest_modal_item_title"
                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              >
                <p>{t("totalStopLoss")}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7.00033 1.16797C3.78033 1.16797 1.16699 3.7813 1.16699 7.0013C1.16699 10.2213 3.78033 12.8346 7.00033 12.8346C10.2203 12.8346 12.8337 10.2213 12.8337 7.0013C12.8337 3.7813 10.2203 1.16797 7.00033 1.16797ZM7.58366 9.91797H6.41699V8.7513H7.58366V9.91797ZM7.58366 7.58464H6.41699V4.08464H7.58366V7.58464Z"
                    fill="#92979C"
                  />
                </svg>
                <div className="switch_toggler">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="invest_modal_item_input">
                <input
                  type="number"
                  value={stopLos}
                  disabled={!isChecked}
                  onChange={(e) => handleSetStopLos(e.target.value)}
                  placeholder={t("enterMaxAcceptableLoss")}
                  className={getInputClass("field2")}
                  onFocus={() => handleFocus("field2")}
                  onBlur={handleBlur}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                {t("ifNetLossReaches")} {stopLos ? stopLos : "--"} USDT,{" "}
                {t("investmentsWillStop")}
              </p>
            </div>
            {isChecked ? (
              <div
                className={
                  !informations
                    ? "hidden_referal   aditional_invest_modal"
                    : "aditional_invest_modal aditional_invest_modal_hidden"
                }
              >
                <div
                  className="login_input_titles"
                  onClick={() => setInformations(!informations)}
                >
                  <p>{t("additionalInformation")}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="aditional_invest_modal_content">
                  <h3>{t("volumeStopLoss")}</h3>
                  <p>{t("volumeStopLossDescription")}</p>
                  <p>{t("volumeStopLossExample")}</p>
                  <p>{t("volumeStopLossDefault")}</p>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="invest_modal_terms">
              <input type="checkbox" />
              <p>
                {t("iHaveReadAndAccept")} <a href="#">{t("termsOfUse")}</a>
              </p>
            </div>
            <div class="investing_top_card_select invest_modal_select">
              <button onClick={() => addBot("conservative")}>
                {t("select")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 2 */}
      <div
        className={
          modal2
            ? "modal_wrapper invest_modal visible_modal_wrapper"
            : "modal_wrapper invest_modal"
        }
      >
        <div className="invest_modal_top">
          <div className="invest_modal_top_exit">
            <ExitModal onClick={closeModals} />
          </div>
        </div>
        <div className="invest_modal__content">
          <div className="invest_modal_top_content">
            <h2>{t("moderateTitle")}</h2>
            <div className="invest_modal_top_content_descriptions">
              <div>
                <h3>{t("riskLevel")}</h3>
                <p className="risk_orange">{t("low")}</p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>
              <div>
                <h3>{t("maxDrawdown")}</h3>
                <p>
                  <span>6.54%</span>
                </p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>

              <div>
                <h3>{t("pnl30Days")}</h3>
                <p>+21.65%</p>
              </div>
            </div>
          </div>
          <div className="invest_modal__content_line"></div>
          <div className="invest_modal_bottom_content">
            <div className="invest_modal_bottom_content_item">
              <div
                className="invest_modal_item_title"
                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              >
                <p>{t("investment")}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7.00033 1.16797C3.78033 1.16797 1.16699 3.7813 1.16699 7.0013C1.16699 10.2213 3.78033 12.8346 7.00033 12.8346C10.2203 12.8346 12.8337 10.2213 12.8337 7.0013C12.8337 3.7813 10.2203 1.16797 7.00033 1.16797ZM7.58366 9.91797H6.41699V8.7513H7.58366V9.91797ZM7.58366 7.58464H6.41699V4.08464H7.58366V7.58464Z"
                    fill="#92979C"
                  />
                </svg>
              </div>
              <div className="invest_modal_item_input">
                <input
                  type="number"
                  placeholder={t("min100")}
                  className={getInputClass("field3")}
                  onFocus={() => handleFocus("field3")}
                  onBlur={handleBlur}
                  value={amountInvestment}
                  onChange={(e) => handleSetAmountInvestment(e.target.value)}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                {t("available")}: {userData.balance || "0.00"} <span>USDT</span>
              </p>
            </div>
            <div className="invest_modal_bottom_content_item">
              <div
                className="invest_modal_item_title"
                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              >
                <p>{t("totalStopLoss")}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7.00033 1.16797C3.78033 1.16797 1.16699 3.7813 1.16699 7.0013C1.16699 10.2213 3.78033 12.8346 7.00033 12.8346C10.2203 12.8346 12.8337 10.2213 12.8337 7.0013C12.8337 3.7813 10.2203 1.16797 7.00033 1.16797ZM7.58366 9.91797H6.41699V8.7513H7.58366V9.91797ZM7.58366 7.58464H6.41699V4.08464H7.58366V7.58464Z"
                    fill="#92979C"
                  />
                </svg>
                <div className="switch_toggler">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="invest_modal_item_input">
                <input
                  type="number"
                  value={stopLos}
                  disabled={!isChecked}
                  onChange={(e) => handleSetStopLos(e.target.value)}
                  placeholder={t("enterMaxAcceptableLoss")}
                  className={getInputClass("field4")}
                  onFocus={() => handleFocus("field4")}
                  onBlur={handleBlur}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                {t("ifNetLossReaches")} {stopLos ? stopLos : "--"} USDT,{" "}
                {t("investmentsWillStop")}
              </p>
            </div>
            {isChecked ? (
              <div
                className={
                  !informations
                    ? "hidden_referal   aditional_invest_modal"
                    : "aditional_invest_modal aditional_invest_modal_hidden"
                }
              >
                <div
                  className="login_input_titles"
                  onClick={() => setInformations(!informations)}
                >
                  <p>{t("additionalInformation")}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="aditional_invest_modal_content">
                  <h3>{t("volumeStopLoss")}</h3>
                  <p>{t("volumeStopLossDescription")}</p>
                  <p>{t("volumeStopLossExample")}</p>
                  <p>{t("volumeStopLossDefault")}</p>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="invest_modal_terms">
              <input type="checkbox" />
              <p>
                {t("iHaveReadAndAccept")} <a href="#">{t("termsOfUse")}</a>
              </p>
            </div>
            <div class="investing_top_card_select invest_modal_select">
              <button onClick={() => addBot("moderate")}>{t("select")}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 3 */}
      <div
        className={
          modal3
            ? "modal_wrapper invest_modal visible_modal_wrapper"
            : "modal_wrapper invest_modal"
        }
      >
        <div className="invest_modal_top">
          <div className="invest_modal_top_exit">
            <ExitModal onClick={closeModals} />
          </div>
        </div>
        <div className="invest_modal__content">
          <div className="invest_modal_top_content">
            <h2>{t("aggressive")}</h2>
            <div className="invest_modal_top_content_descriptions">
              <div>
                <h3>{t("riskLevel")}</h3>
                <p>
                  <span>{t("high")}</span>
                </p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>
              <div>
                <h3>{t("maxDrawdown")}</h3>
                <p>
                  <span>13.23%</span>
                </p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>

              <div>
                <h3>{t("pnl30Days")}</h3>
                <p>+30.14%</p>
              </div>
            </div>
          </div>
          <div className="invest_modal__content_line"></div>
          <div className="invest_modal_bottom_content">
            <div className="invest_modal_bottom_content_item">
              <div
                className="invest_modal_item_title"
                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              >
                <p>{t("investment")}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7.00033 1.16797C3.78033 1.16797 1.16699 3.7813 1.16699 7.0013C1.16699 10.2213 3.78033 12.8346 7.00033 12.8346C10.2203 12.8346 12.8337 10.2213 12.8337 7.0013C12.8337 3.7813 10.2203 1.16797 7.00033 1.16797ZM7.58366 9.91797H6.41699V8.7513H7.58366V9.91797ZM7.58366 7.58464H6.41699V4.08464H7.58366V7.58464Z"
                    fill="#92979C"
                  />
                </svg>
              </div>
              <div className="invest_modal_item_input">
                <input
                  type="number"
                  placeholder={t("min100")}
                  className={getInputClass("field5")}
                  onFocus={() => handleFocus("field5")}
                  onBlur={handleBlur}
                  value={amountInvestment}
                  onChange={(e) => handleSetAmountInvestment(e.target.value)}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                {t("available")}: {userData.balance || "0.00"} <span>USDT</span>
              </p>
            </div>
            <div className="invest_modal_bottom_content_item">
              <div
                className="invest_modal_item_title"
                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              >
                <p>{t("totalStopLoss")}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7.00033 1.16797C3.78033 1.16797 1.16699 3.7813 1.16699 7.0013C1.16699 10.2213 3.78033 12.8346 7.00033 12.8346C10.2203 12.8346 12.8337 10.2213 12.8337 7.0013C12.8337 3.7813 10.2203 1.16797 7.00033 1.16797ZM7.58366 9.91797H6.41699V8.7513H7.58366V9.91797ZM7.58366 7.58464H6.41699V4.08464H7.58366V7.58464Z"
                    fill="#92979C"
                  />
                </svg>
                <div className="switch_toggler">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="invest_modal_item_input">
                <input
                  type="number"
                  value={stopLos}
                  disabled={!isChecked}
                  onChange={(e) => handleSetStopLos(e.target.value)}
                  placeholder={t("enterMaxAcceptableLoss")}
                  className={getInputClass("field6")}
                  onFocus={() => handleFocus("field6")}
                  onBlur={handleBlur}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                {t("ifNetLossReaches")} {stopLos ? stopLos : "--"} USDT,{" "}
                {t("investmentsWillStop")}
              </p>
            </div>
            {isChecked ? (
              <div
                className={
                  !informations
                    ? "hidden_referal   aditional_invest_modal"
                    : "aditional_invest_modal aditional_invest_modal_hidden"
                }
              >
                <div
                  className="login_input_titles"
                  onClick={() => setInformations(!informations)}
                >
                  <p>{t("additionalInformation")}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="aditional_invest_modal_content">
                  <h3>{t("volumeStopLoss")}</h3>
                  <p>{t("volumeStopLossDescription")}</p>
                  <p>{t("volumeStopLossExample")}</p>
                  <p>{t("volumeStopLossDefault")}</p>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="invest_modal_terms">
              <input type="checkbox" />
              <p>
                {t("iHaveReadAndAccept")} <a href="#">{t("termsOfUse")}</a>
              </p>
            </div>
            <div class="investing_top_card_select invest_modal_select">
              <button onClick={() => addBot("aggressive")}>
                {t("select")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Investments;
