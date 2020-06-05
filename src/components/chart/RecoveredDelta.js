import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMonthAndDate } from "../../utils";
import LineChart from "./DynamicChart";

export default function RecoveredDelta() {
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
            label: "Recovered",
            backgroundColor: "rgba(127, 184, 0,1)",
            borderWidth: 2,
            data: dailyData.map(d => d.deltaRecovered)
          }
        ]
      });
    }
  }, [dailyData]);
  const options = {
    titleText: "Covid19 Daily Recovered",
    xAxesLabel: "",
    yAxesLabel: "Recovered casulties"
  };

  return (
    <div style={{ position: "relative" }}>
      <LineChart data={data} options={options} chartType="bar" />
    </div>
  );
}
