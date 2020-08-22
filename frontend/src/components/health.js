import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PerfectWeight from "./weight";
import Slider from "react-rangeslider";
import Navbar from "./navbar";
import CreatableSelect from "react-select/creatable";
const opts = [
  { value: "female", label: "female" },
  { value: "male", label: "male" }
];

class Health extends Component {
  state = {
    gender: "",
    height: "",
    weight: "79",
    age: "",
    perfectWeight: [],
    bmi: {},

    showGraph: false
  };
  handleChangeHorizontal = value => {
    this.setState({
      horizontal: value
    });
  };
  handleChange3 = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({
      gender: newValue.value
    });
  };
  handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
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
    console.log("Gender", this.state.gender);
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
    // console.log(res1.data);
    this.setState({
      perfectWeight: res2.data,
      bmi: res1.data,
      showGraph: true
    });
  };

  render() {
    {
      console.log(this.state.bmi);
    }

    const { horizontal } = this.state;
    const horizontalLabels = {
      0: "Short",
      50: "Medium",
      100: "Tall"
    };

    const formatcm = value => value + " cm";
    return (
      <div>
        <Navbar />
        <h1>Ideal Weight Calculator</h1>
        <p>
          If you are really concerned about your health or your looks and want
          to know how much you should weigh, this ideal weight calculator is the
          tool for you. It will help you determine your ideal body weight based
          on your height and sex. Read on to learn the different formulas for
          calculating your IBW (ideal body weight) and how to interpret the
          results
        </p>
        <form className="form1" onSubmit={this.getInfo}>
          <div id="sex">
            <label>Gender</label>
            <CreatableSelect
              isClearable
              onChange={this.handleChange3}
              onInputChange={this.handleInputChange}
              options={opts}
            />
          </div>
          <div id="height">
            <label>Height</label>
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
          </div>
          <div id="weight">
            <label>Weight</label>
            <input
              id="typeinp"
              type="range"
              min="20"
              max="150"
              name="weight"
              onChange={this.handleChange}
              step="1"
            />
            {this.state.weight} kg
          </div>
          <div id="age">
            <label>Age</label>
            <input
              placeholder="25"
              onChange={this.handleChange}
              type="text"
              name="age"
            />
          </div>
          <br />
          <button className="submit" type="submit">
            Calculate
          </button>
        </form>
        {this.state.showGraph ? (
          <div>
            <p>
              Your body mass index (BMI):{" "}
              <strong>{this.state.bmi?.bmi?.toFixed(1)}</strong>(
              {this.state.bmi?.health})
            </p>
            <PerfectWeight
              data={this.getRatingData()}
              title="Perfect weight in kg"
            />
          </div>
        ) : (
          ""
        )}
        <h2>Formulas for Finding the Ideal Weight</h2>
        <div>
          <h3>G. J. Hamwi Formula (1964)</h3>
          <p>
            <p>Male: 48.0 kg + 2.7 kg per inch over 5 feet</p>
            <p>Female: 45.5 kg + 2.2 kg per inch over 5 feet</p> Invented for
            medicinal dosage purposes
          </p>
        </div>
        <div>
          <h3>B. J. Devine Formula (1974)</h3>
          <p>
            <p>Male: 50.0 kg + 2.3 kg per inch over 5 feet</p>
            <p>Female: 45.5 kg + 2.3 kg per inch over 5 feet</p> Similar to the
            Hamwi Formula, it was originally intended as a basis for medicinal
            dosages based on weight and height. Over time, the formula became a
            universal determinant of IBW
          </p>
          <div>
            <h3>D. R. Miller Formula (1983)</h3>
            <p>
              <p>Male: 56.2 kg + 1.41 kg per inch over 5 feet</p>
              <p>Female: 53.1 kg + 1.36 kg per inch over 5 feet</p> Modification
              of the Devine Formula
            </p>
          </div>
          <div>
            <h3>J. D. Robinson Formula (1983)</h3>
            <p>
              <p>Male: 52 kg + 1.9 kg per inch over 5 feet</p>{" "}
              <p>Female: 49 kg + 1.7 kg per inch over 5 feet</p> Modification of
              the Devine Formula
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Health;
