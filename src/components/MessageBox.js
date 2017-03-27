import React from 'react';
import $ from 'jquery';
import IScroll from 'iscroll';

function Message({message}) {
  return (
    <li className="message">
      <div className="name">{message.from.name}:</div>
      <div className="time">{new Date(message.meta.createAt).toLocaleString()}</div>
      <div className="content">{message.content}</div>
    </li>
  )
}

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('componentDidMount');
    let me = this;
    $.ajax({
      type: 'GET'
      , url: '/getmessage'
      , success: (messages) => {
        me.props.getAll(messages);
        setTimeout(function(){
          var myScroll = new IScroll('.wrapper', {
            mouseWheel: true,
            scrollbars: true
          });
        })
      }
      , error: () => {
        console.log('连接失败，请稍后再试')
      }
    })
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  render() {
    let messages = this.props.messages;

    let messagesBox = messages.map((message, index) => (
      <Message key={index} message={message}/>
    ));

    return (
      <div
        className="messagesBox"
        ref={(box) => {
          this.messagesBox = box
        }}
      >
        <ul
          style={this.state}
          ref={(ul) => {
            this.messages = ul
          }}
        >
          {messagesBox}
        </ul>
      </div>
    )
  }
}

export default MessageBox
