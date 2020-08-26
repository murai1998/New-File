import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";
import actions from "../services/index";
import CreatableSelect from "react-select/creatable";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
let value = 0;
let dateNow = new Date().toDateString();
class Profile extends Component {
  state = {
    user: { ...this.props.user },

    levels: [],
    button: true,
    value: 0
  };

  async componentDidMount() {
    let res2 = await actions.showActivity(
      this.state.user.email + dateNow.toString()
    );
    console.log("ACTTTT", res2.data.lenght);
    if (res2.data == 0) {
      this.setState({
        perc: 0
      });
    } else {
      this.setState({
        perc: (
          (Number(res2.data[0].activity) * 100) /
          res2.data[0].requiredAct.toFixed(1)
        ).toFixed(),
        weight: res2.data[0].weight,
        reqAct: res2.data[0].requiredAct.toFixed(1),
        remain: (res2.data[0].requiredAct - res2.data[0].activity).toFixed(1)
      });
    }
    console.log("RESSSSS2", res2);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChange3 = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({
      level: newValue.value
    });
    if (this.state.value == 0) {
      let activity = {
        username: this.state.user.email,
        requiredAct: newValue.value,
        activity: this.state.value,
        userDate: this.state.user.email + dateNow,
        weight: this.state.weight
      };
      console.log(activity);
      actions.addActivity(activity).then(res => {
        console.log(res.data);
      });
    }
  };
  handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  getInfo = async e => {
    e.preventDefault();
    console.log(this.state.user.height);

    let h2 = this.state.user.height;

    let res1 = await axios({
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/dailycalory",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
        "x-rapidapi-key": "e14d7b4a61mshaf4d68517150093p1d2b11jsnaa5e4d29c6bc",
        useQueryString: true
      },
      params: {
        heigth: this.state.user.height,
        age: this.state.user.birth,
        gender: this.state.user.gender,
        weigth: this.state.weight
      }
    });

    let levels = [
      {
        value: res1.data.data["Sedentary: little or no exercise"],
        label: `Sedentary, ${res1.data.data[
          "Sedentary: little or no exercise"
        ].toFixed(1)}cals`
      },
      {
        value: res1.data.data["Exercise 1-3 times/week"],
        label: `Lightly active, ${res1.data.data[
          "Exercise 1-3 times/week"
        ].toFixed(1)}cals`
      },
      {
        value: res1.data.data["Exercise 4-5 times/week"],
        label: `Moderately active, ${res1.data.data[
          "Exercise 4-5 times/week"
        ].toFixed(1)}cals`
      },
      {
        value: res1.data.data["Intense exercise 6-7 times/week"],
        label: `Very active, ${res1.data.data[
          "Intense exercise 6-7 times/week"
        ].toFixed(1)}cals`
      },
      {
        value: res1.data.data["Very intense exercise daily, or physical job"],
        label: `Extra active, ${res1.data.data[
          "Very intense exercise daily, or physical job"
        ].toFixed(1)}cals`
      }
    ];

    this.setState({
      levels: levels,
      default: res1.data.data["Exercise 4-5 times/week"],
      button: false
    });
  };
  render() {
    console.log(this.state.user.email + dateNow);
    return (
      <div>
        <Navbar
          setUser={this.props.setUser}
          user={this.state.user}
          weight={this.state.weight}
        />
        <div className="form-group">
          {console.log("LEV", this.state.levels)}
          {this.state.perc == 0 ? (
            <div>
              <h2>Choose your Activity Level</h2>
              <form onSubmit={this.getInfo}>
                <label>Your weight</label>
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
                {this.state.button ? (
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </div>
                ) : (
                  ""
                )}
              </form>

              <div>
                <CreatableSelect
                  isClearable
                  onChange={this.handleChange3}
                  onInputChange={this.handleInputChange}
                  //   defaultValue={{
                  //     label: `Moderately active`,
                  //     value: this.state.default
                  //   }}
                  options={this.state.levels}
                />
              </div>
            </div>
          ) : (
            <div>
              {console.log("Username", this.state.user.username)}
              <h2>Welcome back, {this.state.user.username}!</h2>

              <p>Today's goal: {this.state.reqAct} calories</p>
            </div>
          )}
        </div>
        <table class="table">
          <thead>
            <tr className="table-default">
              <th scope="col" scope="col">
                #
              </th>
              <th scope="col" scope="col">
                Activity Level
              </th>
              <th scope="col" scope="col">
                Number
              </th>
              <th scope="col" scope="col">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-primary">
              <th scope="row">1</th>
              <td scope="row">Sedentary</td>
              <td scope="row">1.2</td>
              <td scope="row">
                People who work desk jobs and engage in very little exercise or
                chores.
              </td>
            </tr>
            <tr class="table-success">
              <th scope="row">2</th>
              <td scope="row">Lightly active</td>
              <td scope="row">1.375</td>
              <td scope="row">
                People who do chores and go on long walks/engage in exercise at
                least 1 to 3 days in a week.
              </td>
            </tr>
            <tr class="table-danger">
              <th scope="row">3</th>
              <td scope="row">Moderately active</td>
              <td scope="row">1.55</td>
              <td scope="row">
                People who move a lot during the day and workout (moderate
                effort) at least 3 to 5 days in a week.
              </td>
            </tr>
            <tr class="table-warning">
              <th scope="row">4</th>
              <td scope="row">Very active</td>
              <td scope="row">1.725</td>
              <td scope="row">
                People who play sports or engage in vigorous exercise on most
                days.
              </td>
            </tr>
            <tr class="table-info">
              <th scope="row">5</th>
              <td scope="row">Extra active</td>
              <td scope="row">1.9</td>
              <td scope="row">
                People who do intense workouts 6 to 7 days a week with work that
                demands physical activity.
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ width: "400px" }}>
          <CircularProgressbar
            value={this.state.perc}
            text={`${Number(this.state.perc)}%`}
            // text={`${Math.round((value * 100) / this.state.level)}%`}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
