import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./algo-type-charts.css";
import { datesLine } from "./line-dates";
import { lineData } from "./line-datas";

const AlgoLineChart = ({setAllPnl}) => {
  const timestamps = datesLine.map((cat) => {
    const [year, month, day] = cat.split(".").map(Number);
    return new Date(year, month - 1, day).getTime();
  });

  const calculateCumulativeSum = (data) => {
    let cumulativeSum = 0;
    return data.map((value) => {
      cumulativeSum += value;
      return cumulativeSum;
    });
  };

  const [cumulativeData, setCumulativeData] = useState(
    calculateCumulativeSum(lineData)
  );

  useEffect(() => {
    const newCumulativeData = calculateCumulativeSum(lineData);
    setCumulativeData(newCumulativeData);
    
    // Log the value of the last element
    if (newCumulativeData.length > 0) {
      setAllPnl(newCumulativeData[newCumulativeData.length - 1].toFixed(2));
    }
  }, [lineData]);


  const [chartData, setChartData] = useState({
    series: [
      {
        name: "PnL",
        data: cumulativeData,
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
        categories: timestamps,
        labels: {
          formatter: function (val, timestamp) {
            const date = new Date(timestamp);
            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
          },
          style: {
            colors: "#92979C",
          },
          align: "center",
        },
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return `${value.toFixed(2)} %`;
          },
          style: {
            colors: "#92979C",
          },
          align: "left",
        },
      },
      tooltip: {
        x: {
          format: "yyyy/MM/dd",
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
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
          width="100%"
        />
      </div>
    </>
  );
};

export default AlgoLineChart;
