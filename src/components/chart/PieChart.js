import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-labels";
import { useSelector } from "react-redux";

export default function PieChart() {
  const { casulties, country } = useSelector(state => state.data);
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
            backgroundColor: ["#0d2c54", "#f6511d", "#7fb800"],
            borderColor: "white",
            hoverBorderColor: ["#0d2c54", "#f6511d", "#7fb800"],
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
            rotation: Math.PI * 1,
            plugins: {
              labels: [
                {
                  render: "label",
                  fontColor: "#000",
                  fontSize: "14",
                  position: "outside"
                },
                {
                  render: "percentage",
                  fontSize: "12",
                  fontStyle: "bold",
                  fontColor: "#fff"
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
}
