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
        <XAxis dataKey="name" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="weight">
          {props.data.map((entry, index) => {
            console.log(entry.name);
            return entry.name == "My weight" ? (
              <Cell fill="#4e1ba8" />
            ) : (
              <Cell fill="#c0a6ee" />
            );
          })}
        </Bar>
        {/* <Bar dataKey="My weight" fill="royalblue" /> */}
      </BarChart>
    </div>
  );
};

export default PerfectWeight;
