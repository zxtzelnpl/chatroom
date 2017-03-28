import React from 'react';
import $ from 'jquery';

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
    this.mouse = {
      outerH: 0
      , innerH: 0
      , canH: 0
      , moveH: 0
      , startH: 0
      , endH: 0
      , startT: 0
      , endT: 0
      , modification: 0
    };
    this.scrollTop = 0;
    this.state = {
      transform: 'translateY(0px)'
      , transition: ''
    }
  }

  handleMouseDown(e) {
    this.mouse.state = 'on';
    this.mouse.startH = e.clientY;
    this.mouse.startT = new Date();
  }

  handleMouseMove(e) {
    let transform;
    if (this.mouse.state === 'on' && this.mouse.canH > 0) {
      this.mouse.moveH = e.clientY - this.mouse.startH;
      transform = 'translateY(' + (this.scrollTop + this.mouse.moveH) + 'px)';
      this.setState({
        transform: transform
        , transition: ''
      })
    }
  }

  handleMouseUp() {
    let transform;
    this.scrollTop += this.mouse.moveH;
    this.mouse.endT = new Date();
    if (this.scrollTop > 0) {
      this.scrollTop = 0;
      this.setState({
        transform: 'translateY(0px)'
        , transition: 'transform .5s ease'
      });
    } else if (this.scrollTop + this.mouse.canH < 0) {
      this.scrollTop = -this.mouse.canH;
      this.setState({
        transform: 'translateY(' + this.scrollTop + 'px)'
        , transition: 'transform .5s ease'
      });
    }
    this.mouse.state = 'off';
  }

  componentDidMount() {
    console.log('componentDidMount');
    let me = this;
    $.ajax({
      type: 'GET'
      , url: '/getmessage'
      , success: (messages) => {
        me.props.getAll(messages)
      }
      , error: () => {
        console.log('连接失败，请稍后再试')
      }
    })
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    let nowH,paddingBottom;
    this.mouse.outerH = this.messagesBox.clientHeight;
    this.mouse.innerH = this.messages.scrollHeight;
    paddingBottom=parseInt(getComputedStyle(this.messagesBox)['paddingBottom']);
    nowH=this.mouse.innerH - this.mouse.outerH +paddingBottom > 0 ? (this.mouse.innerH - this.mouse.outerH +paddingBottom) : 0;
    if(this.mouse.canH!==nowH){
      this.mouse.canH=nowH;
      this.scrollTop = -this.mouse.canH;
      this.setState({
        transform: 'translateY(' + this.scrollTop + 'px)'
        , transition: 'transform .5s ease'
      });
    }
  }

  render() {
    let messages = this.props.messages;

    let messagesBox = messages.map((message, index) => (
      <Message key={index} message={message}/>
    ));

    return (
      <div
        className="messagesBox"
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
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
