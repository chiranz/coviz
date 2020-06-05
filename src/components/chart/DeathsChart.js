import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMonthAndDate, axiosAuthHelper } from "../../utils";
import DynamicChart from "./DynamicChart";
import Axios from "axios";

export default function DeathsChart() {
  const { dailyData } = useSelector(state => state.data);
  const constantsUrl =
    "https://api.github.com/repos/CSSEGISandData/COVID-19/contents/";
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  const [paths, setPaths] = useState([]);

  useEffect(() => {
    if (dailyData) {
      setData({
        labels: dailyData.map(d => getMonthAndDate(d.reportDate)),
        datasets: [
          {
            label: "Total Deaths",
            backgroundColor: "rgba(246, 81, 29,1)",
            borderWidth: 2,
            data: dailyData.map(d => d.totalDeath)
          }
        ]
      });
    }
  }, [dailyData]);
  useEffect(() => {
    async function getCsvData() {
      const response = await Axios(
        axiosAuthHelper({
          url: `${constantsUrl}csse_covid_19_data/csse_covid_19_time_series?ref=master`,
          method: "get"
        })
      );
      let paths = [];
      response.data.forEach(obj => {
        if (obj.name.includes("time_series_19-covid")) {
          paths.push(obj.path);
        }
      });
      setPaths(paths);
    }
    getCsvData();
  }, []);

  useEffect(() => {
    async function getDeathcsv() {
      if (paths[1]) {
        const response = await Axios(
          axiosAuthHelper({ url: constantsUrl + paths[1], method: "get" })
        );
        console.log(JSON.stringify(response.data.content, null, 2));
      }
    }
    getDeathcsv();
  }, [paths]);

  const options = {
    titleText: "Total covid-19 deaths",
    xAxesLabel: "",
    yAxesLabel: "Total Deaths"
  };

  return (
    <div style={{ position: "relative" }}>
      <DynamicChart data={data} options={options} chartType="bar" />
    </div>
  );
}
