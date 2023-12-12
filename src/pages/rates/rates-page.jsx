import React, { useState } from "react";

function RatesPage() {
  React.useEffect(() => {
    document.title = `Выберите тарифный план | &Volume`;
  }, []);
  const faq = [
    {
      question: "Могу ли я перейти на улучшенный тариф после оплаты?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question:
        "Могу ли я поменять тарифный план пока действует пробный период?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Как я могу отменить тарифный план?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Как я могу оформить возврат?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Какая минимальная сумма?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Какие комиссии и условия использования?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor tempore illum cupiditate aspernatur, nam sapiente quidem velit in vel accusantium, neque blanditiis quaerat corporis illo consectetur architecto ipsum veritatis nisi.",
    },
    {
      question: "Какие гарантии безопасности?",
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
  return (
    <>
      <div class="page_title investments_page_title rate_title">
        <h2>Выберите <span>тарифный</span> план</h2>
        <p>
          При оплате тарифа платёжный сервис берет комиссию за проведение
          транзакции. <br /> Внимательно указывайте сумму с учётом комиссии.
        </p>
      </div>
      <div class="secondary_block_wrapper">
        <div class="main_block_wrapper_title">
          <h2>Тарифный план</h2>
        </div>
        <div class="tarif_plan">
          <div class="tarif_plan_top">
            <p>Продвинутый</p>
            <p>$ 100</p>
          </div>
          <div class="tarif_plan_time">
            <div class="tarif_plan_time_title">
              <p>30 дней</p>
              <p>12 дней</p>
            </div>
            <div class="tarif_plan_time_block">
              <div class="tarif_plan_time_block_value"></div>
            </div>
          </div>
          <div class="review_right_link">
            <p>Добавить + 30 дней</p>
          </div>
        </div>
      </div>
      <div className="rates_cards">
        <div class="secondary_block_wrapper rates_card">
          <div class="main_block_wrapper_title">
            <h2>Стартовый</h2>
            <p>Для новых инвесторов</p>
          </div>
          <div class="order_history_list_line"></div>
          <div className="rates_card_descr">
            <div className="rates_card_descr_price">
              <p>
                $ 25 <span>/ ежемесячно</span>
              </p>
            </div>
            <div className="rates_card_descr_limit">
              <p>Лимит суммы в торгах до $400</p>
            </div>
          </div>
          <div class="order_history_list_line"></div>
          <div class="investing_top_card_select">
            <button>Купить</button>
          </div>
        </div>
        <div class="secondary_block_wrapper rates_card">
          <div class="main_block_wrapper_title">
            <h2>Улучшенный</h2>
            <p>Для опытных инвесторов</p>
          </div>
          <div class="order_history_list_line"></div>
          <div className="rates_card_descr">
            <div className="rates_card_descr_price">
              <p>
                $ 50 <span>/ ежемесячно</span>
              </p>
            </div>
            <div className="rates_card_descr_limit">
              <p>Лимит суммы в торгах до $401 до $900</p>
            </div>
          </div>
          <div class="order_history_list_line"></div>
          <div class="investing_top_card_select">
            <button>Купить</button>
          </div>
        </div>
        <div class="secondary_block_wrapper rates_card">
          <div class="main_block_wrapper_title">
            <h2>Продвинутый</h2>
            <p>Для профессионалов </p>
          </div>
          <div class="order_history_list_line"></div>
          <div className="rates_card_descr">
            <div className="rates_card_descr_price">
              <p>
                $ 100 <span>/ ежемесячно</span>
              </p>
            </div>
            <div className="rates_card_descr_limit">
              <p>Лимит суммы в торгах до $901 до $3 000</p>
            </div>
          </div>
          <div class="order_history_list_line"></div>
          <div class="investing_top_card_select">
            <button>Купить</button>
          </div>
        </div>
      </div>
      <div class="secondary_block_wrapper rates_warning">
        <div class="main_block_wrapper_title">
          <h2>Не теряйте самоконтроль</h2>
          <p>
            Инвестиции в торговлю криптовалютой рискованнее, чем традиционные
            инструменты (вклад в банк, покупка акцией на долгий срок и т.п.),
            рассчитывайте свои риски и не инвестируйте все свои сбережения.
          </p>
        </div>
      </div>
      <div className="page_title investments_block_title">
        <h2>Часто задаваемые вопросы</h2>
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
    </>
  );
}

export default RatesPage;
