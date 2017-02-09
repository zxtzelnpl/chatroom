import React from 'react';

class Header extends React.Component{
  render(){
    return(
      <div className="Header">
        <div className="title">

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
