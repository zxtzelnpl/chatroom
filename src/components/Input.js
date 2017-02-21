import React from 'react';
import socket from '../socket/socket';

class Input extends React.Component {

  handleClick(e) {
    let content = this.textarea.value;
    e.preventDefault();
    socket.emit('chat message',content);
  }

  render() {
    return (
      <div className="chatInputBox">
        <div>
          <textarea name="chatMessage"
                    id="chatMessage"
                    cols="30"
                    rows="5"
                    ref={(textarea) => {
                      this.textarea = textarea
                    }}
          />
        </div>
        <div>
          <a className="btn" onClick={this.handleClick.bind(this)}>提交</a>
        </div>
      </div>
    )
  }
}

export default Input;
