import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardItem from "./CardItem";

export default function Card() {
  const casulties = useSelector(state => state.data.casulties);
  const [totalCases, setTotalCases] = useState(null);
  useEffect(() => {
    if (casulties) {
      const totalCases = casulties.reduce((sum, d) => sum + d.value, 0);
      setTotalCases(totalCases);
    }
  }, [casulties, totalCases]);

  return (
    <div className="row my-3">
      {casulties &&
        casulties.map((d, i) => (
          <CardItem
            key={i}
            label={d.label}
            value={d.value}
            totalCases={totalCases}
          />
        ))}
    </div>
  );
}
