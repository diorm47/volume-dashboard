import React, { useEffect, useState } from "react";
import "./review.css";
import subDays from "date-fns/subDays";

import { format } from "date-fns";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { NavLink } from "react-router-dom";
import empty_block from "../../assets/icons/empty-block.png";
import inviteImg from "../../assets/images/invite.png";
import LineChart from "../../components/line-chart/line-chart";
import { mainApi } from "../../components/utils/main-api";
import { useTranslation } from "react-i18next";

function Review() {
  const { t } = useTranslation();
  React.useEffect(() => {
    document.title = `${t("rev_1")} | &Volume`;
  }, [t]);
  const [selectedTime, setSelectedTime] = useState([
    subDays(new Date(), 6),
    new Date(),
  ]);
  const [userData, setUserData] = useState({});
  const [pnl, setPnl] = useState("0.00");
  const [ordersHistory, setOrdersHistory] = useState();

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
  console.log(optionsMap);

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

  const getPnl = (value) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("period", value || selectedOption);

    fetch("https://trade.margelet.org/private-api/v1/users/pnl", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        setPnl(data.data.pnl);
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

  const targetDate = new Date(userData.tariff_paid_to);

  const [remainingDays, setRemainingDays] = useState(0);
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      const daysLeft = Math.max(
        Math.floor(difference / (1000 * 60 * 60 * 24)),
        0
      );
      setRemainingDays(daysLeft);
      setProgressWidth(`${Math.min((daysLeft / 30) * 100, 100)}%`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const getReverseMap = (map) => {
    const reverseMap = {};
    Object.keys(map).forEach((key) => {
      reverseMap[map[key]] = key;
    });
    return reverseMap;
  };

  // Создание обратного отображения
  const reverseOptionsMap = getReverseMap(optionsMap);

  // Получение соответствующего значения по selectedOption
  const selectedValue = reverseOptionsMap[selectedOption];

  return (
    <>
      <div className="pages_wrapper review_page">
        <div className="review_page_wrapper">
          <div className="review_left">
            <div className="review_left_top">
              <div className="main_block_wrapper">
                <div className="main_block_wrapper_top">
                  <div className="main_block_wrapper_title">
                    <h2>{t("rev_2")}</h2>
                  </div>
                </div>
                <div className="main_block_wrapper_bottom">
                  <div className="review_left_top_block_content">
                    <p> {t("rev_3")}</p>
                    <div className="review_left_top_block_content_amount">
                      <p>
                        {Number(userData.balance || 0).toFixed(2)}{" "}
                        <span>USDT</span>
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
                    <p>
                      {" "}
                      PnL{" "}
                      <span style={{ textTransform: "lowercase" }}>
                        {selectedValue}
                      </span>
                    </p>
                    <div className="review_left_top_block_content_amount">
                      <p>
                        {Number(pnl || 0).toFixed(2)} <span>USDT</span>
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
              <LineChart selectedTime={selectedTime} />
            </div>
            <div className="orders_history_list main_block_wrapper">
              <div className="main_block_wrapper_top">
                <div className="main_block_wrapper_title secondary_title">
                  <h2> {t("rev_5")}</h2>
                  <p>{t("rev_6")}</p>
                </div>
              </div>
              {ordersHistory && ordersHistory.length >= 1 ? (
                <div className="main_block_wrapper_bottom">
                  {ordersHistory.slice(0, 10).map((item, index) => (
                    <div
                      className="order_history_list_item_wrapper"
                      key={index}
                    >
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
                              {t("trade_open_time")}{" "}
                              <span>{formatTime(item.trade_start_at)}</span>
                            </p>
                            <p>
                              {t("trade_close_time")}{" "}
                              <span>{formatTime(item.trade_end_at)}</span>
                            </p>
                          </div>
                          <div className="order_history_list_item_content_item">
                            {item.direction === "long" ? (
                              <p>
                                {t("buy_price")}{" "}
                                <span>
                                  {" "}
                                  {Number(item.price_start || 0).toFixed(
                                    2
                                  )}{" "}
                                  USDT
                                </span>
                              </p>
                            ) : (
                              <p>
                                {t("sell_price")}{" "}
                                <span>
                                  {" "}
                                  {Number(item.price_start || 0).toFixed(
                                    2
                                  )}{" "}
                                  USDT
                                </span>
                              </p>
                            )}
                            <p>
                              {t("position_volume")}{" "}
                              <span>
                                {" "}
                                {Number(item.volume || 0).toFixed(2)} USDT
                              </span>
                            </p>
                          </div>
                          <div className="order_history_list_item_content_item order_history_list_item_content_item_last">
                            <p>
                              {t("profit_or_loss")}{" "}
                              {item.trading_result < 0 ? (
                                <span>
                                  {" "}
                                  {Number(item.trading_result || 0).toFixed(
                                    2
                                  )}{" "}
                                  USDT
                                </span>
                              ) : (
                                <span>
                                  {" "}
                                  {Number(item.trading_result || 0).toFixed(
                                    2
                                  )}{" "}
                                  USDT
                                </span>
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
                    <p> {t("rev_7")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="review_right">
            {(userData && userData.tariff && userData.tariff_paid_to) ||
            userData.demo_used ? (
              <div className="secondary_block_wrapper">
                <div className="main_block_wrapper_title">
                  <h2>{t("tariff_title")}</h2>
                </div>
                <div className="tarif_plan">
                  <div className="tarif_plan_top">
                    <p>{userData.tariff}</p>
                    <p>$ 0.00</p>
                  </div>
                  <div className="tarif_plan_time">
                    <div className="tarif_plan_time_title">
                      {userData.tariff === "Пробный" ? (
                        <p>{t("trial_period")}</p>
                      ) : (
                        <p>{t("paid_period")}</p>
                      )}
                      <p>
                        {remainingDays} {t("remaining_days")}
                      </p>
                    </div>
                    <div className="tarif_plan_time_block">
                      <div
                        className="tarif_plan_time_block_value"
                        style={{ width: progressWidth }}
                      ></div>
                    </div>
                  </div>
                  <div className="review_right_link">
                    <NavLink to="/rates/rates">
                      <p>{t("add_30_days")}</p>
                    </NavLink>
                  </div>
                </div>
              </div>
            ) : (
              <div className="secondary_block_wrapper">
                <div className="main_block_wrapper_title">
                  <h2>{t("trial_period_title")}</h2>
                </div>
                <div className="tarif_plan">
                  <div className="tarif_plan_top">
                    <p>{t("free_trial")}</p>
                  </div>
                  <div className="free_tarif">
                    <p>{t("activate_trial")}</p>
                  </div>
                  <div className="review_right_link">
                    <NavLink to="/rates/rates">
                      <p>{t("activate")}</p>
                    </NavLink>
                  </div>
                </div>
              </div>
            )}

            {/* <div className="secondary_block_wrapper invite_block">
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
            </div> */}
            <div className="secondary_block_wrapper most_questions">
              <div className="main_block_wrapper_title">
                <h2>{t("faq_title")}</h2>
              </div>
              <div className="most_questions_desc">
                <p>{t("faq_description")}</p>
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
                  <p>{t("faq_question_1")}</p>
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
                  <p>{t("faq_question_2")}</p>
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
                  <p>{t("faq_question_3")}</p>
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
                  <p>{t("faq_question_4")}</p>
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
                  <p>{t("faq_question_5")}</p>
                </div>
              </div>
              <div className="review_right_link">
                <NavLink to="/base">
                  <p>{t("knowledge_base_link")}</p>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
