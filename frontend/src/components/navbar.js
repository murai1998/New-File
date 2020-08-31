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
  hamburgerDrop = () => {
    var x = document.getElementById("navbarNavDropdown");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };

  render() {
    console.log("NAVPROPs", this.props);
    return (
      <body id="page-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <div class="container">
            <Link className="navbar-brand js-scroll-trigger" to="/">
              Cardinal
            </Link>
            <button
              class="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={this.hamburgerDrop}
            >
              <span class="navbar-toggler-icon"></span>
              <i className="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ml-auto">
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
                    <Link className="nav-link" to="/socket">
                      Socket
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">
                      Log Out
                    </Link>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </nav>
      </body>
    );
  }
}

export default Navbar;
