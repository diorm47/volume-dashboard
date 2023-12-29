import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./column-chart.css";
import empty_block from "../../assets/icons/empty-block.png";
import subDays from "date-fns/subDays";

const ColumnChart = () => {
  const [pnl, setPnl] = useState(false);
  const [pnlData, setPnlData] = useState('0.00');
  const formatDate = (date) => {
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Function to get the last 7 days in yyyy-mm-dd format
  const getLast7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.unshift(formatDate(date)); // Manually format the date
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
      },
      xaxis: {
        type: "datetime",
        categories: getLast7Days(),
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
            setPnlData(value);
            return `${value} USDT`;
          },
        },
      },
    },
  });

  const updateChartData = (serverData) => {
    const last7Days = getLast7Days();

    // Convert the server data keys to 'yyyy-mm-dd' format for matching
    const serverDataConverted = Object.keys(serverData).reduce((acc, key) => {
      const [dd, mm, yyyy] = key.split("-");
      acc[`${yyyy}-${mm}-${dd}`] = serverData[key];
      return acc;
    }, {});

    const updatedData = last7Days.map((date) => serverDataConverted[date] || 0);

    setChartData((prevState) => ({
      ...prevState,
      series: [{ ...prevState.series[0], data: updatedData }],
    }));
  };

  const [selectedTime, setSelectedTime] = useState([
    subDays(new Date(), 6),
    new Date(),
  ]);
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
