import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./algo-type-charts.css";

const AlgoLineChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "PnL",
        data: [20, -45, -12, 67, -34, -1, 23],
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
        // padding: {
        //   right: 58, // Increase right padding
        // },
      },
      xaxis: {
        type: "datetime",

        categories: [
          "01/01",
          "01/02",
          "01/03",
          "01/04",
          "01/05",
          "01/06",
          "01/07",
        ],
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
          align: "left",
        },
      },

      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
        y: {
          formatter: function (value) {
            return `${Number(value).toFixed(2)} USDT`;
          },
        },
      },
    },
  });

  return (
    <>
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
  );
};

export default AlgoLineChart;
