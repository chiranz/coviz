import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMonthAndDate } from "../../utils";
import LineChart from "./DynamicChart";

export default function CasultiesDelta() {
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
            label: "Daily Casulties",
            backgroundColor: "rgba(246, 81, 29,1)",
            borderWidth: 2,
            data: dailyData.map(d => d.deltaConfirmed)
          }
        ]
      });
    }
  }, [dailyData]);
  const options = {
    titleText: "Covid19 Daily Cases",
    xAxesLabel: "",
    yAxesLabel: "Daily casulties"
  };

  return (
    <div style={{ position: "relative" }}>
      <LineChart data={data} options={options} chartType="bar" />
    </div>
  );
}
