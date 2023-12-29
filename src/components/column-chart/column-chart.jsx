import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./column-chart.css";

const ColumnChart = ({ setPnlDays }) => {
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };
  const [chartData] = useState({
    series: [
      {
        name: "PnL",
        data: [0, 0, 0, 0, 0, 0, 0],
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
        categories: getLast7Days(),
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
