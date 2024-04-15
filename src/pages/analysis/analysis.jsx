import { format } from "date-fns";
import subDays from "date-fns/subDays";
import React, { useEffect, useState } from "react";
import empty_block from "../../assets/icons/empty-block.png";
import ColumnChart from "../../components/column-chart/column-chart";
import DataPickerMob from "../../components/data-picker-mob/data-picker-mob";
import DatePicker from "../../components/date-picker/date-picker";
import LineChart from "../../components/line-chart/line-chart";
import "./analysis.css";
import { useTranslation } from "react-i18next";
import { mainApi } from "../../components/utils/main-api";
import { useNavigate } from "react-router-dom";

function Analysis() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [localStorage.getItem("token")]);

  React.useEffect(() => {
    document.title = `${t("nav_menu_2")}  | &Volume`;
  }, [t]);

  const [userData, setUserData] = useState({});

  const [pnlPeriod, setPnlPeriod] = useState("0.00");
  const [pnlToday, setPnlToday] = useState("0.00");
  const [activeOrders, setActiveOrders] = useState([]);

  const [ordersHistory, setOrdersHistory] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getHistoryOrders = (pageNumber = 1) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch(
      `https://api.nvolume.com/private-api/v1/users/deals/closed?page=${pageNumber}`,
      {
        method: "GET",
        headers: headersList,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOrdersHistory(data.data.data);

        setCurrentPage(data.data.current_page);
        // setTotalPages(Math.ceil(data.data.total / data.data.per_page));
        const total = data.data.total || 60;
        setTotalPages(Math.ceil(total / data.data.per_page));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (newPageNumber) => {
    getHistoryOrders(newPageNumber);
  };
  const getActiveOrders = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://api.nvolume.com/private-api/v1/users/deals/open", {
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

    fetch("https://api.nvolume.com/private-api/v1/users/pnl", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        setPnlToday(data.data.pnl);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPnlRange = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append(
      "start_date",
      selectedTime[0]
        .toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, ".")
    );

    bodyContent.append(
      "end_date",
      selectedTime[1]
        .toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, ".")
    );

    fetch("https://api.nvolume.com/private-api/v1/users/pnl-by-period", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        setPnlPeriod(data.data.pnl);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      getHistoryOrders();
      getActiveOrders();
      getPnl();
      getPnlRange();
      refresh();
    }
  }, [localStorage.getItem("token")]);

  const formatTime = (time) => {
    const parsedDate = new Date(time);

    const formattedDate = format(parsedDate, "dd.MM.yyyy, HH:mm:ss");
    return formattedDate;
  };

  const [selectedTime, setSelectedTime] = useState([
    subDays(new Date(), 6),
    new Date(),
  ]);
  useEffect(() => {
    getPnlRange();
  }, [selectedTime]);

  const isWithinRange = (date, range) => {
    const startDate = range[0];
    const endDate = range[1];
    return date >= startDate && date <= endDate;
  };

  // Filter ordersHistory to only include items within the selected time range
  const filteredOrdersHistory = ordersHistory.filter((item) => {
    const tradeStartDate = new Date(item.trade_start_at);
    return isWithinRange(tradeStartDate, selectedTime);
  });

  return (
    <div className="pages_wrapper analysis_page">
      <div className="analysing_page_title_wrapper main_page_title_template">
        <div className="page_title analyse_title">
          <h1>{t("nav_menu_2")}</h1>
          <div className="data_picker_desctop">
            <DatePicker setSelectedTime={setSelectedTime} />
          </div>
          <div className="data_picker_mobile">
            <DataPickerMob setSelectedTime={setSelectedTime} />
          </div>
        </div>
      </div>
      <div className="analysis_page_wrapper">
        <div className="review_left_top">
          <div className="main_block_wrapper">
            <div className="main_block_wrapper_top">
              <div className="main_block_wrapper_title">
                <h2>{t("balance_title")}</h2>
              </div>
            </div>
            <div className="main_block_wrapper_bottom">
              <div className="review_left_top_block_content">
                <p>{t("main_account")}</p>
                <div className="review_left_top_block_content_amount">
                  <p>
                    {Number(userData.balance || 0).toFixed(2)} <span>USDT</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="main_block_wrapper">
            <div className="main_block_wrapper_top">
              <div className="main_block_wrapper_title">
                <h2>{t("pnl_title")}</h2>
              </div>
            </div>
            <div className="main_block_wrapper_bottom">
              <div className="review_left_top_block_content">
                <p>{t("pnl_today")}</p>
                <div className="review_left_top_block_content_amount">
                  <p>
                    {Number(pnlToday || 0).toFixed(2)} <span>USDT</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="main_block_wrapper">
            <div className="main_block_wrapper_top">
              <div className="main_block_wrapper_title">
                <h2>{t("pnl_period_title")}</h2>
              </div>
            </div>
            <div className="main_block_wrapper_bottom">
              <div className="review_left_top_block_content">
                <p>
                  {t("pnl_period")}{" "}
                  {selectedTime[0]
                    .toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, ".")}
                  {" - "}
                  {selectedTime[1]
                    .toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, ".")}
                </p>
                <div className="review_left_top_block_content_amount">
                  <p>
                    {Number(pnlPeriod || 0).toFixed(2)} <span>USDT</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="secondary_block_wrapper">
          <div className="main_block_wrapper_title">
            <h2>{t("pnl_main_title")}</h2>
          </div>

          <LineChart selectedTime={selectedTime} pnlToday={pnlToday} />
        </div>
        <div className="secondary_block_wrapper">
          <div className="main_block_wrapper_title">
            <h2>{t("pnl_by_days_title")}</h2>
          </div>

          <ColumnChart selectedTime={selectedTime} />
        </div>

        <div className="orders_history_list main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title secondary_title">
              <h2>{t("executed_orders_title")}</h2>
              <p>{t("executed_orders_description")}</p>
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
                        <p>
                          {t("long_order")} {item.leverage}x
                        </p>
                      </div>
                    ) : (
                      <div className="order_item_top_status">
                        <p>
                          {t("short_order")} {item.leverage}x
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="order_history_list_item_content analysis_order_items">
                    <div className="order_history_list_item_content_item">
                      <p>
                        {t("trade_open_time")}{" "}
                        <span>{formatTime(item.trade_start_at)}</span>
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item">
                      <p>
                        {t("trade_close_time")} <span>.....</span>
                      </p>
                    </div>
                    <div className="order_history_list_item_content_item">
                      {item.direction == "long" ? (
                        <p>
                          {t("buy_price")}{" "}
                          <span>
                            {" "}
                            {Number(item.price_start || 0).toFixed(2)} USDT
                          </span>
                        </p>
                      ) : (
                        <p>
                          {t("sell_price")}{" "}
                          <span>
                            {" "}
                            {Number(item.price_start || 0).toFixed(2)} USDT
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="order_history_list_item_content_item">
                      <p>
                        {t("position_volume")} <span>{item.volume} USDT</span>
                      </p>
                    </div>

                    <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                      <p>
                        {t("profit_or_loss")}{" "}
                        {item.trading_result < 0 ? (
                          <span style={{ color: "#F1507B" }}>
                            {Number(item.trading_result || 0).toFixed(2)} USDT
                          </span>
                        ) : (
                          <span>
                            {Number(item.trading_result || 0).toFixed(2)} USDT
                          </span>
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
                <p>{t("no_open_orders")}</p>
              </div>
            </div>
          )}
        </div>

        <div className="orders_history_list main_block_wrapper ">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title secondary_title">
              <h2>{t("rev_5")} </h2>
            </div>
          </div>

          {ordersHistory &&
          ordersHistory.length &&
          filteredOrdersHistory.length ? (
            <>
              <div className="main_block_wrapper_bottom analysis_history">
                {filteredOrdersHistory.map((item, index) => (
                  <div className="order_history_list_item " key={index}>
                    <div className="order_history_list_item_title">
                      <h2>{item.ticker}</h2>
                      {item.direction == "long" ? (
                        <div className="order_item_top_status order_item_top_status_success">
                          <p>
                            {t("long_order")} {item.leverage}x
                          </p>
                        </div>
                      ) : (
                        <div className="order_item_top_status">
                          <p>
                            {t("short_order")} {item.leverage}x
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="order_history_list_item_content analysis_order_items">
                      <div className="order_history_list_item_content_item">
                        <p>
                          {t("trade_open_time")}{" "}
                          <span>{formatTime(item.trade_start_at)}</span>
                        </p>
                      </div>
                      <div className="order_history_list_item_content_item">
                        <p>
                          {t("trade_close_time")}{" "}
                          <span>{formatTime(item.trade_end_at)}</span>
                        </p>
                      </div>
                      <div className="order_history_list_item_content_item">
                        {item.direction == "long" ? (
                          <p>
                            {t("buy_price")}{" "}
                            <span>{item.price_start} USDT</span>
                          </p>
                        ) : (
                          <p>
                            {t("sell_price")}{" "}
                            <span>{item.price_start} USDT</span>
                          </p>
                        )}
                      </div>
                      <div className="order_history_list_item_content_item">
                        <p>
                          {t("position_volume")} <span>{item.volume} USDT</span>
                        </p>
                      </div>

                      <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                        <p>
                          {t("profit_or_loss")}{" "}
                          {item.trading_result < 0 ? (
                            <span style={{ color: "#F1507B" }}>
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
              {filteredOrdersHistory > 0 ? (
                ""
              ) : (
                <div className="main_block_wrapper_bottom">
                  <div className="pagination">
                    {currentPage > 1 && (
                      <svg
                        onClick={() => handlePageChange(currentPage - 1)}
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
                    )}
                    {totalPages && totalPages > 3 && currentPage > 4 ? (
                      <p
                        className="first_page"
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </p>
                    ) : (
                      ""
                    )}
                    {totalPages && totalPages > 3 && currentPage > 4 ? (
                      <p className="left_dots">...</p>
                    ) : (
                      ""
                    )}
                    {currentPage - 1 > 0 ? (
                      <p
                        className="left_amout"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        {currentPage - 1}
                      </p>
                    ) : (
                      ""
                    )}

                    <p className="active_page">{currentPage}</p>

                    {currentPage - 1 < totalPages &&
                    currentPage < totalPages ? (
                      <p
                        className="right_amount"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        {currentPage + 1}
                      </p>
                    ) : (
                      ""
                    )}

                    {totalPages > 3 &&
                    currentPage + 1 !== totalPages &&
                    currentPage !== totalPages ? (
                      <p className="last_dots">...</p>
                    ) : (
                      ""
                    )}
                    {totalPages &&
                      totalPages > 3 &&
                      currentPage + 1 !== totalPages &&
                      currentPage !== totalPages && (
                        <p
                          className="total_pages_last"
                          onClick={() => handlePageChange(totalPages)}
                        >
                          {totalPages}
                        </p>
                      )}
                    {currentPage < totalPages && (
                      <svg
                        onClick={() => handlePageChange(currentPage + 1)}
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
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="main_block_wrapper_bottom">
              <div className="empty_block">
                <img src={empty_block} alt="" />
                <p>{t("no_order_history")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analysis;
