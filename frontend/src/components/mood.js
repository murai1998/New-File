import React, { Component } from "react";
import Navbar from "./navbar";
import actions from "../services";

import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const pd = require("paralleldots");
let dateNow = new Date().toDateString();
// pd.apiKey = process.env.API_KEY;
pd.apiKey = "M0crWrIdDTIEXWb5krd8IyAYsLaLwUTjvATB0FvLgv0";
console.log(pd.apiKey);
class Mood extends Component {
  state = {
    user: { ...this.props.user },
    formShow: true,
    formShow2: false,
    username: "",
    text: "",
    date: new Date(),
    active: "",
    mood: {
      Happy: 0,
      Angry: 0,
      Bored: 0,
      Fear: 0,
      Sad: 0,
      Excited: 0
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  toggleForm = () => {
    this.setState({
      formShow: true,
      formShow2: false
    });
  };
  toggleForm2 = () => {
    console.log("Toggle", this.state.formShow2);
    pd.emotion(this.state.text, "en")
      .then(response => {
        console.log("RESPONSE", response);

        let response1 = JSON.parse(response);
        console.log(response1);
        let arr1 = Object.keys(response1.emotion);
        let arr2 = Object.values(response1.emotion);
        let index = 0;
        let max = 0;
        arr2.forEach((x, i) => {
          if (x > max) {
            max = x;
            index = i;
          }
          return x;
        });
        console.log(max, arr1[index]);

        this.setState({
          formShow: false,
          formShow2: true,
          active: arr1[index],
          mood: {
            Happy: response1.emotion.Happy,
            Angry: response1.emotion.Angry,
            Bored: response1.emotion.Bored,
            Fear: response1.emotion.Fear,
            Sad: response1.emotion.Sad,
            Excited: response1.emotion.Excited
          }
        });
      })
      .catch(error => {
        console.log(error);
      });

    // this.setState({
    //   formShow2: true,
    //    mood: {
    //     Happy: 0.0286004865,
    //     Angry: 0.0304055973,
    //     Bored: 0.0060389347,
    //     Fear: 0.1790783869,
    //     Sad: 0.7433762018,
    //     Excited: 0.0125003927
    //   }
    // });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      formShow: false
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
  handleDate = date => {
    let time = new Date(date).toDateString();
    actions.showMemory(this.state.user.email + time).then(res => {
      console.log("OUTPUT", res.data);
      this.setState({
        date: date,
        memories: res.data
      });
    });
  };
  showResults = () => {
    console.log("Memory", this.state.memories);
    if (this.state.memories !== undefined && this.state.memories.length !== 0) {
      return this.state.memories.map((text, i) => {
        return (
          <div className="article1" key={i}>
            <div>
              &#10077;
              {text.text}
              &#10078;
            </div>
          </div>
        );
      });
    } else {
      return <div className="article1">No entries on this day</div>;
    }
  };
  render() {
    {
      console.log("date", this.state.userDate2);
    }

    return (
      <div>
        <Navbar />
        <div>
          <section class="signup-section2" id="signup2">
            <div class="container">
              <div class="row">
                <div class="col-md-10 col-lg-8 mx-auto text-center">
                  <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
                  <h2 id="quest2">Memories for</h2>
                  <i>
                    <DatePicker
                      id="calendar3"
                      selected={this.state.date}
                      onSelect={this.handleDate}
                    />
                  </i>
                </div>
              </div>
            </div>
          </section>
          <div className="calendarSect">
            <div className="entries">
              <h3>LIST OF ENTRIES</h3>
              {this.showResults()}
            </div>
          </div>

          {this.state.formShow ? (
            <section class="signup-section3" id="signup4">
              <div>
                <div class="row">
                  <div class="col-md-10 col-lg-8 mx-auto text-center">
                    <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
                    <img
                      id="pen"
                      class="img-fluid"
                      src={require("../images/pen.png")}
                      alt=""
                    />
                    <form onSubmit={this.handleSubmit}>
                      <textarea
                        id="textaar"
                        type="text"
                        name="text"
                        required
                        onChange={this.handleChange}
                      />
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Add more"
                          id="btnColor"
                          className="btn btn-primary"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div>
              <section class="signup-section3" id="signup4">
                <div>
                  <div class="row">
                    <div class="col-md-10 col-lg-8 mx-auto text-center">
                      <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
                      <img
                        id="pen"
                        class="img-fluid"
                        src={require("../images/pen.png")}
                        alt=""
                      />
                      <div className="buttonsMood">
                        {this.state.formShow2 ? (
                          <div className="moodanalyser">
                            <div
                              id={
                                this.state.active == "Happy" ? "active5" : null
                              }
                              className="mood2"
                            >
                              <h1>&#128512;</h1>
                              <h4>Happy</h4>
                              <h3>
                                {(Number(this.state.mood.Happy) * 100).toFixed(
                                  2
                                )}
                                %
                              </h3>
                            </div>
                            <div
                              id={
                                this.state.active == "Angry" ? "active5" : null
                              }
                              className="mood2"
                            >
                              <h1>&#128544;</h1>
                              <h4>Angry</h4>
                              <h3>
                                {(Number(this.state.mood.Angry) * 100).toFixed(
                                  2
                                )}
                                %
                              </h3>
                            </div>
                            <div
                              id={
                                this.state.active == "Bored" ? "active5" : null
                              }
                              className="mood2"
                            >
                              <h1>&#128564;</h1>
                              <h4>Bored</h4>
                              <h3>
                                {(Number(this.state.mood.Bored) * 100).toFixed(
                                  2
                                )}
                                %
                              </h3>
                            </div>
                            <div
                              id={this.state.active == "Fear" ? "active5" : null}
                              className="mood2"
                            >
                              <h1>&#128561;</h1>
                              <h4>Fear</h4>
                              <h3>
                                {(Number(this.state.mood.Fear) * 100).toFixed(
                                  2
                                )}
                                %
                              </h3>
                            </div>
                            <div
                              id={this.state.active == "Sad" ? "active5" : null}
                              className="mood2"
                            >
                              <h1>&#128542;</h1>
                              <h4>Sad</h4>
                              <h3>
                                {(Number(this.state.mood.Sad) * 100).toFixed(2)}
                                %
                              </h3>
                            </div>
                            <div
                              id={
                                this.state.active == "Excited" ? "active5" : null
                              }
                              className="mood2"
                            >
                              <h1>&#129321;</h1>
                              <h4>Excited</h4>
                              <h3>
                                {(
                                  Number(this.state.mood.Excited) * 100
                                ).toFixed(2)}
                                %
                              </h3>
                            </div>
                          </div>
                        ) : (
                          <button
                            id="btnColor"
                            className="btn btn-primary"
                            onClick={this.toggleForm2}
                          >
                            Analyze your emotions
                          </button>
                        )}
                        <button
                          id="btnColor"
                          className="btn btn-primary"
                          onClick={this.toggleForm}
                        >
                          New thoughts
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Mood;
