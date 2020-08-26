import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./changingprovider";
import Navbar from "./navbar";

import { Link } from "react-router-dom";

class Circle extends Component {
  render() {
    console.log("Proooop", this.props.match.params.results);
    let perc = Number(this.props?.match?.params?.results);
    // let perc = 78;
    return (
      <div>
        {/* <Link to={`/create/${this.props.match.params.weight}`}>Go Back</Link> */}
        <Navbar />
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
