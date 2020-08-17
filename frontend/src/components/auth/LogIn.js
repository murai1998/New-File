import React, { Component, Fragment } from "react";
import actions from "../../services/index";

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
        <div>
          <p>It's been a long time since we've heard from you</p>
        </div>

        <div>
          <h3>Log In </h3>
          <form onSubmit={this.handleSubmit}>
            <label for="email">Email Address</label>
            <br />
            <input
              id="email"
              name="email"
              type="email"
              onChange={this.handleChange}
            />
            <br />
            <label for="Password">Password</label>
            <br />
            <input
              id="password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <br />
            <input type="submit" value="Log In" />
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
