import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";
import actions from "../services/index";
import CreatableSelect from "react-select/creatable";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import styled, { keyframes } from "styled-components";
// import { bounce } from "react-animations";

// const Bounce = styled.div`
//   animation: 2s ${keyframes`${bounce}`} infinite;
// `;

let value = 0;
let dateNow = new Date().toDateString();
class Profile extends Component {
  state = {
    user: { ...this.props.user.user },
    selectShow: false,
    levels: [],
    button: true,
    value: 0,
    input2: true,
    lev: false
  };

  async componentDidMount() {
    let res2 = await actions.showActivity(
      this.state.user.email + dateNow.toString()
    );
    console.log("ACTTTT", res2.data.lenght);
    if (res2.data == 0) {
      this.setState({
        perc: 0,
        burned: 0
      });
    } else {
      this.setState({
        perc: (
          (Number(res2.data[0].activity) * 100) /
          res2.data[0].requiredAct.toFixed(1)
        ).toFixed(),
        weight: res2.data[0].weight,
        burned: res2.data[0].activity.toFixed(1),
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
      console.log("LABEl", newValue.label);
      actions.addActivity(activity).then(res => {
        console.log(res.data);
      });
      this.setState({
        selectShow: false,
        lev: true,
        labelL: newValue.label
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
        label: `Sedentary`
      },
      {
        value: res1.data.data["Exercise 1-3 times/week"],
        label: `Lightly active`
      },
      {
        value: res1.data.data["Exercise 4-5 times/week"],
        label: `Moderately active`
      },
      {
        value: res1.data.data["Intense exercise 6-7 times/week"],
        label: `Very active`
      },
      {
        value: res1.data.data["Very intense exercise daily, or physical job"],
        label: `Extra active`
      }
    ];

    this.setState({
      levels: levels,
      default: res1.data.data["Exercise 4-5 times/week"],
      button: false,
      selectShow: true,
      input2: false
    });
  };
  render() {
    console.log("PROPS", this.props);
    console.log(this.state.user.email + dateNow);
    return (
      <div>
        <Navbar
          setUser={this.props.setUser}
          user={this.state.user}
          weight={this.state.weight}
        />
        <div className="profile">
          <div id="groupFF" className="form-group">
            {console.log("LEV", this.state.levels)}
            {this.state.perc == 0 ? (
              <div className="profilePic1">
                <div className="inputProfile">
                  <h1 className="h1P">Profile</h1>
                  <div className="allInput">
                    <div>
                      {this.state.input2 ? (
                        <form className="weightForm" onSubmit={this.getInfo}>
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
                          <strong>{this.state.weight}</strong> kg
                          {this.state.button ? (
                            <div className="form-group">
                              <input type="submit" value="✔" id="cross2" />
                            </div>
                          ) : (
                            ""
                          )}
                        </form>
                      ) : (
                        <p className="weightP">
                          Your weight: {this.state.weight} kg
                        </p>
                      )}
                    </div>
                    <div>
                      {this.state.selectShow ? (
                        <div className="selectDes">
                          <p className="level">Choose your Activity Level</p>
                          <CreatableSelect
                            className="selectStyle"
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
                      ) : (
                        ""
                      )}
                      {this.state.lev ? (
                        <div className="weightP" id="levelA">
                          <p>Acivity level: {this.state.labelL}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div id="trBorder" className="tableDiv">
                  People who do intense workouts 6 to 7 days a week with work
                  that demands physical activity.
                </div>
              </div>
            ) : (
              <div className="profilePic1">
                {console.log("Username", this.state.user.username)}
                <div className="inputProfile">
                  <h1 className="h1P">Profile</h1>
                  <p>Today's goal: {this.state.reqAct} calories</p>
                </div>
                <div id="trBorder" className="tableDiv">
                  <p>Welcome back, {this.state.user.username}!</p>
                </div>
              </div>
            )}
          </div>
          <div className="circleLayout">
            <div className="circle2">
              <div className="caption1">
                <h3 id="nameH">Calories in Progress</h3>
                {/* <h3>{this.state.burned} calories</h3> */}
              </div>
              <CircularProgressbar
                value={this.state.perc}
                text={`${Number(this.state.perc)}%`}
                // text={`${Math.round((value * 100) / this.state.level)}%`}
              />
            </div>

            <div id="trBorder" className="tableDiv">
              <table class="table table-bordered">
                <thead>
                  <tr className="table-light table-bordered">
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
                      People who work desk jobs and engage in very little
                      exercise or chores.
                    </td>
                  </tr>
                  <tr class="table-success">
                    <th scope="row">2</th>
                    <td scope="row">Lightly active</td>
                    <td scope="row">1.375</td>
                    <td scope="row">
                      People who do chores and go on long walks/engage in
                      exercise at least 1 to 3 days in a week.
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
                      People who play sports or engage in vigorous exercise on
                      most days.
                    </td>
                  </tr>
                  <tr class="table-info">
                    <th scope="row">5</th>
                    <td scope="row">Extra active</td>
                    <td scope="row">1.9</td>
                    <td scope="row">
                      People who do intense workouts 6 to 7 days a week with
                      work that demands physical activity.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
