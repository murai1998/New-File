import React from "react";
import {
  BarChart,
  LabelList,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const PerfectWeight = props => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0",
        margin: 0
      }}
    >
      <strong>{props.title}</strong>
      <BarChart width={500} height={300} data={props.data} margin="auto">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="My weight" fill="royalblue">
          {/* <LabelList dataKey="name" position="insideTop" angle="45" /> */}
        </Bar>
      </BarChart>
    </div>
  );
};

export default PerfectWeight;
