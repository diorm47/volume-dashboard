import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./line-chart.css";
import subDays from "date-fns/subDays";
import empty_block from "../../assets/icons/empty-block.png";

const LineChart = ({ selectedTime }) => {
  const [pnl, setPnl] = useState(false);
  const [pnlData, setPnlData] = useState("0.00");
  const formatDate = (date) => {
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getLast7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.unshift(formatDate(date)); // Manually format the date
    }
    return dates;
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
      const formattedKey = formatDate(new Date(key));
      acc[formattedKey] = serverData[key];
      return acc;
    }, {});
  
    // Заполняем нулями дни без данных
    const updatedData = datesInRange.map((date) => serverDataConverted[date] || 0);
  
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
    }
  }, [localStorage.getItem("token")]);
  const sumData = (data) => {
    return data.reduce((acc, value) => acc + value, 0).toFixed(2);
  };

  useEffect(() => {
    if (chartData.series.length > 0 && chartData.series[0].data.length > 0) {
      const total = sumData(chartData.series[0].data);
      setPnlData(total);
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
      {true ? (
        <>
          <div className="pnl_value">
            <p>
              + {pnlData} <span>USDT</span>
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
          <p>Нет данных по Pnl</p>
        </div>
      )}
    </>
  );
};

export default LineChart;
