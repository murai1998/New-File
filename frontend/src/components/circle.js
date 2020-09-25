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
      <div id="mainCrcle">
        {/* <Link to={`/create/${this.props.match.params.weight}`}>Go Back</Link> */}
        <Navbar />
        <section className="signup-section4">
          <div className="circleALl">
            {perc >= 100 ? <div> You rocked it!</div> : <div>''</div>}
            <ChangingProgressProvider
              // id="provider"
              strokeWidth={8}
              styles={buildStyles({
                pathColor: "#f00",
                trailColor: "red"
              })}
              values={[...Array(perc).keys()]}
            >
              {perc => (
                <div style={{ width: "84%" }}>
                  <CircularProgressbar
                    value={perc}
                    text={`${perc + 1}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      strokeLinecap: "#658fbb",
                      backgroundColor: "red",

                      textColor: "#658fbb",
                      pathColor: "#658fbb",
                      trailColor: "white"
                    })}
                  />
                </div>
              )}
            </ChangingProgressProvider>
          </div>
        </section>
      </div>
    );
  }
}

export default Circle;
