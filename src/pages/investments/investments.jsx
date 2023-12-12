import React, { useState } from "react";
import "./investments.css";

function Investments() {
  React.useEffect(() => {
    document.title = `Выберите метод | &Volume`;
  }, []);
  const faq = [
    {
      question: "Что такое инвестиции?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Как выбрать подходящий вид инвестиций?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Могу ли я потерять деньги на инвестициях?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Как управлять рисками при инвестировании?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Что делать, если я не уверен в своих инвестиционных навыках?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Как начать инвестировать?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Как рассчитывается прогнозируемый доход? ",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
  ];
  const [opened, setOpened] = useState();
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
  return (
    <div className="pages_wrapper investments_page">
      <div className="page_title investments_page_title">
        <h2>Выберите метод </h2>
        <p>
          Выберите свой метод инвестирования и чувствуйте себя уверенно на любом
          временном промежутке.
        </p>
      </div>
      <div className="investments_page_wrapper">
        <div className="investing_top_cards">
          <div className="secondary_block_wrapper investing_top_card">
            <div className="main_block_wrapper_title">
              <h2>Консервативный</h2>
            </div>
            <div className="investing_top_card_item">
              <div className="investing_top_card_descr">
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
              <div className="investing_top_card_descr">
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
              <div className="investing_top_card_descr">
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
                    active1 == times.name ? "investing_top_card_active_btn" : ""
                  }
                  onClick={() => setActive1(times.name)}
                >
                  {times.name}
                </button>
              ))}
            </div>
            <div className="investing_top_card_item investing_top_card_warning">
              <p>
                * Баланс счета рассчитан на основе{" "}
                <a href="#">исторических данных</a> и не является гарантией
                будущей доходности.
              </p>
            </div>
            <div className="investing_top_card_select">
              {activeCardSelect == 1 ? (
                <button className="investing_top_card_select_active">
                  Активный
                </button>
              ) : (
                <button onClick={() => setactiveCardSelect(1)}>Выбрать</button>
              )}
            </div>
          </div>
          <div className="secondary_block_wrapper investing_top_card">
            <div className="main_block_wrapper_title">
              <h2>Умеренный</h2>
            </div>
            <div className="investing_top_card_item">
              <div className="investing_top_card_descr">
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
              <div className="investing_top_card_descr">
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
              <div className="investing_top_card_descr">
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
                    active2 == times.name ? "investing_top_card_active_btn" : ""
                  }
                  onClick={() => setActive2(times.name)}
                >
                  {times.name}
                </button>
              ))}
            </div>
            <div className="investing_top_card_item investing_top_card_warning">
              <p>
                * Баланс счета рассчитан на основе{" "}
                <a href="#">исторических данных</a> и не является гарантией
                будущей доходности.
              </p>
            </div>
            <div className="investing_top_card_select">
              {activeCardSelect == 2 ? (
                <button className="investing_top_card_select_active">
                  Активный
                </button>
              ) : (
                <button onClick={() => setactiveCardSelect(2)}>Выбрать</button>
              )}
            </div>
          </div>
          <div className="secondary_block_wrapper investing_top_card">
            <div className="main_block_wrapper_title">
              <h2>Агрессивный</h2>
            </div>
            <div className="investing_top_card_item">
              <div className="investing_top_card_descr">
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
              <div className="investing_top_card_descr">
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
              <div className="investing_top_card_descr">
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
                    active3 == times.name ? "investing_top_card_active_btn" : ""
                  }
                  onClick={() => setActive3(times.name)}
                >
                  {times.name}
                </button>
              ))}
            </div>
            <div className="investing_top_card_item investing_top_card_warning">
              <p>
                * Баланс счета рассчитан на основе{" "}
                <a href="#">исторических данных</a> и не является гарантией
                будущей доходности.
              </p>
            </div>
            <div className="investing_top_card_select ">
              {activeCardSelect == 3 ? (
                <button className="investing_top_card_select_active">
                  Активный
                </button>
              ) : (
                <button onClick={() => setactiveCardSelect(3)}>Выбрать</button>
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
              <div class="add_key_btn">
                <button>Удалить</button>
              </div>
            </div>
          </div>
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13 11V4H11V11H4V13H11V20H13V13H20V11H13Z"
                    fill="#111112"
                  />
                </svg>{" "}
              </div>
              <div className="faq_invest_item_answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Investments;
