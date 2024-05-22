import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./algo-type-charts.css";

const AlgoColumnChart = () => {
  const categories = [
    "2021.3 ",
    "2021.4 ",
    "2021.5 ",
    "2021.6 ",
    "2021.7 ",
    "2021.8 ",
    "2021.9 ",
    "2021.10",
    "2021.11",
    "2021.12",
    "2022.1 ",
    "2022.2 ",
    "2022.3 ",
    "2022.4 ",
    "2022.5 ",
    "2022.6 ",
    "2022.7 ",
    "2022.8 ",
    "2022.9 ",
    "2022.10",
    "2022.11",
    "2022.12",
    "2023.1 ",
    "2023.2 ",
    "2023.3 ",
    "2023.4 ",
    "2023.5 ",
    "2023.6 ",
    "2023.7 ",
    "2023.8 ",
    "2023.9 ",
    "2023.10",
    "2023.11",
    "2023.12",
    "2024.1 ",
    "2024.2 ",
    "2024.3 ",
    "2024.4 ",
    "2024.5 ",
  ];

  const timestamps = categories.map((cat) => {
    const [year, month] = cat.split(".").map(Number);
    return new Date(year, month - 1).getTime();
  });

  const [mode, setMode] = useState(localStorage.getItem("mode"));
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "PnL",
        data: [
          13.46, 3.11, 42.52, -1.26, -14.92, 15.23, 6.23, 40.64, 22.82, 6.72,
          57.61, 12.76, 52.48, 20.45, 13.97, 56.89, -3.16, 16.12, 13.47, 33.42,
          -2.75, 12.45, 83.93, 14.05, -5.53, -3.48, 15.34, 7.38, 12.43, 10.52,
          4.02, 17.26, 30.01, 49.73, 41.35, 28.34, 44.19, 4.92, 6.93,
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
          borderRadius: 2,
          colors: {
            ranges: [
              {
                from: 100000000,
                to: -100000000,
                color: "#0077FF",
              },
            ],
          },
          columnWidth: "40%",
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
          style: {
            colors:  mode === "dark" ? "#e9ebf084 " : "#57575790",

          },
        },
      },
      xaxis: {
        categories: timestamps,
        labels: {
          formatter: function (val, timestamp) {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            return month === "01" ? year : "";
          },
          style: {
            colors: "#92979C",
          },
          align: "right",
        },
      },
      tooltip: {
        x: {
          formatter: function (timestamp) {
            const date = new Date(timestamp);
            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`;
          },
        },
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
      <div id="chart" className="algo_type_column_1 ">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
        <div className="algo_type_column_1_xaxis">
          <p>2021</p>
          <p>2022</p>
          <p>2023</p>
          <p>2024</p>
        </div>
      </div>
    </>
  );
};

export default AlgoColumnChart;
