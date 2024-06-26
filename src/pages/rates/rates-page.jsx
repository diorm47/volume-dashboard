import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { mainApi } from "../../components/utils/main-api";
import Snackbar from "../../components/snackbar/snackbar";
import { useTranslation } from "react-i18next";
import { ReactComponent as Success } from "../../assets/icons/success.svg";
import { ReactComponent as Fail } from "../../assets/icons/fail.svg";

function RatesPage({ updatebalance }) {
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    document.title = `${t("selectPlan")} | &Volume`;
  }, [t]);
  const faq = [
    {
      question: "Могу ли я перейти на другой тариф после оплаты?",
      answer:
        "Если вы решите перейти на более дорогой тариф, вам нужно будет доплатить разницу в зависимости от количества использованных дней. Если же вы захотите перейти на более дешёвый тариф, вам следует запросить возврат средств за неиспользованные дни, а затем оплатить новый тариф. \n К сожалению, обе эти операции пока невозможно выполнить самостоятельно. Вам придётся обратиться в службу поддержки через форму обратной связи на сайте или в Телеграм-бота.",
    },
    {
      question: "Какая должна быть минимальная сумма депозита?",
      answer:
        "Доступ к сервису предоставляется при балансе депозита от $100. Для получения дохода и покрытия расходов на подписку рекомендуется использовать депозит в размере не менее $500.",
    },
    {
      question: "Какие комиссии и условия использования?",
      answer:
        "Мы не берём комиссию за сделки и не удерживаем процент от дохода. Для использования сервиса необходимо приобрести подписку. Её стоимость определяется размером инвестиций.",
    },
    {
      question:
        "Могу ли я изменить тарифный план пока действует пробный период?",
      answer:
        "Чтобы оформить возврат за неиспользованные дни, обратитесь в службу поддержки. Это можно сделать через форму обратной связи или в Телеграме с помощью бота.",
    },

  ];
  const faqEn = [
    {
      question: "Can I switch to a different plan after payment?",
      answer:
        "Yes. If you want to switch to a more expensive plan, you will need to pay the price difference based on the days used. If you want to switch to a lower-priced plan, you will need to request a refund for the remaining days and then make the payment for the new plan. Both operations cannot be performed independently at the moment; please contact customer support through the feedback form on the website or via the Telegram bot.",
    },
    {
      question: "What should be the minimum deposit amount?",
      answer:
        "The service is available with a deposit balance of $100 or more. To earn income and cover the subscription cost simultaneously, we recommend using at least $250 - $500. We also recommend not using more than $3,000 in the first month.",
    },
    {
      question: "What are the fees and usage conditions?",
      answer:
        "We do not charge fees for transactions, and we do not deduct a percentage from your earnings. To use the service, you need to purchase a subscription. The subscription cost depends on the investment amount: the higher the deposit, the more expensive the subscription. In the future, users with deposits exceeding $5,000 may have the option of a subscription fee based on profits.",
    },
    {
      question: "Can I change my tariff plan during the trial period?",
      answer:
        "Yes. To subscribe to the desired plan during the trial period, select it on the 'Plans' page and follow the payment instructions. If you have any questions during the process, please contact customer support.",
    },

  ];

  const locale = localStorage.getItem("locale");
  const faqArray = locale === "en" ? faqEn : faq;

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

    fetch("https://api.nvolume.com/private-api/v1/users/demo/activate", {
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
    const totalDays = userData.tariff === "Пробный" ? 7 : 30;

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      const daysLeft = Math.max(
        Math.floor(difference / (1000 * 60 * 60 * 24)),
        0
      );

      const remainingPercentage = Math.max((daysLeft / totalDays) * 100, 0);

      setRemainingDays(daysLeft);
      setProgressWidth(`${100 - remainingPercentage}%`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);
  // const openInvoice = (invoiceId) => {
  //   const url = `https://pay.cryptocloud.plus/${invoiceId}`;
  //   window.open(url, '_blank');
  // };
  const openInvoice = (invoiceId) => {
    const url = `https://pay.cryptocloud.plus/${invoiceId}`;

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, "_blank");
    }
  };

  const setTarif = (data) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("tariff", data);

    fetch("https://api.nvolume.com/private-api/v1/users/invoice/create", {
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
        openInvoice(data.data.invoice_id);
      })
      .catch((error) => {
        console.error("Error:", error);
        snackOptions("Ошибка!", "error");
      });
  };
  const tariffNames = {
    Пробный: "Trial",
    Стартовый: "Starter",
    Улучшенный: "Improved",
    Продвинутый: "Advanced",
  };

  const displayTariff = (language, tariff) => {
    return language === "en" && tariffNames[tariff]
      ? tariffNames[tariff]
      : tariff;
  };

  const [tariffffsss, setTar] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTar(true);
    }, 1300);
  }, []);
  return (
    <>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
      <div className="page_title investments_page_title rate_title">
        <h2>{t("selectPlan")}</h2>
        <p>{t("paymentDisclaimer")}</p>
      </div>

      {tariffffsss ? (
        <>
          {(userData && userData.tariff && userData.tariff_paid_to) ||
          userData.demo_used ? (
            <div className="secondary_block_wrapper">
              <div className="main_block_wrapper_title">
                <h2>{displayTariff(i18n.language, userData.tariff)}</h2>
              </div>
              <div className="tarif_plan">
                <div className="tarif_plan_top">
                  <p>{t("tariffPlanTitle")} </p>
                </div>

                <div className="tarif_plan_time">
                  <div className="tarif_plan_time_title">
                    <p>
                      {t("remaining_days")} {remainingDays} {t(remainingDays === 1 ? "day" : "days")}
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
                  <NavLink to="/pricing/pricing">
                    <p>{t("add_30_days")}</p>
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
        </>
      ) : (
        <div className="secondary_block_wrapper"></div>
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
            <div className="rates_card_limits">
              <div className="rates_card_limits_item">
                <div>
                  <Success />
                  <p>Sigma AI</p>
                </div>
                <p>
                  <span>{t('depol_limit')} $1 000</span>
                </p>
              </div>
              <div className="rates_card_limits_item">
                <div>
                  <Fail />
                  <p>Delta AI</p>
                </div>
                <p>
                  <span className="bgtr">{t('depol_limit')} $1 000</span>
                </p>
              </div>
            </div>
          </div>
          <div className="order_history_list_line"></div>
          <div className="investing_top_card_select">
            <button onClick={() => setTarif("start")}>{t("buyButton")}</button>
          </div>
        </div>
        <div className="secondary_block_wrapper rates_card best_pricing_card">
          <div className="best_pricing_card_ind">
            <p>{t('popular')}</p>
          </div>
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
            <div className="rates_card_limits">
              <div className="rates_card_limits_item">
                <div>
                  <Success />
                  <p>Sigma AI</p>
                </div>
                <p>
                  <span>{t('depol_limit')} $5 000</span>
                </p>
              </div>
              <div className="rates_card_limits_item">
                <div>
                  <Success />
                  <p>Delta AI</p>
                </div>
                <p>
                  <span>{t('depol_limit')} $5 000</span>
                </p>
              </div>
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
            <div className="rates_card_limits">
              <div className="rates_card_limits_item">
                <div>
                  <Success />
                  <p>Sigma AI</p>
                </div>
                <p>
                  <span>{t('depol_limit')} $10 000</span>
                </p>
              </div>
              <div className="rates_card_limits_item">
                <div>
                  <Success />
                  <p>Delta AI</p>
                </div>
                <p>
                  <span>{t('depol_limit')} $25 000</span>
                </p>
              </div>
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

      <div className="page_title investments_block_title">
        <h1 className="questions_title">{t("faq_title")}</h1>
      </div>
      <div className="faq_invest">
        {faqArray.map((item) => (
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
