import React, { Component } from "react";
import { Link } from "react-router-dom";
import actions from "../services/index";

class Navbar extends Component {
  logOut = async () => {
    let res = await actions.logOut();
    console.log("Rs", res);
    this.props.setUser({
      email: null,
      createdAt: null,
      updatedAt: null,
      _id: null
    }); //FIX
  };
  render() {
    console.log("NAVPROPs", this.props);
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          ExcerTracker
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/calculator">
                Calculator
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={`/create`}>
                {" "}
                Create a new Exercise
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/profile">
                {" "}
                Profile
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
