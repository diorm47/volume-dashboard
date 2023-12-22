import React, { useState } from "react";
import "./analysis.css";
import analysisGraph from "../../assets/images/analysis-graph.png";
import analysisGraph2 from "../../assets/images/analysis-graph-2.png";
import { ReactComponent as Etherium } from "../../assets/icons/etherium-icon.svg";
import { ReactComponent as BTC } from "../../assets/icons/btc.svg";
import LineChart from "../../components/line-chart/line-chart";
import ColumnChart from "../../components/column-chart/column-chart";

function Analysis() {
  React.useEffect(() => {
    document.title = `Анализ  | &Volume`;
  }, []);
  const [pnl, setPnl] = useState(81);
  const [pnlDays, setPnlDays] = useState("98");

  return (
    <div className="pages_wrapper analysis_page">
      <div className="analysing_page_title_wrapper">
        <div className="page_title analyse_title">
          <h2>Анализ</h2>
          <div className="analysis_top_toggler">
            <p>21.11.2023</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M8.78135 8.49999L5.48135 5.19999L6.42402 4.25732L10.6667 8.49999L6.42402 12.7427L5.48135 11.7993L8.78135 8.49932"
                fill="#111112"
              />
            </svg>
            <p>27.11.2023</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
            >
              <path
                d="M9 15.5C5.6925 15.5 3 12.8075 3 9.5C3 6.1925 5.6925 3.5 9 3.5C12.3075 3.5 15 6.1925 15 9.5C15 12.8075 12.3075 15.5 9 15.5ZM9 2C4.8525 2 1.5 5.3525 1.5 9.5C1.5 13.6475 4.8525 17 9 17C13.1475 17 16.5 13.6475 16.5 9.5C16.5 5.3525 13.1475 2 9 2ZM10.9425 6.5L9 8.4425L7.0575 6.5L6 7.5575L7.9425 9.5L6 11.4425L7.0575 12.5L9 10.5575L10.9425 12.5L12 11.4425L10.0575 9.5L12 7.5575L10.9425 6.5Z"
                fill="#111112"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="analysis_page_wrapper">
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
            <div className="main_block_wrapper_top">
              <div className="main_block_wrapper_title">
                <h2>PnL</h2>
              </div>
            </div>
            <div className="main_block_wrapper_bottom">
              <div className="review_left_top_block_content">
                <p>Основной аккаунт</p>
                <div className="review_left_top_block_content_amount">
                  <p>
                    + 158,21 <span>USDT</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="main_block_wrapper">
            <div className="main_block_wrapper_top">
              <div className="main_block_wrapper_title">
                <h2>PnL за период</h2>
              </div>
            </div>
            <div className="main_block_wrapper_bottom">
              <div className="review_left_top_block_content">
                <p>PnL c 21.11.2023 - 27.11.2023</p>
                <div className="review_left_top_block_content_amount">
                  <p>
                    + 301,63 <span>USDT</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="secondary_block_wrapper">
          <div className="main_block_wrapper_title">
            <h2>PnL</h2>
          </div>
          <div className="pnl_value">
            <p>
              + {pnl} <span>USDT</span>
            </p>
          </div>
          <div className="review_chart">
            <LineChart setPnl={setPnl} />
          </div>
        </div>
        <div className="secondary_block_wrapper">
          <div className="main_block_wrapper_title">
            <h2>PnL по дням</h2>
          </div>
          <div className="pnl_value">
            <p>
              {pnlDays > 0 ? `+${pnlDays}` : pnlDays} <span>USDT</span>
            </p>
          </div>
          <ColumnChart setPnlDays={setPnlDays} />
        </div>

        <div className="orders_history_list main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title secondary_title">
              <h2>Исполняемые ордера</h2>
              <p>Здесь отображается список открытых ордеров</p>
            </div>
          </div>
          <div className="main_block_wrapper_bottom ">
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <Etherium />
                <h2>ETHUSDT Бессрочные</h2>
                <div className="order_item_top_status">
                  <p>Short 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>.....</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
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
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <BTC />
                <h2>BTCUSDT Бессрочные</h2>
                <div className="order_item_top_status order_item_top_status_success">
                  <p>Long 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>.....</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
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

        <div className="orders_history_list main_block_wrapper ">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title secondary_title">
              <h2>История ордеров</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom analysis_history">
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <Etherium />
                <h2>ETHUSDT Бессрочные</h2>
                <div className="order_item_top_status">
                  <p>Short 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <BTC />
                <h2>BTCUSDT Бессрочные</h2>
                <div className="order_item_top_status order_item_top_status_success">
                  <p>Long 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <Etherium />
                <h2>ETHUSDT Бессрочные</h2>
                <div className="order_item_top_status">
                  <p>Short 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <BTC />
                <h2>BTCUSDT Бессрочные</h2>
                <div className="order_item_top_status order_item_top_status_success">
                  <p>Long 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <Etherium />
                <h2>ETHUSDT Бессрочные</h2>
                <div className="order_item_top_status">
                  <p>Short 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <BTC />
                <h2>BTCUSDT Бессрочные</h2>
                <div className="order_item_top_status order_item_top_status_success">
                  <p>Long 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <Etherium />
                <h2>ETHUSDT Бессрочные</h2>
                <div className="order_item_top_status">
                  <p>Short 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <BTC />
                <h2>BTCUSDT Бессрочные</h2>
                <div className="order_item_top_status order_item_top_status_success">
                  <p>Long 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <Etherium />
                <h2>ETHUSDT Бессрочные</h2>
                <div className="order_item_top_status">
                  <p>Short 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <BTC />
                <h2>BTCUSDT Бессрочные</h2>
                <div className="order_item_top_status order_item_top_status_success">
                  <p>Long 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <Etherium />
                <h2>ETHUSDT Бессрочные</h2>
                <div className="order_item_top_status">
                  <p>Short 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <BTC />
                <h2>BTCUSDT Бессрочные</h2>
                <div className="order_item_top_status order_item_top_status_success">
                  <p>Long 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <Etherium />
                <h2>ETHUSDT Бессрочные</h2>
                <div className="order_item_top_status">
                  <p>Short 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <BTC />
                <h2>BTCUSDT Бессрочные</h2>
                <div className="order_item_top_status order_item_top_status_success">
                  <p>Long 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <Etherium />
                <h2>ETHUSDT Бессрочные</h2>
                <div className="order_item_top_status">
                  <p>Short 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <BTC />
                <h2>BTCUSDT Бессрочные</h2>
                <div className="order_item_top_status order_item_top_status_success">
                  <p>Long 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <Etherium />
                <h2>ETHUSDT Бессрочные</h2>
                <div className="order_item_top_status">
                  <p>Short 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
            <div className="order_history_list_item ">
              <div className="order_history_list_item_title">
                <BTC />
                <h2>BTCUSDT Бессрочные</h2>
                <div className="order_item_top_status order_item_top_status_success">
                  <p>Long 10x</p>
                </div>
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время открытия <span>27.11.2023, 12:43:41</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Время закрытия <span>27.11.2023, 14:13:33</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Цена покупки <span>2 431,89 USDT</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Объем позиции <span>0,11 BTC</span>
                  </p>
                </div>

                <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                  <p>
                    Прибыль или убыток <span>21,54 USDT</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="order_history_list_line mb_0"></div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="pagination">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.21871 8.00001L10.5187 11.3L9.57604 12.2427L5.33337 8.00001L9.57604 3.75734L10.5187 4.70067L7.21871 8.00068"
                  fill="#111112"
                />
              </svg>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>...</p>
              <p>5</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8.78129 7.99999L5.48129 4.69999L6.42396 3.75732L10.6666 7.99999L6.42396 12.2427L5.48129 11.2993L8.78129 7.99932"
                  fill="#111112"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
