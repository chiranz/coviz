import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMonthAndDate } from "../../utils";
import LineChart from "./DynamicChart";

export default function CasultiesChart() {
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
            backgroundColor: "rgba(246, 81, 29,1)",
            borderWidth: 2,
            data: dailyData.map(d => d.totalConfirmed)
          }
        ]
      });
    }
  }, [dailyData]);
  const options = {
    titleText: "Total covid-19 cases",
    xAxesLabel: "",
    yAxesLabel: "Total casulties"
  };

  return (
    <div style={{ position: "relative" }}>
      <LineChart data={data} options={options} chartType="bar" />
    </div>
  );
}
