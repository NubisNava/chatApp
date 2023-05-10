import "./App.css";
import Messages from "./Messages";
import { Component } from "react";
import Input from "./Input";
import ChatLogin from "./ChatLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { GiStoneBridge } from "react-icons/gi";
import {HiOutlineChat} from "react-icons/hi";


class App extends Component {
  randomName = () => {
    const adjectives = [
      "autumn",
      "bitter",
      "misty",
      "silent",
      "empty",
      "dry",
      "dark",
      "summer",
      "icy",
      "delicate",
    ];
    const nouns = [
      "Structure",
      "Engineer",
      "Plan",
      "Architect",
      "Format",
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
      "Calculation",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  };

  randomColor = () => {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  };
  state = {
    messages: [],
    
    member: {
      username: this.randomName(),
      color: this.randomColor(),
    },
    loggedIn: false,
  };
  drone = null;
  componentDidMount() {}

  handleLogin = (username) => {
    const member = { ...this.state.member, username };
    this.drone = new window.Scaledrone("DiMHbmimlr1eZyQ6", {
      data: member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member, username };
      member.id = this.drone.clientId;
      this.setState({ member, loggedIn: true });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      const time =
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes();
      messages.push({ member, text: data, time });
      this.setState({ messages: messages });
    });
  };

  render() {
    return (
      <div className="App ">
        {!this.state.loggedIn && <ChatLogin onLogin={this.handleLogin} />}

        {this.state.loggedIn && (
          <div className="Chat-app">
            <div className="App-header">
                <h1> ChatBridge</h1>
                <div className="Chat-icons">
            <GiStoneBridge  />
          </div>
          <div className="Chat-icon-sm">
            <HiOutlineChat/>
          </div>
              </div>
            <div className="Chat-window">
              
              <div className="Chat-area">
                <Messages
                  messages={this.state.messages}
                  currentMember={this.state.member}
                />
                
              </div>
              <div className="Input-area"><Input onSendMessage={this.onSendMessage} /></div>
            </div>
            
          </div>
        )}
      </div>
    );
  }
  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;
