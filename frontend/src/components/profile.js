import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";

class Profile extends Component {
  state = {
    user: { ...this.props.user },
    weight: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getInfo = async e => {
    e.preventDefault();
    console.log(this.state.user.height);

    let h2 = this.state.user.height;

    let res1 = await axios({
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/dailycalory",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
        "x-rapidapi-key": "e14d7b4a61mshaf4d68517150093p1d2b11jsnaa5e4d29c6bc",
        useQueryString: true
      },
      params: {
        heigth: this.state.user.height,
        age: this.state.user.birth,
        gender: this.state.user.gender,
        weigth: this.state.weight
      }
    });
    console.log("RES", res1);
    this.setState({});
  };
  render() {
    return (
      <div>
        <Navbar />
        <div className="form-group">
          <form onSubmit={this.getInfo}>
            <label>Your weight</label>
            <input
              id="typeinp"
              type="range"
              min="20"
              max="150"
              name="weight"
              onChange={this.handleChange}
              step="1"
            />
            {this.state.weight} kg
            <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
