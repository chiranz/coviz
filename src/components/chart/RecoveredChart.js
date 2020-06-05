import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMonthAndDate } from "../../utils";
import LineChart from "./DynamicChart";

export default function RecoveredChart() {
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
            label: "Active",
            backgroundColor: "rgba(0,38,87,1)",
            borderWidth: 2,
            data: dailyData.map(d => d.totalRecovered)
          }
        ]
      });
    }
  }, [dailyData]);
  const options = {
    titleText: "Total covid-19 active",
    xAxesLabel: "",
    yAxesLabel: "Casulties"
  };

  return (
    <div style={{ position: "relative" }}>
      <LineChart data={data} options={options} chartType="bar" />
    </div>
  );
}
