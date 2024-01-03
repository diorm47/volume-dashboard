import React, { useEffect, useState } from "react";
import "./data-picker-mob.css";
import DatePicker from "react-mobile-datepicker";
import subDays from "date-fns/subDays";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import { useTranslation } from "react-i18next";

function DataPickerMob({ setSelectedTime }) {
  const { t } = useTranslation();
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
  const [time, setTime] = useState(subDays(new Date(), 6));
  const [time2, setTime2] = useState(new Date());
  const [visible1, setVisible1] = useState(true);

  const [visible, setVisible] = useState(false);

  const handleSelect = (newTime) => {
    if (visible1) {
      setTime(newTime);
    } else {
      setTime2(newTime);
    }
  };

  const getMonthName = (monthNumber) => {
    const monthKey = `months.${monthNumber}`;
    return t(monthKey);
  };

  const dateConfig = {
    year: {
      format: "YYYY",
      caption: "Year",
      step: 1,
    },
    month: {
      format: (value) => getMonthName(value.getMonth() + 1),
      caption: "Mon",
      step: 1,
    },
    date: {
      format: "DD",
      caption: "Day",
      step: 1,
    },
  };

  const setSevenDays = () => {
    setTime(subDays(new Date(), 6));
    setTime2(new Date());
  };
  const setMonth = () => {
    setTime(subDays(new Date(), 29));
    setTime2(new Date());
  };
  const setThreeMonth = () => {
    setTime(subDays(new Date(), 29 * 3));
    setTime2(new Date());
  };
  const setSixMonth = () => {
    setTime(subDays(new Date(), 29 * 6));
    setTime2(new Date());
  };
  useEffect(() => {
    setSelectedTime([time, time2]);
  }, [setSelectedTime, time, time2]);

  return (
    <>
      <div
        className={visible ? "overlay visible_overlay" : "overlay"}
        onClick={() => setVisible(false)}
      ></div>
      <div
        className={
          visible ? "modal_wrapper visible_modal_wrapper" : "modal_wrapper "
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("select_date")}</p>
          <ExitModal onClick={() => setVisible(false)} />
        </div>
        <div className="modal_wrapper_content ">
          <div className="date_picker_mob">
            <div className="date_picker_mob_buttons">
              <button onClick={setSevenDays}>{t("trial_period")}</button>
              <button onClick={setMonth}> {t("paid_period")}</button>
              <button onClick={setThreeMonth}> {t("day_90")}</button>
              <button onClick={setSixMonth}> {t("last_180")}</button>
            </div>
            <div className="date_picker_mob_inputs">
              <button
                onClick={() => setVisible1(true)}
                className={visible1 ? "active_time_input" : ""}
              >
                {formatDate(time)}
              </button>
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
                ></path>
              </svg>
              <button
                onClick={() => setVisible1(false)}
                className={!visible1 ? "active_time_input" : ""}
              >
                {formatDate(time2)}
              </button>
            </div>
          </div>
          <div className="date_picker_mob_content">
            <DatePicker
              dateConfig={dateConfig}
              value={visible1 ? time : time2}
              isOpen={true}
              isPopup={false}
              max={new Date()}
              min={subDays(new Date(), 29 * 12)}
              onChange={handleSelect}
            />
          </div>

          <div className="modal_wrapper_btns date_picker_mob_btns">
            <div className="modal_wrapper_cancel">
              <button onClick={() => setVisible(false)}>{t("cancel")}</button>
            </div>
            <div className="modal_wrapper_save_btn">
              <button onClick={() => setVisible(false)}>{t("save")}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="analysis_top_toggler" onClick={() => setVisible(true)}>
        <p> {formatDate(time)}</p>
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
        <p> {formatDate(time2)}</p>
        <svg
          onClick={setSevenDays}
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
    </>
  );
}

export default DataPickerMob;
