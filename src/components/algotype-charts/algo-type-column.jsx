import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./algo-type-charts.css";

const AlgoColumnChart = () => {
  const categories = [
    "2021.1",
    "2021.2",
    "2021.3",
    "2021.4",
    "2021.5",
    "2021.6",
    "2021.7",
    "2021.8",
    "2021.9",
    "2021.10",
    "2021.11",
    "2021.12",
    "2022.1",
    "2022.2",
    "2022.3",
    "2022.4",
    "2022.5",
    "2022.6",
    "2022.7",
    "2022.8",
    "2022.9",
    "2022.10",
    "2022.11",
    "2022.12",
    "2023.1",
    "2023.2",
    "2023.3",
    "2023.4",
    "2023.5",
    "2023.6",
    "2023.7",
    "2023.8",
    "2023.9",
    "2023.10",
    "2023.11",
    "2023.12",
    "2024.1",
    "2024.2",
    "2024.3",
    "2024.4",
    "2024.5",
  ];

  const timestamps = categories.map((cat) => {
    const [year, month] = cat.split(".").map(Number);
    return new Date(year, month - 1).getTime();
  });
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "PnL",
        data: [
          1.2, 0.96, 2.19, 0.51, 14.29, 0.79, 2.58, 3.57, 7.37, 11.3, 20.59,
          41.18, 33.17, 25.61, 33.65, 30.31, 42.8, 55.27, 41.69, 35.71, 28.79,
          42.48, 69.19, 49.52, 71.43, 54.64, 20.72, 35.93, 51.5, 39.8, 43.43,
          52.99, 40.73, 64.51, 92.2, 128.55, 58.5, 81.06, 86.33, 37.93, 12.49,
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
            return `${y.toFixed(2)} %`;
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: timestamps,
        labels: {
          formatter: function (val, timestamp) {
            const date = new Date(timestamp);
            return `${date.getFullYear()}.${String(
              date.getMonth() + 1
            ).padStart(2, "0")}`;
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
            return `${Number(value).toFixed(2)} %`;
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
