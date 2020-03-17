import { combineReducers } from "redux";

import data from "./casultiesReducer";
import countryCodes from "./countryCodeReducer";

export default combineReducers({
  data,
  countryCodes
});
