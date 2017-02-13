import React from 'react';
import $ from 'jquery';

class SignBtn extends React.Component{
  constructor(props){
    super(props)
  }

  logout(){
    $.ajax({
      type:'GET'
      ,url:'/logout'
      ,success:(datas) => {
        if(datas.state === 'success'){
          this.props.onLog(undefined)
        }else{
          console.log('获取数据失败，请稍后再试')
        }
      }
      ,error:() =>{
        console.log('连接失败，请稍后再试')
      }
    })
  }

  render(){
    let {name,onSign,onLog} = this.props;
    let html;
    if(name){
      let logIn = {
        text:name
      };
      let logOut = {
        text:'退出'
      };
      html = (
        <div className="user">
          <div className="signIn">
          <span>
            {logIn.text}
          </span>
          </div>
          <div className="signUp">
            <a onClick = {e => {
              e.preventDefault();
              this.logout();
            }}>
              {logOut.text}
            </a>
          </div>
        </div>
      )
    }else{
      let signIn = {
        text:'登陆'
      };
      let signUp = {
        text:'注册'
      };
      html = (
        <div className="user">
          <div className="signIn">
            <a onClick = {e => {
              e.preventDefault();
              onSign(signIn.text)
            }}>
              {signIn.text}
            </a>
          </div>
          <div className="signUp">
            <a onClick = {e => {
              e.preventDefault();
              onSign(signUp.text)
            }}>
              {signUp.text}
            </a>
          </div>
        </div>
      )
    }
    return html;
  }
}

export default SignBtn;
