import React from "react";
import { NavLink } from "react-router-dom";

import "./base.css";

function Limits() {
  React.useEffect(() => {
    document.title = `Торговые лимиты | &Volume`;
  }, []);

  return (
    <div className="base_page_wrapper">
      <div className="base_top_block">
        <div className="base_top_block_wrapper">
          <div className="base_top_block_left">
            <div className="base_top_block_wrapper_nav">
              <div>
                <p>
                  <NavLink to="/base">База знаний</NavLink>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.9768 9.99999L6.85183 5.87499L8.03016 4.69666L13.3335 9.99999L8.03016 15.3033L6.85183 14.1242L10.9768 9.99916"
                      fill="#92979C"
                    />
                  </svg>
                  <NavLink to="/base">Тарифы</NavLink>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.9768 9.99999L6.85183 5.87499L8.03016 4.69666L13.3335 9.99999L8.03016 15.3033L6.85183 14.1242L10.9768 9.99916"
                      fill="#92979C"
                    />
                  </svg>
                  Торговые лимиты
                </p>
              </div>
            </div>
            <h1>Торговые лимиты</h1>
          </div>
        </div>
      </div>

      <div className="pages_wrapper register_page">
        <div className="register_page_top_data">
          <p>Опубликовано 1 дек 2023 г.</p>
          <p>|</p>
          <p>2 мин на чтение</p>
        </div>
        <div className="text_pages_wrapper">
          <h2>Лимит суммы торгов</h2>
          <p>
            Лимит суммы торгов - это та сумма, которую Volume будет использовать
            для торговли парами криптовалют. Для каждого тарифа эта сумма
            разная.
          </p>
          <p>
            <b>Пример:</b>
          </p>
          <p>
            В тарифе “Стартовый” эта сумма составляет $400. Это значит, что
            Volume будет использовать в торговле $400, даже если общий размер
            вашего депозита на криптовалютной бирже составляет, к примеру, $10
            000 или больше.
            <br />
            <br />
            Предположим, что после успешного месяца ваш баланс увеличился до
            $600. Тем не менее, используя тариф “Стартовый”, в торговле все
            равно будет использоваться сумма в $400.
            <br />
            <br />
            Чтобы увеличить сумму, доступную для торговли, вы можете
            переключиться на более высокий тариф.
            <br />
            <br />
            Это гибкая система, которая позволяет пользователям выбирать
            оптимальный лимит суммы торгов в зависимости от своих инвестиционных
            целей и степени комфорта.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Limits;
