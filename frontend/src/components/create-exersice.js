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
    custom: true,
    selected: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  async componentDidMount() {
    let res = await actions.list();
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
    console.log("RESSSSS", exs);

    this.setState({
      list: res.data
    });
  }
  handleDate = date => {
    this.setState({
      date: date
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let exercise = { ...this.state };
    actions.createExs(exercise).then(res => {
      console.log(res.data);
    });
    // window.location = "/";
    console.log("Exercise:", exercise);
    return <p>You have added a new exercise</p>;
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
      description: newValue.value
    });
  };
  handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    console.log(keys);
    return (
      <div>
        <Navbar />
        CreateExercise
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
                  label: item.specific
                });
              }
            })}
            {console.log("Arr", options3)}
            <CreatableSelect
              isClearable
              onChange={this.handleChange3}
              onInputChange={this.handleInputChange}
              options={options3}
            />
            {(options3 = [])}
            {/* {(keys2 = Object.values(arr))}
            {console.log("Arr", keys2)} */}
            {/* <CreatableSelect
              isClearable
              onChange={this.handleChange2}
              onInputChange={this.handleInputChange}
              options={options}
            />
            {(options = [])} */}
          </div>
          <div className="form-group">
            <label>Duration in minutes</label>
            <input
              type="text"
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
            <input type="submit" value="Create" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
