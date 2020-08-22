import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";
import CreatableSelect from "react-select/creatable";

class Profile extends Component {
  state = {
    user: { ...this.props.user },
    weight: "",
    levels: []
  };

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
        label: "Sedentary"
      },
      {
        value: res1.data.data["Exercise 1-3 times/week"],
        label: "Lightly active"
      },
      {
        value: res1.data.data["Exercise 4-5 times/week"],
        label: "Moderately active"
      },
      {
        value: res1.data.data["Intense exercise 6-7 times/week"],
        label: "Very active"
      },
      {
        value: res1.data.data["Very intense exercise daily, or physical job"],
        label: "Extra active"
      }
    ];

    this.setState({
      levels: levels,
      default: res1.data.data["Exercise 4-5 times/week"]
    });
  };
  render() {
    return (
      <div>
        <Navbar />
        <div className="form-group">
          <h2>Choose your Activity Level</h2>
          {console.log("LEV", this.state.levels)}
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
            <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
          <CreatableSelect
            isClearable
            onChange={this.handleChange3}
            onInputChange={this.handleInputChange}
            defaultValue={{
              label: "Moderately active",
              value: this.state.default
            }}
            options={this.state.levels}
          />
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
      </div>
    );
  }
}

export default Profile;
