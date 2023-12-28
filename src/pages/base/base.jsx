import React from "react";
import "./base.css";

import baseBottom from "../../assets/images/base-bottom.png";
import { NavLink } from "react-router-dom";

function Base() {
  React.useEffect(() => {
    document.title = `Часто задаваемые вопросы | &Volume`;
  }, []);
  return (
    <div className="base_page_wrapper">
      <div className="base_top_block">
        <div className="base_top_block_wrapper">
          <div>
            <p>База знаний</p>
            <h1>Часто задаваемые вопросы</h1>
          </div>
        </div>
      </div>

      <div className="pages_wrapper">
        <div className="base_questions">
          <div className="base_questions_column">
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>Подключение</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <NavLink to="/register-acc">
                    <div>
                      <p>Регистрация биржевого аккаунта</p>

                      <span>
                        Узнайте как зарегистрироваться и пройти верификацию на
                        биржах партнерах
                      </span>
                    </div>
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/api">
                    <div>
                      <p>API</p>
                      <span>
                        Инструкция по созданию API ключей и подключение к
                        &Volume
                      </span>
                    </div>
                  </NavLink>
                </div>

                <div>
                  <NavLink to="/base-investing">
                    <div>
                      <p>Инвестиции</p>
                      <span>Выбор и подключение метода инвестиций</span>
                    </div>
                  </NavLink>
                </div>
                {/* <div>
                  <p>Пробный период</p>
                  <span>Используйте сервис на 100% в пробный период</span>
                </div> */}
              </div>
            </div>
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>Покупка и продажа криптовалюты</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <NavLink to="/topup-types">
                    <div>
                      <p>Способы пополнения</p>
                      <span>
                        Способы и сервисы пополнения биржевого аккаунта{" "}
                      </span>
                    </div>
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/p2p">
                    <div>
                      <p>P2P-торговля</p>
                      <span>
                        Узнайте как использовать P2P для пополнения и вывода
                        средств с биржевого аккаунта
                      </span>
                    </div>
                  </NavLink>
                </div>
                {/* <div>
                  <p>Сторонние платежные каналы</p>
                  <span>
                    Покупайте и продавайте криптовалюту через другие платформы
                  </span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="base_questions_column">
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>Инвестиции</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <NavLink to="/differences">
                    <div>
                      <p>Различия</p>
                      <span>
                        Сделайте правильный выбор и зарабатывайте больше
                      </span>
                    </div>
                  </NavLink>
                </div>
                <div>
                  <p>Статистика</p>
                  <span>
                    Открытая статистика результатов инвестиций &Volume
                  </span>
                </div>

                <div>
                  <NavLink to="/risks">
                    <div>
                      <p>Риски</p>
                      <span>
                        Не теряйте самоконтроль. Криптовалюты — это рискованная
                        инвестиция с высокой волатильностью.
                      </span>
                    </div>
                  </NavLink>
                </div>
                {/* <div>
                  <p>Прочее</p>
                  <span>Распространенные вопросы по инвестициям</span>
                </div> */}
              </div>
            </div>
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>Награды и рефералы</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <p>Партнеры</p>
                  <span>Узнайте больше о партнерской программе &Volume</span>
                </div>
                <div>
                  <p>Приглашение</p>
                  <span>Приглашайте друзей и зарабатывайте вместе</span>
                </div>
                <div>
                  <p>Реферальные награды</p>
                  <span>
                    Получайте награды за использования сервиса &Volume вашими
                    рефералими{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="base_questions_column">
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>Тарифы</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <NavLink to="/limits">
                    <div>
                      <p>Торговые лимиты</p>
                      <span>
                        Узнайте что такое торговые лимиты и как они влияют на
                        торговый результат
                      </span>
                    </div>
                  </NavLink>
                </div>
                <div>
                  <p>Оплата</p>
                  <span>
                    Руководство по оплате тарифов с помощью сервиса партнера
                  </span>
                </div>
              </div>
            </div>
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>Другое</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <p>Whitepaper</p>
                  <span>Узнайте больше о партнерской программе &Volume</span>
                </div>
                <div>
                  <p>Клиентское соглашение</p>
                  <span>
                    Изучите документ, который регулирует отношения между
                    клиентом и компанией
                  </span>
                </div>
                <div>
                  <p>Политика конфиденциальности </p>
                  <span>
                    Изучите документ, который описывает, как компания собирает,
                    использует и раскрывает информацию о клиентах
                  </span>
                </div>
                {/* <div>
                  <p>Прочее</p>
                  <span>Распространенные вопросы по другим темам</span>
                </div>
                <div>
                  <p>Дорожная карта &Volume</p>
                  <span>&Volume — из криптов фондовый рынок</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="base_block_title">
          <h2>Последние новости</h2>
        </div>
        <div className="base_news">
          <div className="secondary_block_wrapper base_question_card">
            <div className="main_block_wrapper_title">
              <h2>Уведомление о изменение платежной системы на &volume</h2>
            </div>
            <div className="order_history_list_line"></div>
            <div className="base_question_card_content">
              <div>
                <span>
                  С радостью сообщаем вам об обновлении нашей платежной системы.
                  Мы переходим на современную и надежную систему, чтобы
                  обеспечить вам еще более удобные и безопасные платежи. <br />
                  <br /> 20.11.2023, 16:00:31
                </span>
              </div>
            </div>
          </div>
          <div className="secondary_block_wrapper base_question_card">
            <div className="main_block_wrapper_title">
              <h2>Уведомление о изменение платежной системы на &volume</h2>
            </div>
            <div className="order_history_list_line"></div>
            <div className="base_question_card_content">
              <div>
                <span>
                  С радостью сообщаем вам об обновлении нашей платежной системы.
                  Мы переходим на современную и надежную систему, чтобы
                  обеспечить вам еще более удобные и безопасные платежи. <br />
                  <br /> 20.11.2023, 16:00:31
                </span>
              </div>
            </div>
          </div>
          <div className="secondary_block_wrapper base_question_card">
            <div className="main_block_wrapper_title">
              <h2>Уведомление о изменение платежной системы на &volume</h2>
            </div>
            <div className="order_history_list_line"></div>
            <div className="base_question_card_content">
              <div>
                <span>
                  С радостью сообщаем вам об обновлении нашей платежной системы.
                  Мы переходим на современную и надежную систему, чтобы
                  обеспечить вам еще более удобные и безопасные платежи. <br />
                  <br /> 20.11.2023, 16:00:31
                </span>
              </div>
            </div>
          </div>
        </div> */}
        <div className="base_bottom_blocks">
          <div className="secondary_block_wrapper base_bottom_block">
            <div className="base_bottom_blocks_left">
              <p>Остались вопросы?</p>
              <span>Мы готовы помочь вам в любое время</span>
              <a target="_blank" href="https://t.me/NvolumeSupport_bot">
                <button>Открыть чат</button>
              </a>
            </div>
            <img src={baseBottom} alt="" />
          </div>
          <div className="secondary_block_wrapper base_bottom_block">
            <div className="base_bottom_blocks_left">
              <p>Предложение по улучшению</p>
              <span>Что бы вы хотели улучшить в нашем сервисе?</span>
              <button>Предложить идею</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Base;
