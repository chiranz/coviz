import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { FETCH_GROSS_DATA } from "../actions/types";

export default function SelectField() {
  const [countries, setCountries] = useState([]);
  const [countryCodes, setCountryCodes] = useState({});
  const [countryCode, setCountryCode] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get("https://covid19.mathdro.id/api/countries")
      .then(response => {
        if (response.status === 200) {
          setCountries(Object.entries(response.data.countries));
          setCountryCodes(response.data.iso3);
        }
      })
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    if (countryCode) {
      Axios.get(
        `https://covid19.mathdro.id/api/countries/${countryCodes[countryCode]}`
      )
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
    }
  }, [dispatch, countryCode, countryCodes]);

  return (
    <FormGroup>
      <Label for="country">Filter By Country</Label>
      <Input
        type="select"
        name="country"
        id="country"
        onChange={e => setCountryCode(e.target.value)}
      >
        {countries &&
          countries.map(([country, code], i) => (
            <option key={i} value={code}>
              {country}
            </option>
          ))}
      </Input>
    </FormGroup>
  );
}
