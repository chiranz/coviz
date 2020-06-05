import {
  FETCH_GROSS_DATA,
  FETCH_DAILY_DATA,
  CHANGE_COUNTRY_CODE,
  FETCHING_DATA
} from "../actions/types";
const initialState = {
  country: "World",
  loading: false
};

export default function grossDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        loading: true
      };
    case FETCH_GROSS_DATA:
      return {
        ...state,
        casulties: action.payload
      };
    case FETCH_DAILY_DATA:
      return {
        ...state,
        dailyData: action.payload,
        loading: false
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
