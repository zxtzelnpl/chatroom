import React from 'react';

class Header extends React.Component{
  render(){
    return(
      <div className="header">
        <div className="title">
          <img src="/images/title.png" alt=""/>
        </div>
        <div className="onLines">
          <span>在线人数：</span><span>0</span>
        </div>
        <div className="user">
          <div className="signIn"><a href="">登陆</a></div>
          <div className="signUp"><a href="">注册</a></div>
        </div>
      </div>
    )
  }
}

export default Header;
