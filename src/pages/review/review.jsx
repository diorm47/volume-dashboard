import React from "react";
import "./review.css";

import pnl_graph from "../../assets/images/pnl-graph.png";
import inviteImg from "../../assets/images/invite.png";
import { ReactComponent as Etherium } from "../../assets/icons/etherium-icon.svg";

function Review() {
  return (
    <div className="pages_wrapper review_page">
      <div className="review_page_wrapper">
        <div className="review_left">
          <div className="review_left_top">
            <div className="main_block_wrapper">
              <div className="main_block_wrapper_top">
                <div className="main_block_wrapper_title">
                  <h2>Баланс</h2>
                </div>
              </div>
              <div className="main_block_wrapper_bottom">
                <div className="review_left_top_block_content">
                  <p>Основной аккаунт</p>
                  <div className="review_left_top_block_content_amount">
                    <p>
                      4.158,63 <span>USDT</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="main_block_wrapper">
              <div className="main_block_wrapper_top p24_28px">
                <div className="main_block_wrapper_title">
                  <h2>PnL</h2>
                  <div className="main_select_item">
                    <select name="" id="">
                      <option value="#">За сегодня</option>
                      <option value="#">За сегодня</option>
                      <option value="#">За сегодня</option>
                      <option value="#">За сегодня</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="main_block_wrapper_bottom">
                <div className="review_left_top_block_content">
                  <p>PnL за сегодня</p>
                  <div className="review_left_top_block_content_amount">
                    <p>
                      + 158,21 <span>USDT</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="secondary_block_wrapper">
            <div className="main_block_wrapper_title">
              <h2>PnL</h2>
              <div className="main_select_item">
                <select name="" id="">
                  <option value="#">За последние 7 дн.</option>
                  <option value="#">За сегодня</option>
                  <option value="#">За сегодня</option>
                  <option value="#">За сегодня</option>
                </select>
              </div>
            </div>
            <div className="pnl_value">
              <p>
                + 301,63 <span>USDT</span>
              </p>
            </div>
            <img className="graph_image" src={pnl_graph} alt="" />
          </div>
          <div className="orders_history_list main_block_wrapper">
            <div className="main_block_wrapper_top">
              <div className="main_block_wrapper_title secondary_title">
                <h2>История ордеров</h2>
                <p>Здесь отображается список последних 10 ордеров</p>
              </div>
            </div>
            <div className="main_block_wrapper_bottom">
              <div className="order_history_list_item">
                <div className="order_history_list_item_title">
                  <Etherium />
                  <h2>ETHUSDT Бессрочные</h2>
                  <div className="order_item_top_status">
                    <p>Short 10x</p>
                  </div>
                </div>
                <div className="order_history_list_item_content">
                  <div className="order_history_list_item_content_item">
                    <p>
                      Время открытия <span>27.11.2023, 12:43:41</span>
                    </p>
                    <p>
                      Время закрытия <span>27.11.2023, 14:13:33</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item">
                    <p>
                      Цена продажи <span>2 491,42 USDT</span>
                    </p>
                    <p>
                      Объем позиции <span>0,41 ETH</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                    <p>
                      Прибыль или убыток <span>21,54 USDT</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="order_history_list_line"></div>
              <div className="order_history_list_item">
                <div className="order_history_list_item_title">
                  <Etherium />
                  <h2>ETHUSDT Бессрочные</h2>
                  <div className="order_item_top_status">
                    <p>Short 10x</p>
                  </div>
                </div>
                <div className="order_history_list_item_content">
                  <div className="order_history_list_item_content_item">
                    <p>
                      Время открытия <span>27.11.2023, 12:43:41</span>
                    </p>
                    <p>
                      Время закрытия <span>27.11.2023, 14:13:33</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item">
                    <p>
                      Цена продажи <span>2 491,42 USDT</span>
                    </p>
                    <p>
                      Объем позиции <span>0,41 ETH</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                    <p>
                      Прибыль или убыток <span>21,54 USDT</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="order_history_list_line"></div>
              <div className="order_history_list_item">
                <div className="order_history_list_item_title">
                  <Etherium />
                  <h2>ETHUSDT Бессрочные</h2>
                  <div className="order_item_top_status">
                    <p>Short 10x</p>
                  </div>
                </div>
                <div className="order_history_list_item_content">
                  <div className="order_history_list_item_content_item">
                    <p>
                      Время открытия <span>27.11.2023, 12:43:41</span>
                    </p>
                    <p>
                      Время закрытия <span>27.11.2023, 14:13:33</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item">
                    <p>
                      Цена продажи <span>2 491,42 USDT</span>
                    </p>
                    <p>
                      Объем позиции <span>0,41 ETH</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                    <p>
                      Прибыль или убыток <span>21,54 USDT</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="order_history_list_line"></div>
              <div className="order_history_list_item">
                <div className="order_history_list_item_title">
                  <Etherium />
                  <h2>ETHUSDT Бессрочные</h2>
                  <div className="order_item_top_status">
                    <p>Short 10x</p>
                  </div>
                </div>
                <div className="order_history_list_item_content">
                  <div className="order_history_list_item_content_item">
                    <p>
                      Время открытия <span>27.11.2023, 12:43:41</span>
                    </p>
                    <p>
                      Время закрытия <span>27.11.2023, 14:13:33</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item">
                    <p>
                      Цена продажи <span>2 491,42 USDT</span>
                    </p>
                    <p>
                      Объем позиции <span>0,41 ETH</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                    <p>
                      Прибыль или убыток <span>21,54 USDT</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="order_history_list_line"></div>
              <div className="order_history_list_item">
                <div className="order_history_list_item_title">
                  <Etherium />
                  <h2>ETHUSDT Бессрочные</h2>
                  <div className="order_item_top_status">
                    <p>Short 10x</p>
                  </div>
                </div>
                <div className="order_history_list_item_content">
                  <div className="order_history_list_item_content_item">
                    <p>
                      Время открытия <span>27.11.2023, 12:43:41</span>
                    </p>
                    <p>
                      Время закрытия <span>27.11.2023, 14:13:33</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item">
                    <p>
                      Цена продажи <span>2 491,42 USDT</span>
                    </p>
                    <p>
                      Объем позиции <span>0,41 ETH</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                    <p>
                      Прибыль или убыток <span>21,54 USDT</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="order_history_list_line"></div>
              <div className="order_history_list_item">
                <div className="order_history_list_item_title">
                  <Etherium />
                  <h2>ETHUSDT Бессрочные</h2>
                  <div className="order_item_top_status">
                    <p>Short 10x</p>
                  </div>
                </div>
                <div className="order_history_list_item_content">
                  <div className="order_history_list_item_content_item">
                    <p>
                      Время открытия <span>27.11.2023, 12:43:41</span>
                    </p>
                    <p>
                      Время закрытия <span>27.11.2023, 14:13:33</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item">
                    <p>
                      Цена продажи <span>2 491,42 USDT</span>
                    </p>
                    <p>
                      Объем позиции <span>0,41 ETH</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                    <p>
                      Прибыль или убыток <span>21,54 USDT</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="order_history_list_line"></div>
              <div className="order_history_list_item">
                <div className="order_history_list_item_title">
                  <Etherium />
                  <h2>ETHUSDT Бессрочные</h2>
                  <div className="order_item_top_status">
                    <p>Short 10x</p>
                  </div>
                </div>
                <div className="order_history_list_item_content">
                  <div className="order_history_list_item_content_item">
                    <p>
                      Время открытия <span>27.11.2023, 12:43:41</span>
                    </p>
                    <p>
                      Время закрытия <span>27.11.2023, 14:13:33</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item">
                    <p>
                      Цена продажи <span>2 491,42 USDT</span>
                    </p>
                    <p>
                      Объем позиции <span>0,41 ETH</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                    <p>
                      Прибыль или убыток <span>21,54 USDT</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="order_history_list_line"></div>
              <div className="order_history_list_item">
                <div className="order_history_list_item_title">
                  <Etherium />
                  <h2>ETHUSDT Бессрочные</h2>
                  <div className="order_item_top_status">
                    <p>Short 10x</p>
                  </div>
                </div>
                <div className="order_history_list_item_content">
                  <div className="order_history_list_item_content_item">
                    <p>
                      Время открытия <span>27.11.2023, 12:43:41</span>
                    </p>
                    <p>
                      Время закрытия <span>27.11.2023, 14:13:33</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item">
                    <p>
                      Цена продажи <span>2 491,42 USDT</span>
                    </p>
                    <p>
                      Объем позиции <span>0,41 ETH</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                    <p>
                      Прибыль или убыток <span>21,54 USDT</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="order_history_list_line"></div>
              <div className="order_history_list_item">
                <div className="order_history_list_item_title">
                  <Etherium />
                  <h2>ETHUSDT Бессрочные</h2>
                  <div className="order_item_top_status">
                    <p>Short 10x</p>
                  </div>
                </div>
                <div className="order_history_list_item_content">
                  <div className="order_history_list_item_content_item">
                    <p>
                      Время открытия <span>27.11.2023, 12:43:41</span>
                    </p>
                    <p>
                      Время закрытия <span>27.11.2023, 14:13:33</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item">
                    <p>
                      Цена продажи <span>2 491,42 USDT</span>
                    </p>
                    <p>
                      Объем позиции <span>0,41 ETH</span>
                    </p>
                  </div>
                  <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                    <p>
                      Прибыль или убыток <span>21,54 USDT</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="review_right">
          <div className="secondary_block_wrapper">
            <div className="main_block_wrapper_title">
              <h2>Тарифный план</h2>
            </div>
            <div className="tarif_plan">
              <div className="tarif_plan_top">
                <p>Продвинутый</p>
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
                <p>Добавить + 30 дней</p>
              </div>
            </div>
          </div>
          <div className="secondary_block_wrapper invite_block">
            <div className="invite_block_title">
              <p>Приглашение</p>
            </div>
            <div className="invite_block_desc">
              <p>
                Приглашайте друзей в &Volume и получайте награды в размере 10%
                от стоимости тарифа
              </p>
              <img src={inviteImg} alt="" />
            </div>
            <div className="review_right_link">
              <p>Пригласить</p>
            </div>
          </div>
          <div className="secondary_block_wrapper most_questions">
            <div class="main_block_wrapper_title">
              <h2>Часть задаваемые вопросы</h2>
            </div>
            <div className="most_questions_desc">
              <p>
                В нашей базе знаний вы можете найти ответы на самые часто
                задаваемые вопросы.
              </p>
            </div>
            <div className="most_questions_list">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#2420FC" />
                </svg>
                <p>Как &Volume решает куда инвестировать средства?</p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#2420FC" />
                </svg>
                <p>Какая минимальная сумма?</p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#2420FC" />
                </svg>
                <p>Могу я использовать заёмные деньги?</p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#2420FC" />
                </svg>
                <p>Какие комиссии и условия использования?</p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#2420FC" />
                </svg>
                <p>Какие гарантии безопасности?</p>
              </div>
            </div>
            <div className="review_right_link">
              <p>Перейти в базу знаний</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
