import React, { useRef, useEffect } from "react";
import Axios from "axios";
import { useResizeObserver } from "../hooks/resizeObserver";
import { dialyUrl } from "../api";
import { getMonthByName } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_DAILY_DATA } from "../actions/types";
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  axisBottom,
  scaleTime,
  axisLeft
} from "d3";

export default function LineChart() {
  const { data } = useSelector(state => state);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    Axios.get(dialyUrl)
      .then(response => {
        const { data } = response;
        const totalData = data.map(d => {
          return {
            totalConfirmed: d.totalConfirmed,
            reportDate: d.reportDate,
            totalRecovered: d.totalRecovered
          };
        });
        dispatch({
          type: FETCH_DAILY_DATA,
          payload: totalData
        });
      })
      .catch(err => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    const { dailyData } = data;
    if (!dimensions) return;

    if (dailyData) {
      const totalConfirmed = dailyData.map(d => d.totalConfirmed);
      const totalRecovered = dailyData.map(d => d.totalRecovered);
      const reportDate = dailyData.map(d => d.reportDate);
      const startDate = new Date(reportDate[0]);
      const endDate = new Date(reportDate[reportDate.length - 1]);
      const totalConfirmedCount = totalConfirmed[totalConfirmed.length - 1];

      const svg = select(svgRef.current);
      const xAxisScale = scaleTime()
        .domain([startDate, endDate])
        .range([0, dimensions.width]); // Needs to change
      const xScale = scaleLinear()
        .domain([0, totalConfirmed.length - 1])
        .range([0, dimensions.width]); // Needs to change

      const yScale = scaleLinear()
        .domain([0, totalConfirmedCount + 20000])
        .range([dimensions.height, 0]);
      const xAxis = axisBottom(xAxisScale).tickFormat(
        d => getMonthByName[d.getMonth()] + " " + d.getDate()
      );
      const yAxis = axisLeft(yScale).tickFormat(d => d / 1000 + "k");
      const confirmedLine = line()
        .x((_, i) => xScale(i))
        .y(yScale)
        .curve(curveCardinal);
      svg
        .selectAll("path")
        .data([totalConfirmed])
        .join("path")
        .attr("d", confirmedLine)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", "3px");
      svg
        .append("g")
        .selectAll("path")
        .data([totalRecovered])
        .join("path")
        .attr("d", value => confirmedLine(value))
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", "3px");
      svg
        .append("g")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);
      svg.append("g").call(yAxis);
    }
  }, [data, dimensions]);

  return (
    <div
      style={{
        margin: "3rem 0"
      }}
      ref={wrapperRef}
    >
      <svg
        style={{
          overflow: "visible",
          background: "#eeeeee"
        }}
        height={`400px`}
        width="100%"
        ref={svgRef}
      ></svg>
    </div>
  );
}
