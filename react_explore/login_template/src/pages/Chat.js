import React, { Component } from 'react';
import './Chat.css';
import ChatBox from './ChatBox';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatLog: []
    }
  }
  
  addChat = (name, message, alert = false) => {
    this.setState({ chatLog: this.state.chatLog.concat({
      name,
      message: `${message}`,
      timestamp: `${Date.now()}`,
      alert
    })});
  }
  
  render() {
    const { chatLog } = this.state;
    return (
      <div className="App">
        <ChatBox
          chatLog={chatLog}
          onSend={(msg) => msg && this.addChat('Me', msg)}
        />
      </div>
    );
  }
}