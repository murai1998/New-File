import React, { Component } from "react";
import Navbar from "./navbar";
import actions from "../services";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const pd = require("paralleldots");
let dateNow = new Date().toDateString();
pd.apiKey = process.env.API_KEY;
class Mood extends Component {
  state = {
    user: { ...this.props.user },
    formShow: true,
    username: "",
    text: "",
    date: new Date()
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  toggleForm = () => {
    this.setState({
      formShow: true
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    // pd.emotion(
    //  this.state.text,
    //   "en"
    // )
    //   .then(response => {

    //     this.setState({
    //       formShow: false,
    //       mood: response.emotion
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    this.setState({
      formShow: false,
      mood: {
        Happy: 0.0286004865,
        Angry: 0.0304055973,
        Bored: 0.0060389347,
        Fear: 0.1790783869,
        Sad: 0.7433762018,
        Excited: 0.0125003927
      }
    });
    let text = {
      username: this.state.user.email,
      userDate: this.state.user.email + dateNow,
      text: this.state.text
    };
    actions.addDiary(text).then(res => {
      console.log(res.data);
    });
  };
  render() {
    {
      console.log("Email", this.state.user.email + dateNow);
    }
    return (
      <div>
        <Navbar />
        <div>
          <DatePicker selected={this.state.date} onSelect={this.handleDate} />
          {this.state.formShow ? (
            <form id="form6" onSubmit={this.handleSubmit}>
              <textarea
                type="text"
                name="text"
                required
                onChange={this.handleChange}
              />
              <div className="form-group">
                <input
                  type="submit"
                  value="Create"
                  className="btn btn-primary"
                />
              </div>
            </form>
          ) : (
            <div>
              <p>This story has been added to your diary</p>
              <div>
                <div>
                  <div>&#128512;</div>
                  <p>Happy</p>
                  <p>{(Number(this.state.mood.Happy) * 100).toFixed(2)}%</p>
                </div>
                <div>
                  <div>&#128544;</div>
                  <p>Angry</p>
                  <p>{(Number(this.state.mood.Angry) * 100).toFixed(2)}%</p>
                </div>
                <div>
                  <div>&#128564;</div>
                  <p>Bored</p>
                  <p>{(Number(this.state.mood.Bored) * 100).toFixed(2)}%</p>
                </div>
                <div>
                  <div>&#128561;</div>
                  <p>Fear</p>
                  <p>{(Number(this.state.mood.Fear) * 100).toFixed(2)}%</p>
                </div>
                <div>
                  <div>&#128542;</div>
                  <p>Sad</p>
                  <p>{(Number(this.state.mood.Sad) * 100).toFixed(2)}%</p>
                </div>
                <div>
                  <div>&#129321;</div>
                  <p>Excited</p>
                  <p>{(Number(this.state.mood.Excited) * 100).toFixed(2)}%</p>
                </div>
              </div>
              <button onClick={this.toggleForm}>New thoughts</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Mood;
