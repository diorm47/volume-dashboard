import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./column-chart.css";

const ColumnChart = ({ setPnlDays }) => {
  const [chartData] = useState({
    series: [
      {
        name: "PnL",
        data: [40, 20, -100, -30, 140, 50, 10],
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
      tooltip: {
        y: {
          formatter: function (value) {
            setPnlDays(value);
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
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ColumnChart;
