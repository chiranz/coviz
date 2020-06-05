import React from "react";
import { Line, Bar } from "react-chartjs-2";

export default function DynamicChart({ data, options, chartType }) {
  const Chart =
    chartType === "line" || window.innerWidth < "600px" ? Line : Bar;
  return (
    <div style={{ position: "relative" }}>
      <Chart
        data={data}
        options={{
          responsive: true,
          title: {
            text: options.titleText,
            fontSize: 25,
            display: true
          },
          plugins: {
            labels: []
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  fontSize: 15,
                  labelString: options.xAxesLabel
                },
                gridLines: {
                  display: false
                },
                stacked: true
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  fontSize: 15,
                  labelString: options.yAxesLabel
                },
                stacked: true
              }
            ]
          }
        }}
      />
    </div>
  );
}
