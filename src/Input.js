// rfce i rcc kratica

import EmojiPicker from "emoji-picker-react";
import React, { Component } from "react";

export default class Input extends Component {
  state = {
    text: "",
    isPickerVisible: false,
  };
  onChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }

  openEmoji = () => {
    this.setState({ isPickerVisible: !this.state.isPickerVisible });
  };

  addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    this.setState({
      text: this.state.text + emoji,
    });
  };
  render() {
    return (
      <div className="Input">
        <button className="emoji-button" onClick={this.openEmoji}>
            <svg
              class="feather feather-smile sc-dnqmqq jxshSx"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </button>
        <form onSubmit={(e) => this.onSubmit(e)}>
          
          <input
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter message"
            autoFocus={true}
          />
          <button className="emoji-button">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              data-reactid="1036"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>

        <div className="Emoji-list">
          {this.state.isPickerVisible && (
            <EmojiPicker
              onEmojiClick={(e) => {
                this.addEmoji(e);
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
