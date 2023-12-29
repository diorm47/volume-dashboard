import React, { useEffect, useState } from "react";
import "./investments.css";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import empty_block from "../../assets/icons/empty-block.png";
import Snackbar from "../../components/snackbar/snackbar";

function Investments() {
  React.useEffect(() => {
    document.title = `Выберите метод | &Volume`;
  }, []);
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
  const [opened, setOpened] = useState();
  const [activeInvests, setActiveInvests] = useState();
  const toggleTabs = (data) => {
    if (data == opened) {
      setOpened("");
    } else {
      setOpened(data);
    }
  };
  const invest_times = [
    {
      name: "1 год",
    },
    {
      name: "6 месяцев",
    },
    {
      name: "3 месяца",
    },
    {
      name: "1 месяц",
    },
  ];
  const [active1, setActive1] = useState("1 месяц");
  const [active2, setActive2] = useState("1 месяц");
  const [active3, setActive3] = useState("1 месяц");
  const [activeCardSelect, setactiveCardSelect] = useState("");

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

  const addBot = (level_risk) => {
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
        if (!response.ok) {
          console.log(response.json());
          if (!response.success && response.error.api_keys_not_found) {
            snackOptions("Ошибка, не добавлен апи-ключ!", "error");
          } else if (!response.success && response.error.bots_limit) {
            snackOptions("Ошибка, достигнут лимит ботов!", "error");
          } else if (!response.success && response.error.unpaid_tariff) {
            snackOptions("Ошибка, нет активного тарифа!", "error");
          }
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("2", data);
        if (data.success) {
          snackOptions("Метод усешно добавлен!", "success");
          closeModals();
        }
        if (!data.success && data.error.api_keys_not_found) {
          snackOptions("Ошибка, не добавлен апи-ключ!", "error");
        } else if (!data.success && data.error.bots_limit) {
          snackOptions("Ошибка, достигнут лимит ботов!", "error");
        } else if (!data.success && data.error.unpaid_tariff) {
          snackOptions("Ошибка, нет активного тарифа!", "error");
        }
      })
      .catch((error) => {
        snackOptions("Ошибка!", "error");
      });
  };
  return (
    <>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
      <div className="pages_wrapper investments_page">
        <div className="page_title investments_page_title">
          <h2>Выберите метод </h2>
          <p>
            Выберите свой метод инвестирования и чувствуйте себя уверенно на
            любом временном промежутке.
          </p>
        </div>
        <div className="investments_page_wrapper">
          <div className="investing_top_cards">
            <div className="secondary_block_wrapper investing_top_card">
              <div className="main_block_wrapper_title">
                <h2>Консервативный</h2>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>Минимальная сумма инвестици</p>
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
                  <p>Уровень риска</p>
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
                  <p>Низкий</p>
                </div>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>Прогнозируемая доходность за период</p>
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
                  <p>до 10.43%</p>
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
                <p>
                  * Доходность рассчитана на основе исторических данных и не
                  является гарантией будущей доходности.
                </p>
              </div>
              <div className="investing_top_card_select">
                {activeCardSelect == 1 ? (
                  <button className="investing_top_card_select_active">
                    Выбрать
                  </button>
                ) : (
                  <button onClick={() => setModal1(true)}>Выбрать</button>
                )}
              </div>
            </div>
            <div className="secondary_block_wrapper investing_top_card">
              <div className="main_block_wrapper_title">
                <h2>Умеренный</h2>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>Минимальная сумма инвестици</p>
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
                  <p>Уровень риска</p>
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
                  <p>Средний</p>
                </div>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>Прогнозируемая доходность за период</p>
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
                  <p>до 21.65%</p>
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
                <p>
                  * Доходность рассчитана на основе исторических данных и не
                  является гарантией будущей доходности.
                </p>
              </div>
              <div className="investing_top_card_select">
                {activeCardSelect == 2 ? (
                  <button className="investing_top_card_select_active">
                    Выбрать
                  </button>
                ) : (
                  <button onClick={() => setModal2(true)}>Выбрать</button>
                )}
              </div>
            </div>
            <div className="secondary_block_wrapper investing_top_card">
              <div className="main_block_wrapper_title">
                <h2>Агрессивный</h2>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>Минимальная сумма инвестици</p>
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
                  <p>Уровень риска</p>
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
                  <p>Высокий</p>
                </div>
              </div>
              <div className="investing_top_card_item">
                <div
                  className="investing_top_card_descr"
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                >
                  <p>Прогнозируемая доходность за период</p>
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
                  <p>до 30.14%</p>
                </div>
              </div>
              <div className="investing_top_card_item investing_top_card_btns">
                {invest_times.map((times) => (
                  <button
                    className={
                      active3 == times.name
                        ? "investing_top_card_active_btn"
                        : ""
                    }
                    onClick={() => setActive3(times.name)}
                  >
                    {times.name}
                  </button>
                ))}
              </div>
              <div className="investing_top_card_item investing_top_card_warning">
                <p>
                  * Доходность рассчитана на основе исторических данных и не
                  является гарантией будущей доходности.
                </p>
              </div>
              <div className="investing_top_card_select ">
                {activeCardSelect == 3 ? (
                  <button className="investing_top_card_select_active">
                    Выбрать
                  </button>
                ) : (
                  <button onClick={() => setModal3(true)}>Выбрать</button>
                )}
              </div>
            </div>
          </div>
          <div className="orders_history_list main_block_wrapper">
            <div className="main_block_wrapper_top">
              <div className="main_block_wrapper_title secondary_title">
                <h2>Инвестиции</h2>
                <p>Здесь отображается активные инвестиции</p>
              </div>
            </div>
            {activeInvests ? (
              <div className="main_block_wrapper_bottom ">
                <div className="order_history_list_item ">
                  <div className="order_history_list_item_title">
                    <h2>&Volume</h2>
                  </div>
                  <div className="order_history_list_item_content analysis_order_items">
                    <div className="order_history_list_item_content_item">
                      <p>
                        Время создания <span>27.11.2023, 12:43:41</span>
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item">
                      <p>
                        Метод инвестирования <span>Агрессивный</span>
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item">
                      <p>
                        Начальная сумма<span>$ 100</span>
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item">
                      <p>
                        Используемая сумма <span>$ 154</span>
                      </p>
                    </div>

                    <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                      <p>
                        Прибыль или убыток <span>154,62 USDT</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="order_history_list_line"></div>

                <div className="investing_actions">
                  <div className="add_key_btn">
                    <button>Удалить</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="main_block_wrapper_bottom ">
                <div className="empty_block">
                  <img src={empty_block} alt="" />
                  <p>Нет активных инвестиций</p>
                </div>
              </div>
            )}
          </div>
          <div className="page_title investments_block_title">
            <h1 className="questions_title">Часто задаваемые вопросы</h1>
          </div>
          <div className="faq_invest">
            {faq.map((item) => (
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
            <h2>Консервативный</h2>
            <div className="invest_modal_top_content_descriptions">
              <div>
                <h3>Уровень риска</h3>
                <p>Низкий</p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>
              <div>
                <h3>Макс.просадка</h3>
                <p>
                  <span>3.23%</span>
                </p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>

              <div>
                <h3>PNL(%) за 30 дней</h3>
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
                <p>Инвестиции</p>
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
                  placeholder="Мин.100"
                  className={getInputClass("field1")}
                  onFocus={() => handleFocus("field1")}
                  onBlur={handleBlur}
                  value={amountInvestment}
                  onChange={(e) => setAmountInvestment(e.target.value)}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                Доступно: 0,00 USDT
              </p>
            </div>
            <div className="invest_modal_bottom_content_item">
              <div
                className="invest_modal_item_title"
                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              >
                <p>Общий стоп-лосс</p>
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
                  onChange={(e) => setStopLos(e.target.value)}
                  placeholder="Введите максимально приемлемый убыток"
                  className={getInputClass("field2")}
                  onFocus={() => handleFocus("field2")}
                  onBlur={handleBlur}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                Если ваш чистый убыток достигнет {stopLos ? stopLos : "--"}{" "}
                USDT, инвестиции прекратятся
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
                  <p>Дополнительная информация</p>
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
                  <h3>
                    В &Volume стоп-лосс это ручной механизм ограничения потерь.
                  </h3>
                  <p>
                    Вы указываете общий абсолютный уровень потерь в USDT, а не
                    процентный. Например, сумма торгов $1000, вы устанавливаете
                    общий стоп-лосс $200.
                  </p>
                  <p>
                    В случае, если в какой-либо из сделок криптовалюта аномально
                    снизится (или возрастет) в цене, ваш убыток не превысит
                    $200, а сервис временно перестанет открывать сделки до
                    нормализации рыночных условий.
                  </p>
                  <p>
                    Если не установить значение вручную, то по умолчанию общий
                    стоп-лосс составит 50% от депозита на бирже.
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="invest_modal_terms">
              <input type="checkbox" />
              <p>
                Я прочитал(-а) и принимаю <a href="#">Условия использования</a>
              </p>
            </div>
            <div class="investing_top_card_select invest_modal_select">
              <button
                onClick={() => addBot("conservative")}
                disabled={!amountInvestment}
              >
                Выбрать
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
            <h2>Умеренный</h2>
            <div className="invest_modal_top_content_descriptions">
              <div>
                <h3>Уровень риска</h3>
                <p className="risk_orange">Низкий</p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>
              <div>
                <h3>Макс.просадка</h3>
                <p>
                  <span>6.54%</span>
                </p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>

              <div>
                <h3>PNL(%) за 30 дней</h3>
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
                <p>Инвестиции</p>
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
                  placeholder="Мин.100"
                  className={getInputClass("field3")}
                  onFocus={() => handleFocus("field3")}
                  onBlur={handleBlur}
                  value={amountInvestment}
                  onChange={(e) => setAmountInvestment(e.target.value)}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                Доступно: 0,00 USDT
              </p>
            </div>
            <div className="invest_modal_bottom_content_item">
              <div
                className="invest_modal_item_title"
                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              >
                <p>Общий стоп-лосс</p>
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
                  onChange={(e) => setStopLos(e.target.value)}
                  placeholder="Введите максимально приемлемый убыток"
                  className={getInputClass("field4")}
                  onFocus={() => handleFocus("field4")}
                  onBlur={handleBlur}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                Если ваш чистый убыток достигнет {stopLos ? stopLos : "--"}{" "}
                USDT, инвестиции прекратятся
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
                  <p>Дополнительная информация</p>
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
                  <h3>
                    В &Volume стоп-лосс это ручной механизм ограничения потерь.
                  </h3>
                  <p>
                    Вы указываете общий абсолютный уровень потерь в USDT, а не
                    процентный. Например, сумма торгов $1000, вы устанавливаете
                    общий стоп-лосс $200.
                  </p>
                  <p>
                    В случае, если в какой-либо из сделок криптовалюта аномально
                    снизится (или возрастет) в цене, ваш убыток не превысит
                    $200, а сервис временно перестанет открывать сделки до
                    нормализации рыночных условий.
                  </p>
                  <p>
                    Если не установить значение вручную, то по умолчанию общий
                    стоп-лосс составит 50% от депозита на бирже.
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="invest_modal_terms">
              <input type="checkbox" />
              <p>
                Я прочитал(-а) и принимаю <a href="#">Условия использования</a>
              </p>
            </div>
            <div class="investing_top_card_select invest_modal_select">
              <button
                onClick={() => addBot("moderate")}
                disabled={!amountInvestment}
              >
                Выбрать
              </button>
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
            <h2>Агрессивный</h2>
            <div className="invest_modal_top_content_descriptions">
              <div>
                <h3>Уровень риска</h3>
                <p>
                  <span>Высокий</span>
                </p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>
              <div>
                <h3>Макс.просадка</h3>
                <p>
                  <span>13.23%</span>
                </p>
              </div>
              <div className="invest_modal_top_content_descriptions_line"></div>

              <div>
                <h3>PNL(%) за 30 дней</h3>
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
                <p>Инвестиции</p>
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
                  placeholder="Мин.100"
                  className={getInputClass("field5")}
                  onFocus={() => handleFocus("field5")}
                  onBlur={handleBlur}
                  value={amountInvestment}
                  onChange={(e) => setAmountInvestment(e.target.value)}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                Доступно: 0,00 USDT
              </p>
            </div>
            <div className="invest_modal_bottom_content_item">
              <div
                className="invest_modal_item_title"
                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              >
                <p>Общий стоп-лосс</p>
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
                  onChange={(e) => setStopLos(e.target.value)}
                  placeholder="Введите максимально приемлемый убыток"
                  className={getInputClass("field6")}
                  onFocus={() => handleFocus("field6")}
                  onBlur={handleBlur}
                />
                <p>USDT</p>
              </div>
              <p className="invest_modal_bottom_content_item_text">
                Если ваш чистый убыток достигнет {stopLos ? stopLos : "--"}{" "}
                USDT, инвестиции прекратятся
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
                  <p>Дополнительная информация</p>
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
                  <h3>
                    В &Volume стоп-лосс это ручной механизм ограничения потерь.
                  </h3>
                  <p>
                    Вы указываете общий абсолютный уровень потерь в USDT, а не
                    процентный. Например, сумма торгов $1000, вы устанавливаете
                    общий стоп-лосс $200.
                  </p>
                  <p>
                    В случае, если в какой-либо из сделок криптовалюта аномально
                    снизится (или возрастет) в цене, ваш убыток не превысит
                    $200, а сервис временно перестанет открывать сделки до
                    нормализации рыночных условий.
                  </p>
                  <p>
                    Если не установить значение вручную, то по умолчанию общий
                    стоп-лосс составит 50% от депозита на бирже.
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="invest_modal_terms">
              <input type="checkbox" />
              <p>
                Я прочитал(-а) и принимаю <a href="#">Условия использования</a>
              </p>
            </div>
            <div class="investing_top_card_select invest_modal_select">
              <button
                onClick={() => addBot("aggressive")}
                disabled={!amountInvestment}
              >
                Выбрать
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Investments;
