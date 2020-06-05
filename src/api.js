import Axios from "axios";
import { getActiveCases } from "./utils";

export const baseUrl = "https://covid19.mathdro.id/api";

export const getCountryUrls = countryCode => {
  const urls = [
    {
      name: "Confirmed",
      url: `${baseUrl}/countries/${countryCode}/confirmed`
    },
    {
      name: "Recovered",
      url: `${baseUrl}/countries/${countryCode}/recovered`
    },
    {
      name: "Deaths",
      url: `${baseUrl}/countries/${countryCode}/deaths`
    }
  ];
  return urls;
};

export const dailyUrl = `${baseUrl}/daily`;
export const deathsUrl = `${baseUrl}/deaths`;

class APIService {
  async loadGrossData() {
    const response = await Axios.get(baseUrl);
    if (response.status === 200) {
      return [
        { label: "Active", value: getActiveCases(response.data) },
        { label: "Deaths", value: response.data.deaths.value },
        { label: "Recovered", value: response.data.recovered.value }
      ];
    } else {
      throw new Error({ status: response.status, error: response.statusText });
    }
  }
  async getDailyData() {
    const response = await Axios.get(dailyUrl);
    return response.data.map(d => {
      return {
        totalConfirmed: d.totalConfirmed,
        reportDate: d.reportDate,
        totalRecovered: d.totalRecovered
      };
    });
  }
  async getCountryCode() {
    const response = await Axios.get(baseUrl + "/countries");
    return response.data;
  }
}

export default new APIService();
