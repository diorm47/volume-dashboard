import React from "react";
import { NavLink } from "react-router-dom";

import "./base.css";

function TopupTypes() {
  React.useEffect(() => {
    document.title = `Способы пополнения | &Volume`;
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
                  Способы пополнения
                </p>
              </div>
            </div>
            <h1>Способы пополнения</h1>
          </div>
        </div>
      </div>

      <div className="pages_wrapper register_page topup_base">
        <div className="register_page_top_data">
          <p>Опубликовано 1 дек 2023 г.</p>
          <p>|</p>
          <p>2 мин на чтение</p>
        </div>
        <div className="text_pages_wrapper">
          <h2>Способы пополнения биржевого счета</h2>
          <p>
            Существует несколько способов пополнения биржевого счета на
            криптовалютных биржах:
          </p>
          <h2>1. Перевод криптовалюты:</h2>
          <p>
            <div className="api_list_ul_ol">
              <ul>
                <li>
                  На большинстве бирж можно перевести криптовалюту с одного
                  адреса на другой. Для этого нужно знать адрес кошелька
                  получателя и иметь доступ к приватному ключу своего кошелька.
                </li>
              </ul>
            </div>
          </p>
          <h2>2. Банковский перевод:</h2>
          <p>
            <div className="api_list_ul_ol">
              <ul>
                <li>
                  Некоторые биржи позволяют пополнять счет через банковский
                  перевод. Однако этот способ может быть медленным и
                  дорогостоящим.
                </li>
              </ul>
            </div>
          </p>
          <h2>3. Платежные сервисы:</h2>
          <p>
            <div className="api_list_ul_ol">
              <ul>
                <li>
                  Некоторые биржи поддерживают работу с платежными системами,
                  такими как PayPal, Skrill и др.
                </li>
              </ul>
            </div>
          </p>
          <h2>4. P2P торговля:</h2>
          <p>
            <div className="api_list_ul_ol">
              <ul>
                <li>
                  Некоторые биржи предлагают возможность покупки криптовалюты у
                  других пользователей через P2P торговлю.
                </li>
              </ul>
              <br />
              <b>
                Каждый способ имеет свои преимущества и недостатки, поэтому
                выбор зависит от конкретной биржи и потребностей пользователя.
              </b>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopupTypes;
