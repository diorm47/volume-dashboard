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
          "2011-01-01",
          "2011-02-01",
          "2011-03-01",
          "2011-04-01",
          "2011-05-01",
          "2011-06-01",
          "2011-07-01",
        ],
        labels: {
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
