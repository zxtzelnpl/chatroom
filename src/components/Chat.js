import React from 'react';
import $ from 'jquery';

class Message extends React.Component{
  render(){
    return(
      <div>
        <div className="name">{this.props.message.from.name}</div>
        <div className="time">{new Date(this.props.message.meta.createAt).toLocaleTimeString()}:</div>
        <div className="content">{this.props.message.content}</div>
      </div>
    )
  }
}

class MessageBox extends React.Component{
  constructor(props){
    super(props);
    this.state={
      messages:[]
    }
  }

  componentDidMount(){
    $.ajax({
      type:'GET'
      ,url:'/getmessage'
      ,success:(messages)=>{
        this.setState({
          messages:messages
        })
      }
      ,error:()=>{
        console.log('连接失败，请稍后再试')
      }
    })
  }
  render(){
    let messages=this.state.messages;

    console.log(messages);

    let messagesBox=messages.map((message)=>(
      <Message key={message.content} message={message} />
    ));

    console.log(messagesBox);

    return(
      <div>
        {messagesBox}
      </div>
    )
  }
}

class Input extends React.Component{

  handleClick(e){
    e.preventDefault();
    $.ajax({
      type:'GET'
      ,url:'/sendmessage'
      ,data:{
        content:this.textarea.value
      }
      ,success:(datas)=>{
        if(datas.state === 'success'){
          console.log('成功了')
        }else{
          console.log('获取数据失败，请稍后再试')
        }
      }
      ,error:()=>{
        console.log('连接失败，请稍后再试')
      }
    });
  }

  render(){
    return(
      <div className="chatInputBox">
        <div>
          <textarea name="chatMessage"
                    id="chatMessage"
                    cols="30"
                    rows="5"
                    ref={(textarea)=>{this.textarea=textarea}}
          />
        </div>
        <div>
          <a className="btn" onClick={this.handleClick.bind(this)}>提交</a>
        </div>
      </div>
    )
  }
}

class Chat extends React.Component{
  render(){
    return(
      <div className="chat">
        <MessageBox />
        <Input/>
      </div>
    )
  }
}

export default Chat;
