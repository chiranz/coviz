import React from "react";
import { useSpring, animated } from "react-spring";

export default function Card({ label, value, totalCases }) {
  const dataVal = useSpring({
    from: {
      number: 0
    },
    to: {
      number: value
    }
  });
  const dataPercent = useSpring({
    from: {
      number: 0
    },
    to: {
      number: Math.round((value / totalCases) * 100)
    }
  });
  const scaleCount = useSpring({
    from: {
      fontSize: "10px"
    },
    to: {
      fontSize: "30px"
    }
  });
  const scalePercent = useSpring({
    from: {
      fontSize: "5px"
    },
    to: {
      fontSize: "15px"
    }
  });
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card text-center">
        <div className="card-header">
          <h5 style={{ margin: 0, padding: 0 }} className="text-muted">
            {label}
          </h5>
        </div>
        <animated.h4 style={scaleCount}>
          {dataVal.number.interpolate(number => Math.floor(number))}
        </animated.h4>
        <animated.span style={scalePercent} className="text-muted">
          {dataPercent.number.interpolate(number => +Math.floor(number) + "%")}
        </animated.span>
      </div>
    </div>
  );
}
