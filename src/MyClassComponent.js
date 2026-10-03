import React, { Component } from "react";

class MyClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeText: "Welcome to Hogwarts!",
    };
  }
  render() {
    return (
      <div>
        <h3>{this.state.welcomeText}</h3>
      </div>
    );
  }
}

export default MyClassComponent;
