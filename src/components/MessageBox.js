import React from 'react';
import $ from 'jquery';

function Message ({message}) {
    return(
      <li className="message">
        <div className="name">{message.from.name}:</div>
        <div className="time">{new Date(message.meta.createAt).toLocaleString()}</div>
        <div className="content">{message.content}</div>
      </li>
    )
}

class MessageBox extends React.Component{
  constructor(props){
    super(props);
    this.mouse={
      state:'off'
      ,outerH:0
      ,innerH:0
      ,canH:0
      ,moveH:0
      ,startH:0
      ,endH:0
    };
    this.state={
      transform:'translateY(0px)'
    }
  }

  handleMouseDown(e){
    this.mouse.state='on';
    this.mouse.startH=e.clientY;
  }

  handleMouseMove(e){
    var transform;
    if(this.mouse.state==='on'&&this.mouse.canH>0){
      this.mouse.moveH=e.clientY-this.mouse.startH;
      console.log(this.mouse.moveH);
      transform='translateY('+this.mouse.moveH+'px)';
      this.setState({
        transform:transform
      })
    }
  }

  handleMouseUp(){
    this.mouse.state='off';
  }

  componentDidMount(){
    console.log('mounted');
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
  componentDidUpdate(){
    console.log('update');
    this.mouse.outerH=this.messagesBox.clientHeight;
    this.mouse.innerH=this.messages.scrollHeight;
    this.mouse.canH=this.mouse.innerH-this.mouse.outerH>0?this.mouse.innerH-this.mouse.outerH:0;
  }
  render(){
    let messages=this.props.messages;

    let messagesBox=messages.map((message,index)=>(
      <Message key={index} message={message} />
    ));

    return(
      <div
        className="messagesBox"
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        ref={(box)=>{this.messagesBox=box}}
      >
        <ul
          style={this.state}
          ref={(ul)=>{this.messages=ul}}
        >
          {messagesBox}
        </ul>
      </div>
    )
  }
}

export default MessageBox
