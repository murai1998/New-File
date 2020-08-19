import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PerfectWeight from "./weight";
import Slider from "react-rangeslider";

class Health extends Component {
  state = {
    gender: "",
    height: "",
    weight: "79",
    age: "",
    perfectWeight: [],
    horizontal: 10
  };
  handleChangeHorizontal = value => {
    this.setState({
      horizontal: value
    });
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
        weight: this.state.perfectWeight?.Devine?.toFixed(1)
      },
      {
        name: "Hamwi",

        weight: this.state.perfectWeight?.Hamwi?.toFixed(1)
      },
      {
        name: "My weight",
        weight: this.state.weight
      },
      {
        name: "Miller",

        weight: this.state.perfectWeight?.Miller?.toFixed(1)
      },
      {
        name: "Robinson",

        weight: this.state.perfectWeight?.Robinson?.toFixed(1)
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
    const { horizontal } = this.state;
    const horizontalLabels = {
      0: "Short",
      50: "Medium",
      100: "Tall"
    };

    const formatcm = value => value + " cm";
    return (
      <div>
        <h1>Ideal Weight Calculator</h1>
        <form onSubmit={this.getInfo}>
          <label>Gender</label>
          <select onChange={this.handleChange} type="text">
            <option name="female" value="female">
              Female
            </option>
            <option name="male" value="male">
              Male
            </option>
          </select>
          <label>Height</label>
          {/* <input
            placeholder="170"
            onChange={this.handleChange}
            type="text"
            name="height"
          /> */}
          <input
            id="typeinp"
            type="range"
            min="100"
            max="250"
            name="height"
            onChange={this.handleChange}
            step="1"
          />
          {this.state.height} cm
          <label>Weight in kg</label>
          <input
            placeholder="89 "
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
        <PerfectWeight
          data={this.getRatingData()}
          title="Perfect weight in kg"
        />
      </div>
    );
  }
}

export default Health;
