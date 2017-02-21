import React from 'react';
import MessageBox from '../containers/MessageBox';
import Input from '../containers/Input';


class Chat extends React.Component{
  render(){
    return(
      <div className="chat">
        <MessageBox />
        <Input />
      </div>
    )
  }
}

export default Chat;
