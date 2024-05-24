import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./algo-type-charts.css";

const AlgoColumnChart = () => {
  const categories = [
    "2017.8",
    "2017.9",
    "2017.10",
    "2017.11",
    "2017.12",
    "2018.1",
    "2018.2",
    "2018.3",
    "2018.4",
    "2018.5",
    "2018.6",
    "2018.7",
    "2018.8",
    "2018.9",
    "2018.10",
    "2018.11",
    "2018.12",
    "2019.1",
    "2019.2",
    "2019.3",
    "2019.4",
    "2019.5",
    "2019.6",
    "2019.7",
    "2019.8",
    "2019.9",
    "2019.10",
    "2019.11",
    "2019.12",
    "2020.1",
    "2020.2",
    "2020.3",
    "2020.4",
    "2020.5",
    "2020.6",
    "2020.7",
    "2020.8",
    "2020.9",
    "2020.10",
    "2020.11",
    "2020.12",
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
          1.75, -12.66, 4.56, 14.31, -4.47, 5.09, 1.26, 20.28, 18.23, 4.09,
          5.04, -0.97, 3.09, -1.51, -8.11, 25.32, 5.94, 2.51, 4.31, 7.35, 15.28,
          12.8, -0.96, 2.99, -0.2, 6.42, -4.71, 1.88, 4.23, 24.63, 12.49, 4.77,
          13.93, -2.01, -4.66, 18.81, -3.03, -0.64, 2.13, 14.75, -2.83, 33.59,
          32.98, -4.64, 18.46, 15.56, 2.32, 1.63, 48.47, -1.44, -0.83, -0.14,
          0.51, 7.63, -1.04, 11.6, 2.35, 6.77, 4.39, 1.99, 2.38, -7.31, 3.98,
          7.54, 2.5, 16.54, 0.8, 5.92, 2.81, 0.39, 2.86, 1.85, 3.24, -2.18,
          20.1, 18.84, 9.83, -2.84, 9.21, 1.01, -1.56,
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
            colors: mode === "dark" ? "#e9ebf084 " : "#57575790",
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
            return `${date.getFullYear()}.${String(
              date.getMonth() + 1
            ).padStart(2, "0")}`;
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
          <p>2017</p>
          <p>2018</p>
          <p>2019</p>
          <p>2020</p>
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
