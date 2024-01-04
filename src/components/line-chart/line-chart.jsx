import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./line-chart.css";
import subDays from "date-fns/subDays";
import empty_block from "../../assets/icons/empty-block.png";
import { useTranslation } from "react-i18next";

const LineChart = ({ selectedTime }) => {
  const [pnl, setPnl] = useState(false);
  const [pnlData, setPnlData] = useState("0.00");

  const formatDate = (date) => {
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(formatDate(new Date(currentDate)));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "PnL",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#0077FF"],
      },
      grid: {
        yaxis: {
          lines: {
            show: true,
            color: "#F7F7F7",
          },
        },
        padding: {
          right: 19, // Increase right padding
        },
      },
      xaxis: {
        type: "datetime",

        categories: getDatesInRange(),
        labels: {
          format: "MM/dd", // Format date as 'month/day'

          style: {
            colors: "#92979C",
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return `${value.toFixed(2)}`; // Отображаем значение с двумя цифрами после запятой
          },
          style: {
            colors: "#92979C",
          },
        },
      },

      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
        y: {
          formatter: function (value) {
            setPnlData(value);
            return `${Number(value).toFixed(2)} USDT`;
          },
        },
      },
    },
  });

  // const updateChartData = (serverData) => {
  //   // Предполагается, что selectedTime содержит две даты: начальную и конечную
  //   const startDate = new Date(selectedTime[0]);
  //   const endDate = new Date(selectedTime[1]);
  //   const datesInRange = getDatesInRange(startDate, endDate);

  //   // Преобразование данных сервера в нужный формат (если требуется)
  //   const serverDataConverted = Object.keys(serverData).reduce((acc, key) => {
  //     const [day, month, year] = key.split("-").map(Number);
  //     const date = new Date(year, month - 1, day);
  //     const formattedKey = formatDate(date);
  //     acc[formattedKey] = serverData[key];
  //     return acc;
  //   }, {});

  //   // Заполняем нулями дни без данных
  //   const updatedData = datesInRange.map(
  //     (date) => serverDataConverted[date] || 0
  //   );
  //   console.log(updatedData);
  //   setChartData((prevState) => ({
  //     ...prevState,
  //     series: [{ ...prevState.series[0], data: updatedData }],
  //   }));
  // };

  const updateChartData = (serverData) => {
    // Предполагается, что selectedTime содержит две даты: начальную и конечную
    const startDate = new Date(selectedTime[0]);
    const endDate = new Date(selectedTime[1]);
    const datesInRange = getDatesInRange(startDate, endDate);
  
    // Преобразование данных сервера в нужный формат
    const serverDataConverted = Object.keys(serverData).reduce((acc, key) => {
      const [day, month, year] = key.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      const formattedKey = formatDate(date);
      acc[formattedKey] = serverData[key];
      return acc;
    }, {});
  
    // Вычисление кумулятивной суммы данных
    let cumulativeSum = 0;
    const cumulativeData = datesInRange.map(date => {
      cumulativeSum += serverDataConverted[date] || 0;
      return cumulativeSum;
    });
  
    setChartData(prevState => ({
      ...prevState,
      series: [{ ...prevState.series[0], data: cumulativeData }],
    }));
  };
  

  const getPnl = (value) => {
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

    fetch("https://api.nvolume.com/private-api/v1/users/pnl-chart", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.chart_data) {
          updateChartData(data.data.chart_data);
          setPnl(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // getPnl();
      updateChartData({
        "04-01-2024": 0,
        "03-01-2024": 50,
        "02-01-2024": 30,
        "01-01-2024": -40,
        "31-12-2023": 69,
        "30-12-2023": 11,
        "29-12-2023": -43,
      });
      setPnl(true);
    }
  }, [localStorage.getItem("token")]);
  const sumData = (data) => {
    return data.reduce((acc, value) => acc + value, 0).toFixed(2);
  };

  useEffect(() => {
    if (chartData.series.length !== 0) {
      const total = sumData(chartData.series[0].data);
      setPnlData(total);
      if (parseFloat(total) !== 0) {
        setPnl(true);
      } else {
        setPnl(false);
      }
    } else {
      setPnl(false);
    }
  }, [chartData.series]);

  useEffect(() => {
    if (selectedTime && selectedTime.length === 2) {
      getPnl(selectedTime);
    }
  }, [selectedTime]);

  useEffect(() => {
    if (selectedTime && selectedTime.length === 2) {
      const startDate = new Date(selectedTime[0]);
      const endDate = new Date(selectedTime[1]);
      const datesInRange = getDatesInRange(startDate, endDate);

      setChartData((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: datesInRange,
          },
        },
      }));
    }
  }, [selectedTime]);

  const { t } = useTranslation();

  return (
    <>
      {pnl ? (
        <>
          <div className="pnl_value">
            <p>
              {Number(pnlData).toFixed(2) > 0
                ? `+ ${Number(pnlData).toFixed(2)}`
                : Number(pnlData).toFixed(2)}{" "}
              <span>USDT</span>
            </p>
          </div>
          <div className="review_chart">
            <div id="chart">
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={350}
                width="100%"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="empty_block">
          <img src={empty_block} alt="" />
          <p>{t("pnl_no_data")}</p>
        </div>
      )}
    </>
  );
};

export default LineChart;
