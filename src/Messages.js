import React, { Component, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import {MdEngineering} from "react-icons/md";


export default class Messages extends Component {
  renderMessage(message) {
    const { member, text, time } = message;
    const { currentMember } = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li className={className}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        ><MdEngineering /></span>
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
          <div className="username">{time}</div>
        </div>
      </li>
    );
  }
  render() {
    const { messages } = this.props;
    return (
      <div className="container">
        <ScrollToBottom className="container">
          <ul className="Messages-list">
            {messages.map((m) => this.renderMessage(m))}
          </ul>
        </ScrollToBottom>
      </div>
    );
  }
}
