// Package Imports
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader";

// Local Imports
import Header from "./components/Header";
import SelectField from "./components/SelectField";
import PieChart from "./components/chart/PieChart";
import CasultiesChart from "./components/chart/CasultiesChart";
import RecoveredChart from "./components/chart/RecoveredChart";
import DeathsChart from "./components/chart/DeathsChart";
import Card from "./components/CardContainer";
import CasultiesDelta from "./components/chart/CasultiesDelta";
import RecoveredDelta from "./components/chart/RecoveredDelta";
import {
  fetchBaseData,
  fetchDailyData,
  fetchCountryWithCodes
} from "./actions";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchBaseData());
    dispatch(fetchCountryWithCodes());
    dispatch(fetchDailyData());
  }, [dispatch]);

  return (
    <>
      <Loader loaded={!loading}>
        <Header />

        <div className="row">
          <div className="col col-lg-6">
            <CasultiesChart />
          </div>
          <div className="col col-lg-6">
            <RecoveredChart />
          </div>
          <div className="col col-lg-6">
            <DeathsChart />
          </div>
          <div className="col col-lg-6">
            <CasultiesDelta />
          </div>
          <div className="col col-lg-6">
            <RecoveredDelta />
          </div>
        </div>
        <div className="container ">
          <Card />
          <div style={{ maxHeight: "500px", maxWidth: "500px" }}>
            <SelectField />
            <PieChart />
          </div>
        </div>
      </Loader>
    </>
  );
}

export default App;
