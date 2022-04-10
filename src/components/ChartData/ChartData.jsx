import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  //   labels: ["Studio Bookings", "Referrals", "Studio and Engineer"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 7],
      backgroundColor: [
        "rgba(7, 255, 1, 0.5)",
        "rgba(72, 1, 216, 0.5)",
        "rgba(255, 228, 1, 0.5)",
        "rgba(250, 23, 64, 0.5)",
      ],
      borderColor: [
        "rgba(7, 255, 1, 1)",
        "rgba(72, 1, 216, 1)",
        "rgba(255, 228, 1, 1)",
        "rgba(250, 23, 64, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

const ChartData = () => {
  return <Doughnut data={data} />;
};

export default ChartData;
