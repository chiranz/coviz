import Axios from "axios";
import { dailyUrl, baseUrl } from "../api";
import {
  FETCH_DAILY_DATA,
  FETCH_COUNTRIES_AND_CODES,
  FETCH_GROSS_DATA,
  FETCHING_DATA
} from "./types";
import { getActiveCases } from "../utils";

// Fetch Daily Data
export const fetchDailyData = () => async dispatch => {
  dispatch({ type: FETCHING_DATA });
  await Axios.get(dailyUrl)
    .then(response => {
      const { data } = response;
      const totalData = data.map(d => {
        return {
          totalConfirmed: d.totalConfirmed,
          reportDate: d.reportDate,
          totalRecovered: d.totalRecovered,
          deltaConfirmed: d.deltaConfirmed,
          totalDeath: d.deaths.total,
          deltaRecovered: d.deltaRecovered
        };
      });
      dispatch({
        type: FETCH_DAILY_DATA,
        payload: totalData
      });
    })
    .catch(err => console.log(err));
};

// FetchCountryWithCodes
export const fetchCountryWithCodes = () => async dispatch => {
  await Axios.get("https://covid19.mathdro.id/api/countries")
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: FETCH_COUNTRIES_AND_CODES,
          payload: response.data
        });
      }
    })
    .catch(err => console.log(err));
};

// FETCH BASE DATA
export const fetchBaseData = () => async dispatch => {
  await Axios.get(baseUrl)
    .then(response => {
      if (response.status === 200) {
        const data = [
          { label: "Active", value: getActiveCases(response.data) },
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
};
