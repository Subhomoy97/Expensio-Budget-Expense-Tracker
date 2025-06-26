import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LineChart = ({ data, options }) => {
  return (
    <div style={{ position: "relative", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

