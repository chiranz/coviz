import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import { baseUrl } from "./api";
import PieChart from "./components/PieChart";
import SelectField from "./components/SelectField";
import { FETCH_GROSS_DATA } from "./actions/types";
import LineChart from "./components/LineChart";

function App() {
  const { casulties } = useSelector(state => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get(baseUrl)
      .then(response => {
        if (response.status === 200) {
          const data = [
            { label: "Confirmed", value: response.data.confirmed.value },
            { label: "Deaths", value: response.data.deaths.value },
            { label: "Recovered", value: response.data.recovered.value }
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
  }, [dispatch]);
  return (
    <>
      <Header />

      <div className="container ">
        <SelectField />
        <PieChart data={casulties} />
        <LineChart />
      </div>
    </>
  );
}

export default App;
