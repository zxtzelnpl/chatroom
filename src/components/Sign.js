import React from 'react';
import $ from 'jquery';

class Sign extends React.Component{
  constructor(props){
    super(props)
  }

  sign(type,name,password){
    const me=this;

    $.ajax({
      type:'POST'
      ,url:'/'+type
      ,data:{
        name:name
        ,password:password
      }
      ,success:(datas) =>{
        if(datas.state === 'success'){

          me.props.onLog(datas.name);
          this.props.onSign('关闭');
        }
        else if (datas.state === 'fail'){
          console.log(datas)
        }
        else{
          console.log('获取数据失败，请稍后再试')
        }
      }
      ,error:() =>{
        console.log('连接失败，请稍后再试')
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
             onClick = {()=>{
               this.sign(type,inputName.value,inputPassword.value)
             }}
          >
            {this.props.type}
            </a>
          <a className="btn"
             onClick = {
            e => {
              e.preventDefault();
              this.props.onSign('关闭')
            }
          }>关闭</a>
        </div>
      </div>
    )
  }
}

export default Sign;
