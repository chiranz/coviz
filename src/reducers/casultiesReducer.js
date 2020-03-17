import { FETCH_GROSS_DATA, FETCH_DAILY_DATA } from "../actions/types";
const initialState = [];

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
    default:
      return state;
  }
}
