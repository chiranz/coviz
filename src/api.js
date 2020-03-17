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
