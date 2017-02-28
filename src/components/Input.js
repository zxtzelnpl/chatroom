import React from 'react';
import socket from '../socket/socket';

class Input extends React.Component {

  handleClick(e) {
    e.preventDefault();
    let name= document.querySelector('.signIn>span')?document.querySelector('.signIn>span').innerHTML:undefined;
    if(name){
      let content = this.textarea.value;
      socket.emit('chat message',{content,name});
    }else{
      alert('登录后可发送信息');
    }

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
