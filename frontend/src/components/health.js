import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Health extends Component {
  state = {
    gender: "",
    height: "",
    weight: "",
    age: ""
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getInfo = async e => {
    e.preventDefault();
    let res1 = await axios({
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/bmi",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
        "x-rapidapi-key": "e14d7b4a61mshaf4d68517150093p1d2b11jsnaa5e4d29c6bc",
        useQueryString: true
      },
      params: {
        age: this.state.age,
        height: this.state.height,
        weight: this.state.weight
      }
    });

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
    console.log(res1, res2);
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
      </div>
    );
  }
}

export default Health;
