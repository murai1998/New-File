import React, { Component, Fragment } from "react";
import actions from "../../services/index";
import DatePicker from "react-datepicker";

class SignUp extends Component {
  state = { gender: "" };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    actions
      .signUp(this.state)
      .then(user => {
        console.log("Gender", this.state.gender);
        console.log("USER", user);
        this.props.setUser({ ...user.data });
        this.props.history.push("/profile");
        console.log();
      })
      .catch(response => {
        console.log(response);
        console.log("Gender", this.state.gender);

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
          {/* <div id="sex">
            <label>Gender</label>
            <select onChange={this.handleChange} type="text">
              <option name="gender" value="female">
                Female
              </option>
              <option name="gender" value="male">
                Male
              </option>
            </select>
          </div> */}
          <input name="gender" type="text" onChange={this.handleChange} />
          <div className="form-group">
            <label>Date of birth</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onSelect={this.handleDate}
              />
            </div>
          </div>
          <input type="submit" value="Sign Up" />
        </form>
      </Fragment>
    );
  }
}

export default SignUp;
