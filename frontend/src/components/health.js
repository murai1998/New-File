import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PerfectWeight from "./weight";

class Health extends Component {
  state = {
    gender: "",
    height: "",
    weight: "79",
    age: "",
    perfectWeight: []
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  getRatingData = () => {
    let data = [
      {
        name: "Devine",
        x: "Devine",
        "Perfect Weight": this.state.perfectWeight?.Devine?.toFixed(1)
      },
      {
        name: "Hamwi",
        x: "Hamwi",
        "Perfect Weight": this.state.perfectWeight?.Hamwi?.toFixed(1)
      },
      {
        name: "My weight",
        x: "Weight",
        "My weight": this.state.weight
      },
      {
        name: "Miller",
        x: "Miller",
        "Perfect Weight": this.state.perfectWeight?.Miller?.toFixed(1)
      },
      {
        name: "Robinson",
        x: "Robinson",
        "Perfect Weight": this.state.perfectWeight?.Robinson?.toFixed(1)
      }
    ];
    return data;
  };
  getInfo = async e => {
    e.preventDefault();
    // let res1 = await axios({
    //   method: "GET",
    //   url: "https://fitness-calculator.p.rapidapi.com/bmi",
    //   headers: {
    //     "content-type": "application/octet-stream",
    //     "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
    //     "x-rapidapi-key": "e14d7b4a61mshaf4d68517150093p1d2b11jsnaa5e4d29c6bc",
    //     useQueryString: true
    //   },
    //   params: {
    //     age: this.state.age,
    //     height: this.state.height,
    //     weight: this.state.weight
    //   }
    // });

    let res2 = await axios({
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/idealweight",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
        "x-rapidapi-key": "e14d7b4a61mshaf4d68517150093p1d2b11jsnaa5e4d29c6bc",
        useQueryString: true
      },
      params: {
        weight: this.state.weight,
        gender: this.state.gender,
        height: this.state.height
      }
    });
    console.log(res2.data);
    this.setState({
      perfectWeight: res2.data
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.getInfo}>
          <label>Body Health Chart</label>
          <input
            placeholder="Gender"
            onChange={this.handleChange}
            type="text"
            name="gender"
          />

          <label>height</label>
          <input
            placeholder="170cm"
            onChange={this.handleChange}
            type="text"
            name="height"
          />
          <label>Weight</label>
          <input
            placeholder="89kg"
            onChange={this.handleChange}
            type="text"
            name="weight"
          />
          <label>Age</label>
          <input
            placeholder="25"
            onChange={this.handleChange}
            type="text"
            name="age"
          />
          <br />
          <button className="submit" type="submit">
            Calculate
          </button>
        </form>
        <PerfectWeight data={this.getRatingData()} title="Perfect weight" />
      </div>
    );
  }
}

export default Health;
