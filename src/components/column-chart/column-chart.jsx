import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./column-chart.css";

const ColumnChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [
          {
            x: "21.11.2023",
            y: [1, 5],
          },
          {
            x: "22.11.2023",
            y: [4, 6],
          },
          {
            x: "23.11.2023",
            y: [5, 8],
          },
          {
            x: "24.11.2023",
            y: [2, 4],
          },

          {
            x: "25.11.2023",
            y: [7, 11],
          },
          {
            x: "26.11.2023",
            y: [3, 11],
          },
          {
            x: "27.11.2023",
            y: [9, 11],
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "rangeBar",
        height: 350,
        
      },
      plotOptions: {
        bar: {
          horizontal: false,
      
          barWidth: "30px", 
        },
      },
      colors: ["#0077FF"],

      dataLabels: {
        enabled: false,
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="rangeBar"
        height={350}
        width="100%"
      />
    </div>
  );
};

export default ColumnChart;
