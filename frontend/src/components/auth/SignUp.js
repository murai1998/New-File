import React, { Component, Fragment } from "react";
import actions from "../../services/index";
import DatePicker from "react-datepicker";
import CreatableSelect from "react-select/creatable";

const opts = [
  { value: "female", label: "female" },
  { value: "male", label: "male" }
];
class SignUp extends Component {
  state = {};
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleChange3 = e => {
    let date2 = new Date().getFullYear();
    // console.log(this.state.user.birth);
    let date3 = new Date(e.target.value);
    console.log("DATTTTEE", date3);
    console.log("resD", date3.getFullYear());
    this.setState({
      birth: -date3.getFullYear() + date2
    });
  };

  handleChange2 = (newValue: any, actionMeta: any) => {
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
  handleSubmit = e => {
    e.preventDefault();
    actions
      .signUp(this.state)
      .then(async user => {
        console.log("Gender", this.state.gender);
        console.log("USER", user);
        await this.props.setUser({ ...user.data });
        this.props.history.push("/profile");
        console.log();
      })
      .catch(response => {
        console.log(response);

        // alert("Looks like you already have an account with us!");

        // window.location.href = "https://iron-job-hunter.herokuapp.com/log-in";
      });
  };
  handleDate = date => {
    this.setState({
      date: date
    });
  };
  render() {
    return (
      <Fragment>
        <h2>SignUP</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input name="email" type="email" onChange={this.handleChange} />
          <label>Password</label>
          <input name="password" type="password" onChange={this.handleChange} />
          <label>Username</label>
          <input name="username" type="text" onChange={this.handleChange} />
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
          <div id="sex">
            <label>Gender</label>
            <CreatableSelect
              isClearable
              onChange={this.handleChange2}
              onInputChange={this.handleInputChange}
              options={opts}
            />
          </div>

          <div className="form-group">
            <label>Date of birth</label>
            <div>
              {/* <input name="email" type="email" onChange={this.handleChange} /> */}
              <input
                type="date"
                id="start"
                name="birth"
                min="1920-01-01"
                onChange={this.handleChange3}
              ></input>
            </div>
          </div>
          <input type="submit" value="Sign Up" />
        </form>
      </Fragment>
    );
  }
}

export default SignUp;
