import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./algo-type-charts.css";

const AlgoColumnChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "PnL",
        data: [20, 45, 12, 67, 34, 1, 78],
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
          right: 29, // Increase right padding
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
          align: "left",
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
