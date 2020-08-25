import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./changingprovider";

class Circle extends Component {
  render() {
    console.log("Proooop", this.props.match.params.results);
    let perc = Number(this.props?.match?.params?.results);
    // let perc = 78;
    return (
      <div>
        <div style={{ width: "400px" }}>
          <ChangingProgressProvider values={[...Array(perc).keys()]}>
            {perc => <CircularProgressbar value={perc} text={`${perc + 1}%`} />}
          </ChangingProgressProvider>
        </div>
      </div>
    );
  }
}

export default Circle;
