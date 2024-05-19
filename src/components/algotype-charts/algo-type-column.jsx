import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./algo-type-charts.css";

const AlgoColumnChart = () => {
  const categories = [
    "2021.1", "2021.2", "2021.3", "2021.4", "2021.5", "2021.6",
    "2021.7", "2021.8", "2021.9", "2021.10", "2021.11", "2021.12",
    "2022.1", "2022.2", "2022.3", "2022.4", "2022.5", "2022.6",
    "2022.7", "2022.8", "2022.9", "2022.10", "2022.11", "2022.12",
    "2023.1", "2023.2", "2023.3", "2023.4", "2023.5", "2023.6",
    "2023.7", "2023.8", "2023.9", "2023.10", "2023.11", "2023.12",
    "2024.1", "2024.2", "2024.3", "2024.4", "2024.5"
  ];
  
  const timestamps = categories.map(cat => {
    const [year, month] = cat.split('.').map(Number);
    return new Date(year, month - 1).getTime();
  });
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "PnL",
        data: [
          1.2, 1.13, 2.19, 0.49, 14.29, 0.91, 2.74, 3.66, 7.51, 11.66, 21.65,
          46.83, 38.14, 32.67, 41.96, 34.72, 47.38, 62.57, 47.67, 44.57, 33.52,
          55.58, 86.33, 72.72, 89.53, 63.86, 26.99, 43.89, 69.47, 57.41, 73.14,
          84.94, 52.84, 86.05, 118.52, 168.65, 73.45, 98.86, 115.14, 43.23,
          13.47,
        ],
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

      },
      yaxis: {
        labels: {
          formatter: function (y) {
            return y.toFixed(2);
          },
        },
      },

      xaxis: {
        type: "datetime",
        categories: timestamps,
        labels: {
          formatter: function (val, timestamp) {
            const date = new Date(timestamp);
            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
          },
          style: {
            colors: "#92979C",
          },
          align: "center",
        },
      },
      tooltip: {
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
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
};

export default AlgoColumnChart;
