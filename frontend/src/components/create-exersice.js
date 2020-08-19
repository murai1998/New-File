import React, { Component } from "react";
import Navbar from "./navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import actions from "../services/index";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
let options = [];
class CreateExercise extends Component {
  state = {
    user: { ...this.props.user },
    username: this.props.user.email,
    description: "",
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
    console.log(res);

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
    console.log(this.props.user);
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
            {console.log(options)}
            {/* <Select options={options} /> */}
            <CreatableSelect
              isClearable
              onChange={this.handleChange2}
              onInputChange={this.handleInputChange}
              options={options}
            />
            {(options = [])}
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
