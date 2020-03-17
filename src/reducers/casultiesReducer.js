import {
  FETCH_GROSS_DATA,
  FETCH_DAILY_DATA,
  CHANGE_COUNTRY_CODE
} from "../actions/types";
const initialState = {
  country: "World"
};

export default function grossDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GROSS_DATA:
      return {
        ...state,
        casulties: action.payload
      };
    case FETCH_DAILY_DATA:
      return {
        ...state,
        dailyData: action.payload
      };
    case CHANGE_COUNTRY_CODE:
      return {
        ...state,
        country: action.payload
      };
    default:
      return state;
  }
}
