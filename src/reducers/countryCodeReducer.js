import { FETCH_COUNTRIES_AND_CODES } from "../actions/types";
const initialState = {};

export default function countryCodeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTRIES_AND_CODES:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
