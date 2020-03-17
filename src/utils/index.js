import Axios from "axios";

export const getGrossData = url => {
  Axios.get(url)
    .then(response => {
      if (response.status === 200) {
        const data = [
          { label: "Confirmed", value: response.data.confirmed.value },
          { label: "Deaths", value: response.data.deaths.value },
          { label: "Recovered", value: response.data.recovered.value }
        ];
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

export const getMonthByName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const getMonthAndDate = timestamp => {
  const monthAndDate = new Date(timestamp);
  return getMonthByName[monthAndDate.getMonth()] + " " + monthAndDate.getDate();
};

export const getActiveCases = data => {
  return data.confirmed.value - data.recovered.value - data.deaths.value;
};
