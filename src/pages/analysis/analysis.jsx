import React, { useEffect, useState } from "react";
import { ReactComponent as BTC } from "../../assets/icons/btc.svg";
import { ReactComponent as Etherium } from "../../assets/icons/etherium-icon.svg";
import ColumnChart from "../../components/column-chart/column-chart";
import DatePicker from "../../components/date-picker/date-picker";
import LineChart from "../../components/line-chart/line-chart";
import "./analysis.css";
import DataPickerMob from "../../components/data-picker-mob/data-picker-mob";
import empty_block from "../../assets/icons/empty-block.png";
import { format } from "date-fns";

function Analysis() {
  React.useEffect(() => {
    document.title = `Анализ  | &Volume`;
  }, []);
  const [pnl, setPnl] = useState(81);
  const [pnlToday, setPnlToday] = useState('0.00');
  const [activeOrders, setActiveOrders] = useState([]);
  const [pnlDays, setPnlDays] = useState("98");
  const [ordersHistory, setOrdersHistory] = useState();

  const getHistoryOrders = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://trade.margelet.org/private-api/v1/users/deals/last-closed", {
      method: "GET",

      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        setOrdersHistory(data.data.deals);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getActiveOrders = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://trade.margelet.org/private-api/v1/users/deals/open", {
      method: "GET",

      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        setActiveOrders(data.data.deals);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPnl = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("period", "today");

    fetch("https://trade.margelet.org/private-api/v1/users/pnl", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        setPnlToday(data.pnl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getHistoryOrders();
      getActiveOrders();
      getPnl();
    }
  }, [localStorage.getItem("token")]);

  const formatTime = (time) => {
    const parsedDate = new Date(time);

    const formattedDate = format(parsedDate, "dd.MM.yyyy, HH:mm:ss");
    return formattedDate;
  };

  return (
    <div className="pages_wrapper analysis_page">
      <div className="analysing_page_title_wrapper">
        <div className="page_title analyse_title">
          <h2>Анализ</h2>
          <div className="data_picker_desctop">
            <DatePicker />
          </div>
          <div className="data_picker_mobile">
            <DataPickerMob />
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
                    0.00 <span>USDT</span>
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
                <p>PnL за сегодня</p>
                <div className="review_left_top_block_content_amount">
                  <p>
                    {pnlToday == 0 ? '0.00' : pnlToday} <span>USDT</span>
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
                    0.00 <span>USDT</span>
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
          {activeOrders && activeOrders.length >= 1 ? (
            <div className="main_block_wrapper_bottom ">
              {activeOrders.map((item, index) => (
                <div
                  className="order_history_list_item active_order_item "
                  key={index}
                >
                  <div className="order_history_list_item_title">
                    <h2>{item.ticker}</h2>
                    {item.direction == "long" ? (
                      <div className="order_item_top_status order_item_top_status_success">
                        <p>Long {item.leverage}x</p>
                      </div>
                    ) : (
                      <div className="order_item_top_status">
                        <p>Short {item.leverage}x</p>
                      </div>
                    )}
                  </div>
                  <div className="order_history_list_item_content analysis_order_items">
                    <div className="order_history_list_item_content_item">
                      <p>
                        Время открытия{" "}
                        <span>{formatTime(item.trade_start_at)}</span>
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item">
                      <p>
                        Время закрытия <span>.....</span>
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item">
                      {item.direction == "long" ? (
                        <p>
                          Цена покупки <span>{item.price_start} USDT</span>
                        </p>
                      ) : (
                        <p>
                          Цена продажи <span>{item.price_start} USDT</span>
                        </p>
                      )}
                    </div>
                    <div className="order_history_list_item_content_item">
                      <p>
                        Объем позиции <span>{item.volume} USDT</span>
                      </p>
                    </div>

                    <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                      <p>
                        Прибыль или убыток{" "}
                        {item.trading_result < 0 ? (
                          <span>
                            {/* <span style={{ color: "red" }}> */}
                            {item.trading_result} USDT
                          </span>
                        ) : (
                          <span>{item.trading_result} USDT</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="order_history_list_line"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="main_block_wrapper_bottom ">
              <div className="empty_block">
                <img src={empty_block} alt="" />
                <p>Нет открытых ордеров</p>
              </div>
            </div>
          )}
        </div>

        <div className="orders_history_list main_block_wrapper ">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title secondary_title">
              <h2>История ордеров</h2>
            </div>
          </div>

          {ordersHistory ? (
            <>
              <div className="main_block_wrapper_bottom analysis_history">
                {ordersHistory.map((item, index) => (
                  <div className="order_history_list_item " key={index}>
                    <div className="order_history_list_item_title">
                      <h2>{item.ticker}</h2>
                      {item.direction == "long" ? (
                        <div className="order_item_top_status order_item_top_status_success">
                          <p>Long {item.leverage}x</p>
                        </div>
                      ) : (
                        <div className="order_item_top_status">
                          <p>Short {item.leverage}x</p>
                        </div>
                      )}
                    </div>
                    <div className="order_history_list_item_content analysis_order_items">
                      <div className="order_history_list_item_content_item">
                        <p>
                          Время открытия{" "}
                          <span>{formatTime(item.trade_start_at)}</span>
                        </p>
                      </div>
                      <div className="order_history_list_item_content_item">
                        <p>
                          Время закрытия{" "}
                          <span>{formatTime(item.trade_end_at)}</span>
                        </p>
                      </div>
                      <div className="order_history_list_item_content_item">
                        {item.direction == "long" ? (
                          <p>
                            Цена покупки <span>{item.price_start} USDT</span>
                          </p>
                        ) : (
                          <p>
                            Цена продажи <span>{item.price_start} USDT</span>
                          </p>
                        )}
                      </div>
                      <div className="order_history_list_item_content_item">
                        <p>
                          Объем позиции <span>{item.volume} USDT</span>
                        </p>
                      </div>

                      <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                        <p>
                          Прибыль или убыток{" "}
                          {item.trading_result < 0 ? (
                            // <span style={{ color: "red" }}>
                            <span>{item.trading_result} USDT</span>
                          ) : (
                            <span>{item.trading_result} USDT</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="order_history_list_line"></div>
                  </div>
                ))}
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
            </>
          ) : (
            <div className="main_block_wrapper_bottom">
              <div className="empty_block">
                <img src={empty_block} alt="" />
                <p>Нет истории ордеров</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analysis;
