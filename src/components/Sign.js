import React from 'react';
import $ from 'jquery';

class Sign extends React.Component{
  constructor(props){
    super(props)
  }

  sign(type,name,password){
    $.ajax({
      method:'POST'
      ,url:'/'+type
      ,data:{
        name:name
        ,password:password
      }
      ,success:() =>{
        console.log('success')
      }
      ,fail:() =>{
        console.log('fail')
      }
    })
  }

  render(){
    let type,inputName,inputPassword;
    if(this.props.type == '登陆'){
      type='signin'
    }
    else if(this.props.type == '注册'){
      type = 'signup'
    }
    return (
      <div className="signBox">
        <div className="userName">
          <label htmlFor="userName">用户名：</label>
          <input type="text"
                 id="userName"
                 ref = {input => {inputName = input}}
          />
        </div>
        <div className="password">
          <label htmlFor="password">密码：</label>
          <input type="text"
                 id="password"
                 ref = {input => {inputPassword = input}}
          />
        </div>
        <div className="button">
          <a className="btn"
             onClick = {(type,inputName,inputPassword)=>{
               this.sign(type,inputName,inputPassword)
             }}
          >
            {this.props.type}
            </a>
          <a className="btn"
             onClick = {
            e => {
              e.preventDefault();
              this.props.onClick('关闭')
            }
          }>关闭</a>
        </div>
      </div>
    )
  }
}

export default Sign;
