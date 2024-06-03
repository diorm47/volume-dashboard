import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../algotype-charts/algo-type-charts.css";
import { lineData } from "../algotype-charts-ai/line-datas";
import { datesLine } from "../algotype-charts-ai/line-dates";
import "./long-term-graph.css";

const LongTermGraph = () => {
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
  }, [lineData]);

  // Filter data within the specified date range
  const startDate = new Date(2023, 0, 1).getTime(); // 2023-01-01
  const endDate = new Date(2024, 0, 1).getTime(); // 2024-01-01

  const filteredData = cumulativeData.filter((value, index) => {
    const timestamp = timestamps[index];
    return timestamp >= startDate && timestamp <= endDate;
  });

  console.log(filteredData);
  const filteredTimestamps = timestamps.filter(
    (timestamp) => timestamp >= startDate && timestamp <= endDate
  );

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "PnL",
        data: filteredData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
            enabled: false, // Disable zoom
          },
          selection: {
            enabled: false, // Disable selection
          },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      colors: ["#0077FF"],
      grid: {
        yaxis: {
          lines: {
            show: false, // Hide horizontal grid lines
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: filteredTimestamps,
        labels: {
          formatter: function (val, timestamp) {
            const date = new Date(timestamp);
            return `${date.getFullYear()}.${String(
              date.getMonth() + 1
            ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
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
        enabled: false,
      },
    },
  });

  return (
    <div id="chart" className="long_short_graph">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={250}
        width="114%"
      />
    </div>
  );
};

export default LongTermGraph;
