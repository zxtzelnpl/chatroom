import React from 'react';
import MessageBox from '../containers/MessageBox'
import Input from '../containers/Input'

class Chat extends React.Component{
  render(){
    return(
      <div className="chat">
        <MessageBox />
        <Input socket={this.props.socket}/>
      </div>
    )
  }
}

export default Chat;
