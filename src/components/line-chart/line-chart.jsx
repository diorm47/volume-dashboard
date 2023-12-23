import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./line-chart.css";

const LineChart = ({ setPnl }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "PnL",
        data: [31, 40, 28, 51, 42, 109, 100],
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
        categories: [
          "2023-12-21",
          "2023-12-22",
          "2023-12-23",
          "2023-12-24",
          "2023-12-25",
          "2023-12-26",
          "2023-12-27",
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
            setPnl(value);
            return `${value} USDT`;
          },
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
        width="100%"
      />
    </div>
  );
};

export default LineChart;
