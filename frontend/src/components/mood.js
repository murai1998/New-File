import React, { Component } from "react";
import Navbar from "./navbar";
import actions from "../services";

import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const pd = require("paralleldots");
let dateNow = new Date().toDateString();
pd.apiKey = process.env.API_KEY;
class Mood extends Component {
  state = {
    user: { ...this.props.user },
    formShow: true,
    formShow2: false,
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
      formShow: true,
      formShow2: false
    });
  };
  toggleForm2 = () => {
    console.log("Toggle", this.state.formShow2);
    this.setState({
      formShow2: true
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
                            <div>
                              <div>&#128512;</div>
                              <p>Happy</p>
                              <p>
                                {(Number(this.state.mood.Happy) * 100).toFixed(
                                  2
                                )}
                                %
                              </p>
                            </div>
                            <div>
                              <div>&#128544;</div>
                              <p>Angry</p>
                              <p>
                                {(Number(this.state.mood.Angry) * 100).toFixed(
                                  2
                                )}
                                %
                              </p>
                            </div>
                            <div>
                              <div>&#128564;</div>
                              <p>Bored</p>
                              <p>
                                {(Number(this.state.mood.Bored) * 100).toFixed(
                                  2
                                )}
                                %
                              </p>
                            </div>
                            <div>
                              <div>&#128561;</div>
                              <p>Fear</p>
                              <p>
                                {(Number(this.state.mood.Fear) * 100).toFixed(
                                  2
                                )}
                                %
                              </p>
                            </div>
                            <div>
                              <div>&#128542;</div>
                              <p>Sad</p>
                              <p>
                                {(Number(this.state.mood.Sad) * 100).toFixed(2)}
                                %
                              </p>
                            </div>
                            <div>
                              <div>&#129321;</div>
                              <p>Excited</p>
                              <p>
                                {(
                                  Number(this.state.mood.Excited) * 100
                                ).toFixed(2)}
                                %
                              </p>
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
