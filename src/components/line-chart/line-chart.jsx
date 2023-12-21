import React from "react";
import { Line } from "react-chartjs-2";
import "./line-chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
const LineChart = () => {
  const data = {
    labels: [
      "21.11",
      "22.11",
      "23.11",
      "24.11",
      "25.11",
      "26.11",
      "27.11",
    ],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65, 34],
        fill: true,

        backgroundColor: "#d2e6fbaa",
        borderColor: "#0077FF",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Disable the display of vertical grid lines
        },
      },
    },
  };
  return (
    <div className="line_chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
