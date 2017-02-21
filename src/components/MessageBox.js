import React from 'react';
import $ from 'jquery';

function Message ({message}) {
    return(
      <div>
        <div className="name">{message.from.name}</div>
        <div className="time">{new Date(message.meta.createAt).toLocaleTimeString()}:</div>
        <div className="content">{message.content}</div>
      </div>
    )
}

class MessageBox extends React.Component{

  componentDidMount(){
    let me=this;
    $.ajax({
      type:'GET'
      ,url:'/getmessage'
      ,success:(messages)=>{
        me.props.getAll(messages)
      }
      ,error:()=>{
        console.log('连接失败，请稍后再试')
      }
    })
  }
  render(){
    let messages=this.props.messages;

    let messagesBox=messages.map((message,index)=>(
      <Message key={message.content+index} message={message} />
    ));

    return(
      <div className="messagesBox">
        {messagesBox}
      </div>
    )
  }
}

export default MessageBox
