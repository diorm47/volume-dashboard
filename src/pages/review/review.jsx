import React, { useEffect, useState } from "react";
import "./review.css";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as Etherium } from "../../assets/icons/etherium-icon.svg";
import inviteImg from "../../assets/images/invite.png";
import LineChart from "../../components/line-chart/line-chart";
import { mainApi } from "../../components/utils/main-api";
import empty_block from "../../assets/icons/empty-block.png";
import { format } from "date-fns";

function Review() {
  React.useEffect(() => {
    document.title = `Обзор | &Volume`;
  }, []);
  const [userData, setUserData] = useState({});
  const [pnl, setPnl] = useState("0.00");
  const [ordersHistory, setOrdersHistory] = useState();

  const [pnlGraph, setPnlGraph] = useState(301);
  const [selectedOption, setSelectedOption] = useState("today");

  const optionsMap = {
    "За сегодня": "today",
    "За последние 7 дн.": "d7",
    "За последние 30 дн.": "d30",
    "За последние 90 дн.": "d90",
  };
  const options = Object.keys(optionsMap);

  const handleSelect = (option) => {
    const value = optionsMap[option.value];
    setSelectedOption(value);
    getPnl(value);
  };

  const options2 = [
    "За последние 30 дн.",
    "За последние 90 дн.",
    "За все время",
  ];

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

  const getPnl = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("period", selectedOption);

    fetch("https://trade.margelet.org/private-api/v1/users/pnl", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        setPnl(data.pnl);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      refresh();
      getPnl();
      getHistoryOrders();
    }
  }, [localStorage.getItem("token")]);

  const formatTime = (time) => {
    const parsedDate = new Date(time);

    const formattedDate = format(parsedDate, "dd.MM.yyyy, HH:mm:ss");
    return formattedDate;
  };
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
                      {/* {userData.balance || "-"} <span>USDT</span> */}
                      0.00 <span>USDT</span>
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
                    <Dropdown
                      options={options}
                      onChange={handleSelect}
                      value={options.find(
                        (option) => optionsMap[option] === selectedOption
                      )}
                      placeholder={options[0]}
                      arrowClosed={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M8.00001 8.78141L11.3 5.48141L12.2427 6.42408L8.00001 10.6667L3.75734 6.42408L4.70068 5.48141L8.00068 8.78141"
                            fill="#111112"
                          />
                        </svg>
                      }
                      arrowOpen={
                        <svg
                          className="open_arrow"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M8.00001 8.78141L11.3 5.48141L12.2427 6.42408L8.00001 10.6667L3.75734 6.42408L4.70068 5.48141L8.00068 8.78141"
                            fill="#111112"
                          />
                        </svg>
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="main_block_wrapper_bottom">
                <div className="review_left_top_block_content">
                  <p>PnL за сегодня</p>
                  <div className="review_left_top_block_content_amount">
                    <p>
                      {/* {pnl} <span>USDT</span> */}
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
              <div className="main_select_item">
                <div className="main_select_item">
                  <Dropdown
                    options={options2}
                    placeholder={options2[0]}
                    arrowClosed={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8.00001 8.78141L11.3 5.48141L12.2427 6.42408L8.00001 10.6667L3.75734 6.42408L4.70068 5.48141L8.00068 8.78141"
                          fill="#111112"
                        />
                      </svg>
                    }
                    arrowOpen={
                      <svg
                        className="open_arrow"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8.00001 8.78141L11.3 5.48141L12.2427 6.42408L8.00001 10.6667L3.75734 6.42408L4.70068 5.48141L8.00068 8.78141"
                          fill="#111112"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="pnl_value">
              <p>
                + {pnlGraph} <span>USDT</span>
              </p>
            </div>

            <div className="review_chart">
              <LineChart setPnl={setPnlGraph} />
            </div>
          </div>
          <div className="orders_history_list main_block_wrapper">
            <div className="main_block_wrapper_top">
              <div className="main_block_wrapper_title secondary_title">
                <h2>История ордеров</h2>
                <p>Здесь отображается список последних 10 ордеров</p>
              </div>
            </div>
            {ordersHistory && ordersHistory.length >= 1 ? (
              <div className="main_block_wrapper_bottom">
                {ordersHistory.map((item, index) => (
                  <div className="order_history_list_item_wrapper" key={index}>
                    <div className="order_history_list_item">
                      <div className="order_history_list_item_title">
                        {/* <Etherium /> */}
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
                      <div className="order_history_list_item_content">
                        <div className="order_history_list_item_content_item">
                          <p>
                            Время открытия{" "}
                            <span>{formatTime(item.trade_start_at)}</span>
                          </p>
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
                          <p>
                            Объем позиции <span>{item.volume} USDT</span>
                          </p>
                        </div>
                        <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                          <p>
                            Прибыль или убыток{" "}
                            {item.trading_result < 0 ? (
                              <span >
                              {/* <span style={{ color: "red" }}> */}
                                {item.trading_result} USDT
                              </span>
                            ) : (
                              <span>{item.trading_result} USDT</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="order_history_list_line"></div>
                  </div>
                ))}
              </div>
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
        <div className="review_right">
          <div className="secondary_block_wrapper">
            <div className="main_block_wrapper_title">
              <h2>Пробный период</h2>
              {/* <h2>Тарифный план</h2> */}
            </div>
            <div className="tarif_plan">
              <div className="tarif_plan_top">
                {/* <p>{userData.tariff || "-"}</p>
                <p>$ 100</p> */}
                <p>7 дней бесплатно</p>
              </div>
              <div className="free_tarif">
                <p>
                  Активируйте тестовый период уже сегодня и получите доступ к
                  широкому спектру возможностей.{" "}
                </p>
              </div>
              {/* <div className="tarif_plan_time">
                <div className="tarif_plan_time_title">
                  <p>30 дней</p>
                  <p>12 дней</p>
                </div>
                <div className="tarif_plan_time_block">
                  <div className="tarif_plan_time_block_value"></div>
                </div>
              </div> */}
              <div className="review_right_link">
                <NavLink to="/rates/rates">
                  {/* <p>Добавить + 30 дней</p> */}
                  <p>Активировать</p>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="secondary_block_wrapper invite_block">
            <div className="main_block_wrapper_title">
              <h2>Приглашение</h2>
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
            <div className="main_block_wrapper_title">
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
                  <circle cx="5" cy="5" r="5" fill="#0077FF" />
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
                  <circle cx="5" cy="5" r="5" fill="#0077FF" />
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
                  <circle cx="5" cy="5" r="5" fill="#0077FF" />
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
                  <circle cx="5" cy="5" r="5" fill="#0077FF" />
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
                  <circle cx="5" cy="5" r="5" fill="#0077FF" />
                </svg>
                <p>Какие гарантии безопасности?</p>
              </div>
            </div>
            <div className="review_right_link">
              <NavLink to="/base">
                <p>Перейти в базу знаний</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
