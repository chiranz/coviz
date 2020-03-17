import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_GROSS_DATA, CHANGE_COUNTRY_CODE } from "../actions/types";
import { getActiveCases } from "../utils";

export default function SelectField() {
  const countries = useSelector(state => state.countryCodes.countries);

  const countryCodes = useSelector(state => state.countryCodes.iso3);
  const [countryCode, setCountryCode] = useState("world");
  const dispatch = useDispatch();

  useEffect(() => {
    if (countryCode !== "world") {
      Axios.get(
        `https://covid19.mathdro.id/api/countries/${countryCodes[countryCode]}`
      )
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
    }
  }, [dispatch, countryCode, countryCodes]);
  const handleChange = e => {
    const { value } = e.target;
    setCountryCode(value);
    let country;
    if (value !== "world") {
      [country] = Object.entries(countries).find(([_, code]) => code === value);
    } else {
      country = "World";
    }

    dispatch({
      type: CHANGE_COUNTRY_CODE,
      payload: country
    });
  };
  return (
    <FormGroup>
      <Label for="country">Filter By Country</Label>
      <Input
        type="select"
        name="country"
        id="country"
        defaultValue={countryCode}
        onChange={handleChange}
      >
        <option value="world">World</option>
        {countries &&
          Object.entries(countries).map(([country, code], i) => (
            <option datacountry={country} key={i} value={code}>
              {country}
            </option>
          ))}
      </Input>
    </FormGroup>
  );
}
