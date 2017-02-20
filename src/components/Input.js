import React from 'react';

class Input extends React.Component {

  handleClick(e) {
    let content = this.textarea.value;
    e.preventDefault();
    this.props.socket.emit('chat message',content);
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
