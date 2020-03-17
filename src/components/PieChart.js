import React, { useRef, useEffect } from "react";
import { select, scaleOrdinal, entries, pie, arc } from "d3";

const width = 400;
const height = 400;
const radius = Math.min(height, width) / 2;

export default function PieChart({ data }) {
  const svgRef = useRef();
  useEffect(() => {
    if (data) {
      const svg = select(svgRef.current);
      const color = scaleOrdinal()
        .domain(data)
        .range(["green", "#dedede", "red"]);
      const myPie = pie().value(d => d.value.value);
      const dataReady = myPie(entries(data));
      const arcGenerator = arc()
        .innerRadius(0)
        .outerRadius(radius);
      const g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      g.selectAll("slices")
        .data(dataReady)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.value.value))
        .attr("stroke", "#fff")
        .style("stroke-width", "2px")
        .style("opacity", 0.9);
    }
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem auto"
      }}
    >
      <svg height={height} width={width} ref={svgRef}></svg>
    </div>
  );
}
