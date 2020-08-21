import React, { Component } from "react";

class Profile extends Component {
  state = {
    user: { ...this.props.user }
  };
  render() {
    console.log(this.state.user);
    return <div></div>;
  }
}

export default Profile;
