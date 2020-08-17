import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { Link } from "react-router-dom";

class ExercisesList extends Component {
  state = {
    exsercises: []
  };
  componentDidMount() {
    axios.get("http://localhost:5000/exercise").then(res => {
      console.log(res.data);
      this.setState({
        exsercises: res.data
      });
    });
  }
  delete = id => {
    axios.get(`http://localhost:5000/exercise/delete/${id}`).then(res => {
      console.log(res.data);
    });

    this.setState({
      exsercises: this.state.exsercises.filter(x => x._id !== id)
    });
  };
  exercisesList = () => {
    return this.state.exsercises.map(exs => {
      let date = new Date(exs.date);
      return (
        <tr key={exs.username}>
          <td>{exs.username}</td>
          <td>{exs.description}</td>
          <td>{exs.duration}</td>
          <td>{date.toDateString()}</td>
          <td>
            <p>
              <Link to={`/edit/${exs._id}`}>update</Link> |{" "}
              <span onClick={() => this.delete(exs._id)}>delete</span>
            </p>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <Navbar />
        <h2>List of exercises</h2>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exercisesList()}</tbody>
        </table>
      </div>
    );
  }
}

export default ExercisesList;
