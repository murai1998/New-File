import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import actions from "./services/index";
import ExercisesList from "./components/exercise-list";
import Health from "./components/health";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exersice";
import Profile from "./components/profile";
import "bootstrap/dist/css/bootstrap.min.css";
import Circle from "./components/circle";
import Landing from "./components/landing";
import Socket from "./components/Socket";
require("dotenv").config();

class Main extends Component {
  state = {
    user: {
      loading: true
    }
  };
  async componentDidMount() {
    let user = await actions.isLoggedIn();
    console.log("coolest ", user);
    this.setState({ ...user.data });
  }

  setUser = user => {
    this.setState({
      user
    });
  };

  logOut = async () => {
    let res = await actions.logOut();
    this.setUser({ email: null, createdAt: null, updatedAt: null, _id: null }); //FIX
  };
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/sign-up"
            render={props => <SignUp {...props} setUser={this.setUser} />}
          />
          <Route exact path="/" render={props => <Landing {...props} />} />
          <Route
            exact
            path="/log-in"
            render={props => <LogIn {...props} setUser={this.setUser} />}
          />
          {/* <Route
            exact
            path="/"
            render={props => <ExercisesList {...props} />}
          /> */}
          {/* <Route
            exact
            path="/edit/:id"
            render={props => <EditExercise {...props} />}
          /> */}
          <Route
            exact
            path="/create"
            render={props => (
              <CreateExercise
                setUser={this.setUser}
                user={this.state.user}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/circle/:results/:weight"
            render={props => (
              <Circle
                setUser={this.setUser}
                user={this.state.user}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/calculator"
            render={props => (
              <Health
                setUser={this.setUser}
                user={this.state.user}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/profile"
            render={props => (
              <Profile {...props} setUser={this.setUser} user={this.state} />
            )}
          />
          <Route
            exact
            path="/socket"
            render={props => <Socket {...props} user={this.state} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
