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
    gender: "female",
    height: "",
    weight: "79",
    age: "",
    perfectWeight: [],
    bmi: {},
    showForm: true,
    showGraph: false
  };
  handleChangeHorizontal = value => {
    this.setState({
      horizontal: value
    });
  };
  next = e => {
    this.setState({
      showForm: false
    });
  };
  male = e => {
    this.setState({
      gender: "male"
    });
  };
  female = e => {
    this.setState({
      gender: "female"
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
        <div id="weightPage2">
          {this.state.showForm ? (
            <div className="idealWeight">
              <h1>Ideal Weight Calculator</h1>
              <div className="calcP">
                <p>
                  <img
                    id="checkM"
                    class="img-fluid"
                    src={require("../images/clipart289619.png")}
                    alt=""
                  />
                  {"    "}
                  If you are really concerned about your health and want to know
                  how much you should weigh? This ideal weight calculator is the
                  tool for you.
                </p>
                <p id="p11">
                  <img
                    id="checkM"
                    class="img-fluid"
                    src={require("../images/clipart289619.png")}
                    alt=""
                  />{" "}
                  {"    "}
                  It will help you determine your ideal body weight based on
                  your height and sex.
                </p>
                <p id="p12">
                  <img
                    id="checkM"
                    class="img-fluid"
                    src={require("../images/clipart289619.png")}
                    alt=""
                  />
                  {"    "}
                  Read on to learn the different formulas for calculating your
                  IBW (ideal body weight) and how to interpret the results
                </p>
              </div>
              <h2 class="formh2">Formulas</h2>
              <div className="formulas">
                <div className="formulas2">
                  <h3 style={{ color: "#29c9de" }}>G. J. Hamwi</h3>
                  <p>
                    <p>Male: 48.0 kg + 2.7 kg per inch over 5 feet</p>
                    <p>Female: 45.5 kg + 2.2 kg per inch over 5 feet</p>
                  </p>
                </div>
                <div className="formulas2">
                  <h3 style={{ color: "#51b356" }}>B. J. Devine</h3>
                  <p>
                    <p>Male: 50.0 kg + 2.3 kg per inch over 5 feet</p>
                    <p>Female: 45.5 kg + 2.3 kg per inch over 5 feet</p>
                  </p>
                </div>
                <div className="formulas2">
                  <h3 style={{ color: "#fbe850" }}>D. R. Miller</h3>
                  <p>
                    <p>Male: 56.2 kg + 1.41 kg per inch over 5 feet</p>
                    <p>Female: 53.1 kg + 1.36 kg per inch over 5 feet</p>{" "}
                  </p>
                </div>
                <div className="formulas2">
                  <h3 style={{ color: "#f9c77d" }}>J. D. Robinson</h3>
                  <p>
                    <p>Male: 52 kg + 1.9 kg per inch over 5 feet</p>{" "}
                    <p>Female: 49 kg + 1.7 kg per inch over 5 feet</p>{" "}
                  </p>
                </div>
              </div>
              <button className="btn btn-primary" onClick={this.next}>
                Next >>
              </button>
            </div>
          ) : (
            <div>
              <div className="idealWeight" id="calculWeight">
                <form className="form1" onSubmit={this.getInfo}>
                  <div id="sex">
                    <label>Gender:</label>
                    {/* <CreatableSelect
                      isClearable
                      onChange={this.handleChange3}
                      onInputChange={this.handleInputChange}
                      options={opts}
                    /> */}{" "}
                    {"    "}
                    <p
                      className={
                        this.state.gender == "female" ? "gender" : null
                      }
                      onClick={this.female}
                    >
                      female
                    </p>
                    <p
                      className={this.state.gender == "male" ? "gender" : null}
                      onClick={this.male}
                      onClick={this.male}
                    >
                      male
                    </p>
                  </div>
                  <div id="height">
                    <label>Height:</label>
                    <input
                      type="text"
                      name="height"
                      onChange={this.handleChange}
                      className="params"
                    />
                    {this.state.height} cm
                  </div>
                  <div id="weight">
                    <label>Weight</label>
                    <input
                      type="text"
                      name="weight"
                      onChange={this.handleChange}
                      className="params"
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
                      className="params"
                    />
                  </div>
                  <br />
                  <button className="submit" type="submit">
                    Calculate
                  </button>
                </form>
                <h2 class="formh2">Formulas</h2>
                <div className="formulas">
                  <div className="formulas2">
                    <h3 style={{ color: "#29c9de" }}>G. J. Hamwi</h3>
                    <p>
                      <p>Male: 48.0 kg + 2.7 kg per inch over 5 feet</p>
                      <p>Female: 45.5 kg + 2.2 kg per inch over 5 feet</p>
                    </p>
                  </div>
                  <div className="formulas2">
                    <h3 style={{ color: "#51b356" }}>B. J. Devine</h3>
                    <p>
                      <p>Male: 50.0 kg + 2.3 kg per inch over 5 feet</p>
                      <p>Female: 45.5 kg + 2.3 kg per inch over 5 feet</p>
                    </p>
                  </div>
                  <div className="formulas2">
                    <h3 style={{ color: "#fbe850" }}>D. R. Miller</h3>
                    <p>
                      <p>Male: 56.2 kg + 1.41 kg per inch over 5 feet</p>
                      <p>Female: 53.1 kg + 1.36 kg per inch over 5 feet</p>{" "}
                    </p>
                  </div>
                  <div className="formulas2">
                    <h3 style={{ color: "#f9c77d" }}>J. D. Robinson</h3>
                    <p>
                      <p>Male: 52 kg + 1.9 kg per inch over 5 feet</p>{" "}
                      <p>Female: 49 kg + 1.7 kg per inch over 5 feet</p>{" "}
                    </p>
                  </div>
                </div>
              </div>
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
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Health;
