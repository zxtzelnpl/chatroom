import React from 'react';
import SignBtn from '../containers/SignBtn'

class Header extends React.Component{
  render(){

    return(
      <div className="header">
        <div className="title">
          <img src="/images/title.png" alt=""/>
        </div>
        <div className="onLines">
          <span>在线人数：</span><span>{this.props.number}</span>
        </div>
        <SignBtn />
      </div>
    )
  }
}

export default Header;
