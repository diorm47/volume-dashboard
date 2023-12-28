import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import img1 from "../../assets/images/api/api-b-1.png";

import bybit1 from "../../assets/images/api/api-by-1.png";
import bybit2 from "../../assets/images/api/api-by-2.png";
import bybit3 from "../../assets/images/api/api-by-3.png";
import bybit4 from "../../assets/images/api/api-by-4.png";
import bybit5 from "../../assets/images/api/api-by-5.png";
import bybit6 from "../../assets/images/api/api-by-6.png";

import "./base.css";

function ApiConnectiong() {
  React.useEffect(() => {
    document.title = `API | &Volume`;
  }, []);
  const [section, setSection] = useState(1);
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
                  <NavLink to="/base">Подключение</NavLink>{" "}
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
                  API
                </p>
              </div>
            </div>
            <h1>API</h1>
          </div>
        </div>
      </div>

      <div className="pages_wrapper register_page">
        <div className="register_page_top_data">
          <p>Опубликовано 1 дек 2023 г.</p>
          <p>|</p>
          <p>2 мин на чтение</p>
        </div>
        <div className="register_top_togglers">
          <button
            onClick={() => setSection(1)}
            className={section == 1 ? "active_register_top_toggler" : ""}
          >
            Binance
          </button>
          <button
            onClick={() => setSection(2)}
            className={section == 2 ? "active_register_top_toggler" : ""}
          >
            Bybit
          </button>
        </div>
        {section == 1 ? (
          <>
            {" "}
            <div className="register_page_block_title">
              <h2>Как создать API ключ на бирже Binance</h2>
            </div>
            <div className="api_list_ul_ol">
              <h4>Примечание:</h4>
              <ul>
                <li>
                  Создание API ключа может быть выполнено только с помощью ПК
                  или веб-сайта, так как нет возможности сделать это через
                  мобильное приложение Binance.
                </li>
              </ul>
            </div>
            <div className="register_page_text">
              <p>
                Войдите в аккаунт Binance и выберите Профиль —
                <a
                  target="_blank"
                  href="https://www.binance.com/ru/my/settings/api-management"
                >
                  Управление API.
                </a>{" "}
              </p>
            </div>
            <img src={img1} alt="" />
            <div className="api_list_ul_ol">
              <h4>
                Обратите внимание, что перед созданием API-ключа вы должны:
              </h4>
              <ul>
                <li>
                  Активировать{" "}
                  <a
                    target="_blank"
                    href="https://www.binance.com/ru/support/faq/account-functions?c=1&navId=1#11"
                  >
                    двухфакторную аутентификацию (2FA)
                  </a>{" "}
                  на своем аккаунте.
                </li>
                <li>
                  Внести любую сумму на спотовый кошелек для активации аккаунта.
                </li>
                <li>
                  Пройти{" "}
                  <a
                    target="_blank"
                    href="https://www.binance.com/ru/support/faq/360027287111"
                  >
                    проверку личности.
                  </a>{" "}
                </li>{" "}
                <li>
                  Перейти в деривативы и создать{" "}
                  <a
                    target="_blank"
                    href="https://www.binance.com/en/futures/BNXUSDT"
                  >
                    фьючерсный аккаунт.
                  </a>{" "}
                </li>
              </ul>
            </div>
            <div className="register_page_text">
              <p>2. Снимите галочку с элементов управления безопасности</p>
            </div>
          </>
        ) : (
          <>
            <div className="register_page_block_title">
              <h2>Как создать API ключ на бирже Bybit</h2>
            </div>
            <div className="api_list_ul_ol">
              <h4>Примечание:</h4>
              <ul>
                <li>
                  Создание API ключа может быть выполнено только с помощью ПК
                  или веб-сайта, так как нет возможности сделать это через
                  мобильное приложение Bybit.
                </li>
              </ul>
            </div>
            <div className="register_page_text">
              <p>
                Войдите в аккаунт Bybit и выберите Профиль —{" "}
                <a
                  target="_blank"
                  href="https://www.bybit.com/app/user/api-management"
                >
                  API.
                </a>
              </p>
            </div>
            <img src={bybit1} alt="" />
            <div className="api_list_ul_ol">
              <h4>
                Обратите внимание, что перед созданием API-ключа вы должны:
              </h4>
              <ul>
                <li>
                  Активировать{" "}
                  <a
                    target="_blank"
                    href="https://www.bybit.com/app/user/security"
                  >
                    двухфакторную аутентификацию (2FA)
                  </a>{" "}
                  на своем аккаунте.
                </li>
                <li>
                  Внести любую сумму на спотовый кошелек для активации аккаунта.
                </li>
                <li>
                  Пройти{" "}
                  <a
                    target="_blank"
                    href="https://www.bybit.com/app/user/security"
                  >
                    проверку личности.
                  </a>{" "}
                </li>{" "}
              </ul>
            </div>
            <div className="register_page_text">
              <p>2. Нажмите Создать API.</p>
            </div>
            <img src={bybit2} alt="" />
            <div className="register_page_text">
              <p>3. Выберите тип API-ключа сгенерированный системой Bybit.</p>
            </div>
            <img src={bybit3} alt="" />
            <div className="register_page_text">
              <p>4. Укажите данные донные для API ключа согласно скриншоту.</p>
            </div>
            <img src={bybit4} alt="" />
            <img src={bybit5} alt="" />
            <div className="register_page_text">
              <p>
                5. Нажмите отправить и подтвердите запрос с помощью устройств
                двухфакторной аутентификации.
              </p>
            </div>
            <div className="register_page_text">
              <p>
                6. Сохраните полученный API key и API Secret для дальнейшего
                использования.{" "}
              </p>
            </div>
            <div className="api_list_ul_ol">
              <h4>Примечание:</h4>
              <ul>
                <li>
                  Полученный API Secret сохранить возможно только один раз.
                  Сохраняйте ключи сразу после получения.
                </li>
              </ul>
            </div>
            <img src={bybit6} alt="" />
            <div className="register_page_text">
              <p>7. API-ключ готов.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ApiConnectiong;
