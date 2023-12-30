import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./column-chart.css";
import empty_block from "../../assets/icons/empty-block.png";
import subDays from "date-fns/subDays";

const ColumnChart = ({ selectedTime }) => {
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
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: 100000000,
                to: -100000000,
                color: "#0077FF",
              },
            ],
          },
          columnWidth: "20%",
        },
      },
      dataLabels: {
        enabled: false,
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
      yaxis: {
        labels: {
          formatter: function (y) {
            return y.toFixed(0);
          },
        },
        min: (min) => {
          return Math.floor(min * 0.9);
        },
        max: (max) => {
          return Math.ceil(max * 1.1);
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
      tooltip: {
        y: {
          formatter: function (value) {
            setPnlData(`${value}.00`);
            return `${value} USDT`;
          },
        },
      },
    },
  });

  const updateChartData = (serverData) => {
    // Предполагается, что selectedTime содержит две даты: начальную и конечную
    const startDate = new Date(selectedTime[0]);
    const endDate = new Date(selectedTime[1]);
    const datesInRange = getDatesInRange(startDate, endDate);

    // Преобразование данных сервера в нужный формат (если требуется)
    const serverDataConverted = Object.keys(serverData).reduce((acc, key) => {
      const [day, month, year] = key.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      const formattedKey = formatDate(date);
      acc[formattedKey] = serverData[key];
      return acc;
    }, {});

    // Заполняем нулями дни без данных
    const updatedData = datesInRange.map(
      (date) => serverDataConverted[date] || 0
    );
    console.log(updatedData);
    setChartData((prevState) => ({
      ...prevState,
      series: [{ ...prevState.series[0], data: updatedData }],
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

    fetch("https://trade.margelet.org/private-api/v1/users/pnl-chart", {
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
      getPnl();
      // updateChartData({ "30-12-2023": 1 });
    }
  }, [localStorage.getItem("token")]);

  const sumData = (data) => {
    return data.reduce((acc, value) => acc + value, 0).toFixed(2);
  };

  // Effect to update pnlData whenever chartData.series changes
  useEffect(() => {
    if (chartData.series.length > 0) {
      const total = sumData(chartData.series[0].data);
      setPnlData(total);

      // Проверяем, что сумма данных больше нуля
      if (parseFloat(total) > 0) {
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

  return (
    <>
      {pnl ? (
        <>
          <div className="pnl_value">
            <p>
              + {pnlData} <span>USDT</span>
            </p>
          </div>
          <div id="chart">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height={350}
            />
          </div>
        </>
      ) : (
        <div className="empty_block">
          <img src={empty_block} alt="" />
          <p>Нет данных по Pnl</p>
        </div>
      )}
    </>
  );
};

export default ColumnChart;
