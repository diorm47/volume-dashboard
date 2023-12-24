import React, { useEffect, useRef, useState } from "react";
import "./date-picker.css";

import subDays from "date-fns/subDays";
import { DateRangePicker, Stack } from "rsuite";
import "rsuite/dist/rsuite-rtl.css";

function DatePicker() {
  const predefinedBottomRanges = [
    {
      label: "7 дней",
      value: [subDays(new Date(), 6), new Date()],
    },
    {
      label: "30 дней",
      value: [subDays(new Date(), 29), new Date()],
    },
    {
      label: "90 дней",
      value: [subDays(new Date(), 29 * 3), new Date()],
    },
    {
      label: "Последний 180 дней",
      value: [subDays(new Date(), 29 * 3), new Date()],
    },
  ];

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const customLocale = {
    sunday: "Вс",
    monday: "Пн",
    tuesday: "Вт",
    wednesday: "Ср",
    thursday: "Чт",
    friday: "Пт",
    saturday: "Сб",
    today: "Сегодня",
    yesterday: "Вчера",
    last7Days: "Последние 7 дней",
    last30Days: "Последние 30 дней",
    last90Days: "Последние 90 дней",
    last180Days: "Последние 180 дней",
    thisMonth: "Текущий месяц",
    lastMonth: "Предыдущий месяц",
    january: "Январь",
    february: "Февраль",
    march: "Март",
    april: "Апрель",
    may: "Май",
    june: "Июнь",
    july: "Июль",
    august: "Август",
    september: "Сентябрь",
    october: "Октябрь",
    november: "Ноябрь",
    december: "Декабрь",
  };

  const [selectedRange, setSelectedRange] = useState([
    subDays(new Date(), 6),
    new Date(),
  ]);

  const handleDateRangeChange = (value) => {
    setSelectedRange(value);
    setIsCalendarOpen(false);
  };

  const openCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  return (
    <div className="date_picker">
      <DateRangePicker
        ranges={predefinedBottomRanges}
        locale={customLocale}
        value={selectedRange}
        onChange={handleDateRangeChange}
        onShortcutClick={(shortcut, event) => {
          console.log(shortcut);
        }}
        open={isCalendarOpen}
      />

      <div className="analysis_top_toggler" onClick={openCalendar}>
        <p>{selectedRange[0].toLocaleDateString()}</p>
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
        <p>{selectedRange[1].toLocaleDateString()}</p>
        <svg
          onClick={() => setSelectedRange([subDays(new Date(), 6), new Date()])}
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
  );
}

export default DatePicker;
