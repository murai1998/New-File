import React, { Component, Fragment } from "react";
import actions from "../../services/index";
import { Link } from "react-router-dom";

class LogIn extends Component {
  state = {};
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    actions
      .logIn(this.state)
      .then(async user => {
        await this.props.setUser({ ...user.data });
        this.props.history.push("/profile");
      })
      .catch(({ response }) => {
        alert(
          "Looks like you did not create an account, you can sign up for a new account!"
        );

        // window.location.href = "https://iron-job-hunter.herokuapp.com/sign-up";
      });
  };
  render() {
    return (
      <div>
        {/* <div>
          <p>It's been a long time since we've heard from you</p>
        </div> */}

        <div className="container3">
          <div class="panel panel-primary">
            <Link style={{ textDecoration: "none" }} to="/">
              {" "}
              <h1 id="cross">☒</h1>
            </Link>
            <h3>Log In </h3>
            <form
              onSubmit={this.handleSubmit}
              method="POST"
              action="#"
              role="form3"
            >
              <div class="form-group">
                <label className="control-label" for="email">
                  Email Address
                </label>
                <br />
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <br />
              <div class="form-group">
                <label class="control-label" for="Password">
                  Password
                </label>
                <br />
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <br />
              <div class="form-group">
                <input
                  class="btn  btn-block btn-primary"
                  type="submit"
                  value="Log In"
                />
              </div>

              <p class="form-group" id="ptag">
                Do not have an account yet?<br></br> Create it now!
                <Link to="/sign-up"> Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
