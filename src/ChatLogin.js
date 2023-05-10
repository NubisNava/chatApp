import React, { Component } from "react";
import { GiStoneBridge } from "react-icons/gi";
import {HiOutlineChat} from "react-icons/hi";

export default class ChatLogin extends Component {
  randomUsername = () => {
    const adjectives = [
      "grey",
      "hidden",
      "yellow",
      "misty",
      "silent",
      "empty",
      "black",
      "dark",
      "cold",
      "smart",
      "wise",
    ];
    const nouns = [
      "Structure",
      "Engineer",
      "Plan",
      "Architect",
      "Bridge",
      "Building",
      "Timber",
      "Cottage",
      "Concrete",
      "Wall",
      "Roof",
      "Ceiling",
      "Floor",
      "Brick",
      "House",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  };
  state = {
    username: this.randomUsername(),
    loggedIn: false,
  };

  selectRandomName = () => {
    const randomName = this.randomUsername();
    this.setState({ username: randomName });
    this.setState({ loggedIn: true });
  };
  setUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  createUsername = () => {
    console.log(this.state.username);
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onLogin(this.state.username);
  };

  render() {
    return (
      <div>
        <div className="App-header Login">
          <h1>ChatBridge </h1>
          <div className="Chat-icons">
            <GiStoneBridge />
          </div>
          <div className="Chat-icon-sm">
            <HiOutlineChat/>
          </div>
        </div>
        <div className="Login-window">
          <form className="Form" onSubmit={this.handleSubmit}>
            <div>
              <div className="">
                <h2 className="Login-header text-center">Login</h2>
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.setUsername}
                />
              </div>
              <div>
                <h3 className="Login-text ">
                  Or enter chat with random picked username
                </h3>
              </div>
              <div className="Login-button ">
                <button
                  type="submit"
                  onClick={this.createUsername}
                  className="Submit-button"
                >
                  Start Chatting!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
