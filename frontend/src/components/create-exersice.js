import React, { Component } from "react";
import Navbar from "./navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import actions from "../services/index";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import exs from "../components/mets/mets.json";
import { getWeekYearWithOptions } from "date-fns/fp";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./changingprovider";
import Circle from "./circle";
import { Link } from "react-router-dom";
let dateNow = new Date().toDateString();
let p = 20;

let options = [];
let options2 = [];
let options3 = [];
let arr = {};
let keys = Object.entries(exs);
let keys2 = [];

class CreateExercise extends Component {
  state = {
    user: { ...this.props.user },
    username: this.props.user.email,
    description: "",
    description2: "",
    duration: 0,
    date: new Date(),
    users: [],
    list: [],
    met: "",
    custom: true,
    selected: "",
    weight: this.props.match.params.weight,
    percentage: 0,
    circle: false,
    seeForm: true
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  async componentDidMount() {
    let res = await actions.list();
    let res2 = await actions.showActivity(this.state.user.email + dateNow);
    // let res2 = await axios({
    //   method: "GET",
    //   url: "https://fitness-calculator.p.rapidapi.com/mets",
    //   headers: {
    //     "content-type": "application/octet-stream",
    //     "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
    //     "x-rapidapi-key": "e14d7b4a61mshaf4d68517150093p1d2b11jsnaa5e4d29c6bc",
    //     useQueryString: true
    //   }
    // });

    this.setState({
      list: res.data,
      actv: res2.data[0].requiredAct.toFixed(1),
      weight: res2.data[0].weight,
      todayAct: res2.data[0].activity
    });
    console.log("Activity666", res2.data[0].activity);
  }
  handleDate = date => {
    this.setState({
      date: date
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let hours = (Number(this.state.duration) / 60).toFixed(1);
    console.log("Hours", hours);
    let cals = (
      Number(this.state.met) *
      Number(this.state.weight) *
      hours
    ).toFixed(1);
    let percentage = (
      ((Number(cals) + Number(this.state.todayAct)) * 100) /
      this.state.actv
    ).toFixed();
    console.log("All", Number(cals) + Number(this.state.todayAct));
    this.setState({
      percentage: percentage,
      circle: true,
      seeForm: false
    });
    let exercise = { ...this.state };
    console.log("1", exercise);
    let newCal = {
      cal: Number(cals) + Number(this.state.todayAct)
    };
    console.log("2", newCal.cal);
    actions.createExs(exercise).then(res => {
      console.log(res.data);
      actions.displayRes(this.state.user.email + dateNow, newCal).then(res => {
        console.log("OUTPUT", res);
      });
    });

    // window.location = "/";
  };

  handleChange2 = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({
      description2: newValue.value
    });
  };
  handleChange3 = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({
      description: newValue.value,
      met: newValue.met
    });
  };
  handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  draw = () => {
    return <Circle percentage={p} />;
  };
  render() {
    let percentage = this.state.percentage;
    console.log("MET", this.state.met);
    console.log("Props", this.props.match.params.weight);
    return (
      <div>
        <Navbar />
        <p>
          Physical activity has a large effect on total human energy
          expenditure, and contributes 20-30% to the body's total energy output.
          The amount of energy expended for different activities will vary with
          the intensity and type of exercise. For each person, the range for
          total daily energy expenditure is highly variable, it depends on many
          factors, including: activity level, age, gender, size, weight and body
          composition.
        </p>
        <p>
          One of the easiest methods for recording of the intensity of a
          physical activity is the Metabolic Equivalent Task (MET) method. The
          energy cost of many activities has been determined, usually by
          monitoring the oxygen consumption during the activity, to determine an
          average oxygen uptake per unit of time. This value is then compared to
          the resting oxygen uptake.
        </p>
        <h4>
          Let us help you to calculate how many calories you burn doing various
          physical tasks.{" "}
        </h4>
        {this.state.seeForm ? (
          <div>
            <p>
              Enter your weight, then describe the duration and intensity of
              each activity
            </p>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Description:</label>
                {this.state.list.map(item => {
                  options.push({
                    value: item.description,
                    label: item.description
                  });
                })}
                {console.log(keys)}
                {keys.filter(item => {
                  {
                    options2.push({
                      value: item[0],
                      label: item[0]
                    });
                  }
                })}

                <CreatableSelect
                  isClearable
                  onChange={this.handleChange2}
                  onInputChange={this.handleInputChange}
                  options={options2}
                />

                {keys.filter(item => {
                  if (item[0] == this.state.description2) arr = item[1];
                })}
                {(options2 = [])}

                {Object.values(arr).filter(item => {
                  {
                    options3.push({
                      value: item.specific,
                      label: item.specific,
                      met: item.MET
                    });
                  }
                })}
                {console.log("Arr", Object.values(arr))}
                <CreatableSelect
                  isClearable
                  onChange={this.handleChange3}
                  onInputChange={this.handleInputChange}
                  options={options3}
                />
                {(options3 = [])}
              </div>
              <div className="form-group">
                <label>Duration in minutes</label>
                <input
                  type="number"
                  name="duration"
                  required
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onSelect={this.handleDate}
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Create"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        ) : (
          <Link to={`/circle/${this.state.percentage}/${this.state.weight}`}>
            Check your results
          </Link>
        )}
      </div>
    );
  }
}

export default CreateExercise;
