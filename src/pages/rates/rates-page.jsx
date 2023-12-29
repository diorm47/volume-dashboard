import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { mainApi } from "../../components/utils/main-api";

function RatesPage() {
  React.useEffect(() => {
    document.title = `Выберите план | &Volume`;
  }, []);
  const faq = [
    {
      question: "Могу ли я перейти на другой тариф после оплаты?",
      answer:
        "Да. Если хотите перейти на тариф дороже, нужно будет доплатить разницу в зависимости от использованных дней. Если хотите перейти на тариф ниже, то нужно попросить возврат средств за оставшиеся дни, а затем оплатить новый. \n  Обе операции пока что невозможно совершить самостоятельно, обращайтесь в службу поддержки через форму обратной связи на сайте или в Телеграм-бота.",
    },
    {
      question: "Какая должна быть минимальная сумма депозита?",
      answer:
        "Сервис доступен при балансе депозита от $100. Чтобы получить доход и одновременно окупить стоимость подписки рекомендуем использовать не менее $250 - $500. Также рекомендуем не использовать больше $3 000 в первый месяц.",
    },
    {
      question: "Какие комиссии и условия использования?",
      answer:
        "Не берём комиссии со сделок и не взимаем процент с дохода. Чтобы использовать сервис, нужно купить подписку. Стоимость подписки зависит от суммы инвестиций: чем выше депозит, тем дороже подписка. В будущем для пользователей с депозитами выше $5 000 может появиться подписка с оплатой от прибыли.",
    },
    {
      question:
        "Могу ли я изменить тарифный план пока действует пробный период?",
      answer:
        "Да. Чтобы купить подписку на нужный тариф, выберете его на странице “Тарифы” и следуйте инструкциям для оплаты. Если в процессе возникнут вопросы - обращайтесь в службу поддержки.",
    },
    {
      question: "Как я могу оформить возврат?",
      answer:
        "Чтобы получить возврат за неиспользованные дни, нужно обратиться в службу поддержки, либо через форму обратной связи, либо в Телегра-бота.",
    },
  ];
  const [opened, setOpened] = useState();
  const [userData, setUserData] = useState({});
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
      refresh();
    }
  }, [localStorage.getItem("token")]);
  const toggleTabs = (data) => {
    if (data == opened) {
      setOpened("");
    } else {
      setOpened(data);
    }
  };
  const activateDemoTariff = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://trade.margelet.org/private-api/v1/users/demo/activate", {
      method: "POST",

      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="page_title investments_page_title rate_title">
        <h2>Выберите план</h2>
        <p>
          При оплате тарифа платёжный сервис берет комиссию за проведение
          транзакции. <br /> Внимательно указывайте сумму с учётом комиссии.
        </p>
      </div>
      {userData && userData.tariff ? (
        <div className="secondary_block_wrapper">
          <div className="main_block_wrapper_title">
            <h2>Тарифный план</h2>
          </div>
          <div className="tarif_plan">
            <div className="tarif_plan_top">
              <p>{userData.tariff}</p>
              <p>$ 100</p>
            </div>

            <div className="tarif_plan_time">
              <div className="tarif_plan_time_title">
                <p>30 дней</p>
                <p>12 дней</p>
              </div>
              <div className="tarif_plan_time_block">
                <div className="tarif_plan_time_block_value"></div>
              </div>
            </div>
            <div className="review_right_link">
              <NavLink to="/rates/rates">
                <p>Добавить + 30 дней</p>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="secondary_block_wrapper">
          <div className="main_block_wrapper_title">
            <h2>Пробный период</h2>
          </div>
          <div className="tarif_plan">
            <div className="tarif_plan_top">
              <p>7 дней бесплатно</p>
            </div>
            <div className="free_tarif">
              <p>
                Активируйте тестовый период уже сегодня и получите доступ к
                широкому спектру возможностей.{" "}
              </p>
            </div>
            <div className="review_right_link">
              <p onClick={activateDemoTariff}>Активировать</p>
            </div>
          </div>
        </div>
      )}
      <div className="rates_cards">
        <div className="secondary_block_wrapper rates_card">
          <div className="main_block_wrapper_title">
            <h2>Стартовый</h2>
            <p>Для новых инвесторов</p>
          </div>
          <div className="order_history_list_line"></div>
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
          <div className="order_history_list_line"></div>
          <div className="investing_top_card_select">
            <button>Купить</button>
          </div>
        </div>
        <div className="secondary_block_wrapper rates_card">
          <div className="main_block_wrapper_title">
            <h2>Улучшенный</h2>
            <p>Для опытных инвесторов</p>
          </div>
          <div className="order_history_list_line"></div>
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
          <div className="order_history_list_line"></div>
          <div className="investing_top_card_select">
            <button>Купить</button>
          </div>
        </div>
        <div className="secondary_block_wrapper rates_card">
          <div className="main_block_wrapper_title">
            <h2>Продвинутый</h2>
            <p>Для профессионалов </p>
          </div>
          <div className="order_history_list_line"></div>
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
          <div className="order_history_list_line"></div>
          <div className="investing_top_card_select">
            <button>Купить</button>
          </div>
        </div>
      </div>
      <div className="secondary_block_wrapper rates_warning">
        <div className="main_block_wrapper_title">
          <h2>Не теряйте самоконтроль</h2>
          <p>
            Инвестиции в торговлю криптовалютой рискованнее, чем традиционные
            инструменты (вклад в банк, покупка акцией на долгий срок и т.п.),
            рассчитывайте свои риски и не инвестируйте все свои сбережения.
          </p>
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
    </>
  );
}

export default RatesPage;
