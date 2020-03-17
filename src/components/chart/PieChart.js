import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

export default function PieChart() {
  const { casulties } = useSelector(state => state.data);
  const { country } = useSelector(state => state.data);
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });
  useEffect(() => {
    if (casulties) {
      setData({
        labels: casulties.map(d => d.label),
        datasets: [
          {
            label: "casulties",
            backgroundColor: ["yellow", "red", "green"],
            borderColor: "white",
            hoverBorderColor: ["yellow", "red", "green"],
            borderWidth: 2,
            data: casulties.map(d => d.value)
          }
        ]
      });
    }
  }, [casulties]);
  return (
    <div className="card text-center">
      <div className="card-header">
        <h3>{country}</h3>
      </div>
      <div style={{ position: "relative" }}>
        <Doughnut
          data={data}
          options={{
            responsive: true,
            animation: { animateScale: true },
            cutoutPercentage: 60
          }}
        />
      </div>
    </div>
  );
}
