import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import { baseUrl, dailyUrl } from "./api";
import SelectField from "./components/SelectField";
import {
  FETCH_GROSS_DATA,
  FETCH_DAILY_DATA,
  FETCH_COUNTRIES_AND_CODES
} from "./actions/types";
import LineChart from "./components/chart/LineChart";
import PieChart from "./components/chart/PieChart";
import { getActiveCases } from "./utils";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get(baseUrl)
      .then(response => {
        if (response.status === 200) {
          const data = [
            { label: "Active", value: response.data.confirmed.value },
            { label: "Deaths", value: response.data.deaths.value },
            { label: "Recovered", value: getActiveCases(response.data) }
          ];
          dispatch({
            type: FETCH_GROSS_DATA,
            payload: data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    Axios.get(dailyUrl)
      .then(response => {
        const { data } = response;
        const totalData = data.map(d => {
          return {
            totalConfirmed: d.totalConfirmed,
            reportDate: d.reportDate,
            totalRecovered: d.totalRecovered
          };
        });
        dispatch({
          type: FETCH_DAILY_DATA,
          payload: totalData
        });
      })
      .catch(err => console.log(err));
    Axios.get("https://covid19.mathdro.id/api/countries")
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: FETCH_COUNTRIES_AND_CODES,
            payload: response.data
          });
        }
      })
      .catch(err => console.log(err));
  }, [dispatch]);

  return (
    <>
      <Header />

      <div className="container ">
        <div style={{ maxHeight: "500px", maxWidth: "500px" }}>
          <SelectField />
          <PieChart />
        </div>
        <LineChart />
      </div>
    </>
  );
}

export default App;
