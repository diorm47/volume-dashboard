import React from "react";
import { NavLink } from "react-router-dom";

import "./base.css";

function P2p() {
  React.useEffect(() => {
    document.title = `P2P-торговля | &Volume`;
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
                  <NavLink to="/base">Покупка и продажа криптовалюты</NavLink>{" "}
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
                  P2P-торговля
                </p>
              </div>
            </div>
            <h1>P2P-торговля</h1>
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
          <h2>
            Покупка криптовалюты USDT на бирже Binance или ByBit через P2P
          </h2>
          <p>
            <b>Для покупки USDT на Binance через P2P, следуйте этим шагам:</b>
          </p>

          <div className="api_list_ul_ol">
            <ul>
              <li>
                Войдите в свою учетную запись Binance и перейдите в раздел
                “Торговля” (Trade).
              </li>
              <li>
                Выберите вкладку P2P (Person to Person) и выберите рынок, на
                котором вы хотите совершить сделку (например, RUB,USD,EUR).
              </li>
              <li>
                Введите сумму в рублях, долларах, евро, которую вы хотите
                потратить на покупку USDT.
              </li>
              <li>
                Выберите продавца, который предлагает наиболее выгодную сделку
                для вас. Обратите внимание на отзывы других пользователей и
                рейтинг продавца.
              </li>
              <li>Подтвердите сделку, следуя инструкциям на экране.</li>
            </ul>
          </div>
          <p><b>Для покупки USDT на Bybit через P2P процесс аналогичен, но вам нужно перейти в раздел P2P Trading на их веб-сайте или мобильном приложении.</b></p>
        </div>
      </div>
    </div>
  );
}

export default P2p;
