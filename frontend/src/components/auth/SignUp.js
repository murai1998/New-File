import React, { Component, Fragment } from "react";
import actions from "../../services/index";
import DatePicker from "react-datepicker";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";

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
      .then(user => {
        console.log("Gender", this.state.gender);
        console.log("USER", user);
        this.props.setUser({ ...user.data });
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
      <div id="fragment">
        <Fragment>
          <div className="container3">
            <div class="panel panel-primary">
              <form
                method="POST"
                action="#"
                role="form3"
                onSubmit={this.handleSubmit}
              >
                <Link style={{ textDecoration: "none" }} to="/">
                  {" "}
                  <h1 id="cross">☒</h1>
                </Link>
                <div class="form-group">
                  <h2 className="hTwo">Sign Up</h2>
                </div>
                <div class="form-group">
                  <label class="control-label" for="signupName">
                    Username
                  </label>
                  <input
                    id="signupName"
                    name="username"
                    type="text"
                    onChange={this.handleChange}
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label class="control-label" for="signupEmail">
                    Email
                  </label>
                  <input
                    id="signupEmail"
                    name="email"
                    type="emai"
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </div>
                <div class="form-group">
                  <label class="control-label" for="signupPassword">
                    Password
                  </label>
                  <input
                    id="signupPassword"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </div>
                <div class="form-group" id="height">
                  <label id="height" class="control-label">
                    Height
                  </label>
                  <input
                    id="typeinp"
                    type="range"
                    min="100"
                    max="250"
                    name="height"
                    onChange={this.handleChange}
                    step="1"
                  />
                  <label id="height2">{this.state.height} cm</label>
                </div>

                <div class="form-group">
                  <label class="control-label">Gender</label>
                  <CreatableSelect
                    isClearable
                    onChange={this.handleChange2}
                    onInputChange={this.handleInputChange}
                    options={opts}
                  />
                </div>

                <div className="form-group">
                  <label class="control-label">Date of birth</label>
                  <div>
                    <input
                      type="date"
                      id="start"
                      name="birth"
                      min="1920-01-01"
                      onChange={this.handleChange3}
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <input
                    class="btn  btn-block btn-primary"
                    type="submit"
                    value="Sign Up"
                  />
                </div>
                <p class="form-group" id="ptag">
                  By creating an account, you agree to our Terms of Use and our
                  Privacy Policy
                </p>

                <p class="form-group" id="ptag">
                  Already have an account? <Link to="/log-in">Log In</Link>
                </p>
              </form>
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default SignUp;
