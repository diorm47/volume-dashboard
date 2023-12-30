import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { mainApi } from "../../components/utils/main-api";
import Snackbar from "../../components/snackbar/snackbar";
import { useTranslation } from "react-i18next";

function RatesPage({ updatebalance }) {
  React.useEffect(() => {
    document.title = `Выберите план | &Volume`;
  }, []);
  const faq = [
    {
      question: "Могу ли я перейти на другой тариф после оплаты?",
      answer:
        "Да. Если хотите перейти на тариф дороже, нужно будет доплатить разницу в зависимости от использованных дней. Если хотите перейти на тариф ниже, то нужно попросить возврат средств за оставшиеся дни, а затем оплатить новый. \n  Обе операции пока что невозможно совершить самостоятельно, обращайтесь в службу поддержки через форму обратной связи на сайте или в Телеграм-бота.",
    },
    {
      question: "Какая должна быть минимальная сумма депозита?",
      answer:
        "Сервис доступен при балансе депозита от $100. Чтобы получить доход и одновременно окупить стоимость подписки рекомендуем использовать не менее $250 - $500. Также рекомендуем не использовать больше $3 000 в первый месяц.",
    },
    {
      question: "Какие комиссии и условия использования?",
      answer:
        "Не берём комиссии со сделок и не взимаем процент с дохода. Чтобы использовать сервис, нужно купить подписку. Стоимость подписки зависит от суммы инвестиций: чем выше депозит, тем дороже подписка. В будущем для пользователей с депозитами выше $5 000 может появиться подписка с оплатой от прибыли.",
    },
    {
      question:
        "Могу ли я изменить тарифный план пока действует пробный период?",
      answer:
        "Да. Чтобы купить подписку на нужный тариф, выберете его на странице “Тарифы” и следуйте инструкциям для оплаты. Если в процессе возникнут вопросы - обращайтесь в службу поддержки.",
    },
    {
      question: "Как я могу оформить возврат?",
      answer:
        "Чтобы получить возврат за неиспользованные дни, нужно обратиться в службу поддержки, либо через форму обратной связи, либо в Телегра-бота.",
    },
  ];
  const [opened, setOpened] = useState();
  const [userData, setUserData] = useState({});
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackStatus, setSnackStatus] = useState("");
  const snackOptions = (text, status) => {
    setVisibleSnack(true);
    setSnackText(text);
    setSnackStatus(status);
    setTimeout(() => {
      setVisibleSnack(false);
    }, 2000);
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
      refresh();
    }
  }, [localStorage.getItem("token")]);
  const toggleTabs = (data) => {
    if (data == opened) {
      setOpened("");
    } else {
      setOpened(data);
    }
  };
  const activateDemoTariff = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://trade.margelet.org/private-api/v1/users/demo/activate", {
      method: "POST",

      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        snackOptions("Вы успешно активировали пробный период.", "success");
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // remaining
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

  const setTarif = (data) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("tariff", data);

    fetch("https://trade.margelet.org/private-api/v1/users/invoice/create", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        snackOptions("Тарифный план усешно подключён!", "success");
        updatebalance();
      })
      .catch((error) => {
        console.error("Error:", error);
        snackOptions("Ошибка!", "error");
      });
  };
  const { t, i18n } = useTranslation();

  return (
    <>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
      <div className="page_title investments_page_title rate_title">
        <h2>{t("selectPlan")}</h2>
        <p>{t("paymentDisclaimer")}</p>
      </div>
      {(userData && userData.tariff && userData.tariff_paid_to) ||
      userData.demo_used ? (
        <div className="secondary_block_wrapper">
          <div className="main_block_wrapper_title">
            <h2>{t("tariffPlanTitle")}</h2>
          </div>
          <div className="tarif_plan">
            <div className="tarif_plan_top">
              <p>{userData.tariff}</p>
              <p>$ 0.00</p>
            </div>

            <div className="tarif_plan_time">
              <div className="tarif_plan_time_title">
                {userData.tariff == "Пробный" ? (
                  <p>{t("trialPlanDuration")}</p>
                ) : (
                  <p>{t("paidPlanDuration")}</p>
                )}

                <p>
                  {remainingDays} {t("remainingDays")}
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
                <p>{t("addDaysLink")}</p>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="secondary_block_wrapper">
          <div className="main_block_wrapper_title">
            <h2>{t("trialPeriodTitle")}</h2>
          </div>
          <div className="tarif_plan">
            <div className="tarif_plan_top">
              <p>{t("freePlanDuration")}</p>
            </div>
            <div className="free_tarif">
              <p>{t("activateTrialPeriod")}</p>
            </div>
            <div className="review_right_link">
              <p onClick={activateDemoTariff}>{t("activateLink")}</p>
            </div>
          </div>
        </div>
      )}
      <div className="rates_cards">
        <div className="secondary_block_wrapper rates_card">
          <div className="main_block_wrapper_title">
            <h2>{t("startPlanTitle")}</h2>
            <p>{t("startPlanDescription")}</p>
          </div>
          <div className="order_history_list_line"></div>
          <div className="rates_card_descr">
            <div className="rates_card_descr_price">
              <p>
                {t("startPlanPrice")} <span>{t("startPlanPricePerMonth")}</span>
              </p>
            </div>
            <div className="rates_card_descr_limit">
              <p>{t("startPlanTradingLimit")}</p>
            </div>
          </div>
          <div className="order_history_list_line"></div>
          <div className="investing_top_card_select">
            <button onClick={() => setTarif("start")}>{t("buyButton")}</button>
          </div>
        </div>
        <div className="secondary_block_wrapper rates_card">
          <div className="main_block_wrapper_title">
            <h2>{t("advancedPlanTitle")}</h2>
            <p>{t("advancedPlanDescription")}</p>
          </div>
          <div className="order_history_list_line"></div>
          <div className="rates_card_descr">
            <div className="rates_card_descr_price">
              <p>
                {t("advancedPlanPrice")}{" "}
                <span>{t("advancedPlanPricePerMonth")}</span>
              </p>
            </div>
            <div className="rates_card_descr_limit">
              <p>{t("advancedPlanTradingLimit")}</p>
            </div>
          </div>
          <div className="order_history_list_line"></div>
          <div className="investing_top_card_select">
            <button onClick={() => setTarif("advanced")}>
              {t("buyButton")}
            </button>
          </div>
        </div>

        <div className="secondary_block_wrapper rates_card">
          <div className="main_block_wrapper_title">
            <h2>{t("professionalPlanTitle")}</h2>
            <p>{t("professionalPlanDescription")}</p>
          </div>
          <div className="order_history_list_line"></div>
          <div className="rates_card_descr">
            <div className="rates_card_descr_price">
              <p>
                {t("professionalPlanPrice")}{" "}
                <span>{t("professionalPlanPricePerMonth")}</span>
              </p>
            </div>
            <div className="rates_card_descr_limit">
              <p>{t("professionalPlanTradingLimit")}</p>
            </div>
          </div>
          <div className="order_history_list_line"></div>
          <div className="investing_top_card_select">
            <button onClick={() => setTarif("professional")}>
              {t("buyButton")}
            </button>
          </div>
        </div>
      </div>
      <div className="secondary_block_wrapper rates_warning">
        <div className="main_block_wrapper_title">
          <h2>{t("controlTitle")}</h2>
          <p>{t("controlDescription")}</p>
        </div>
      </div>
      <div className="page_title investments_block_title">
        <h1 className="questions_title">{t("faq_title")}</h1>
      </div>
      <div className="faq_invest">
        {faq.map((item) => (
          <div
            className={
              opened == item.question
                ? "faq_invest_item faq_invest_item_open"
                : "faq_invest_item"
            }
            onClick={() => toggleTabs(item.question)}
          >
            <div className="faq_invest_item_question">
              <p>{item.question}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 11V4H11V11H4V13H11V20H13V13H20V11H13Z"
                  fill="#111112"
                />
              </svg>{" "}
            </div>
            <div className="faq_invest_item_answer">
              {item.answer.split("\n").map((line, index) => (
                <p key={index}>
                  {line}
                  <br />
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default RatesPage;
