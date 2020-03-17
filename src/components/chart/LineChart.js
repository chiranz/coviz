import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getMonthAndDate } from "../../utils";

export default function LineChart() {
  const { dailyData } = useSelector(state => state.data);
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (dailyData) {
      setData({
        labels: dailyData.map(d => getMonthAndDate(d.reportDate)),
        datasets: [
          {
            label: "Total Casulties",
            borderColor: "rgba(255,0,0, .5)",
            backgroundColor: "rgba(255,0,0, .1)",
            borderWidth: 2,
            data: dailyData.map(d => d.totalConfirmed)
          },
          {
            label: "Recovered",
            borderColor: "rgba(0,128,0,0.5)",
            backgroundColor: "rgba(0,128,0,0.3)",
            borderWidth: 2,
            data: dailyData.map(d => d.totalRecovered)
          }
        ]
      });
    }
  }, [dailyData]);

  return (
    <div style={{ position: "relative" }}>
      <Line
        data={data}
        options={{
          responsive: true
        }}
      />
    </div>
  );
}
