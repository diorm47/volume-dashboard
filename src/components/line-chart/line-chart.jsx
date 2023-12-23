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
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-20T01:30:00.000Z",
          "2018-09-21T02:30:00.000Z",
          "2018-09-22T03:30:00.000Z",
          "2018-09-23T04:30:00.000Z",
          "2018-09-24T05:30:00.000Z",
          "2018-09-25T06:30:00.000Z",
        ],
        labels: {
          formatter: function (value, timestamp) {
            const date = new Date(timestamp);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${month}/${day}`;
          },
          style: {
            colors: "#92979C",
          },
        }
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
          format: "dd/MM/yy HH:mm",
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
