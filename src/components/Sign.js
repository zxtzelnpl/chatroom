import React from 'react';

class Sign extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="signBox">
        <div className="userName">
          <label htmlFor="userName">用户名：</label>
          <input type="text" id="userName"/>
        </div>
        <div className="password">
          <label htmlFor="password">密码：</label>
          <input type="text" id="password"/>
        </div>
        <div className="button">
          <span className="btn">{this.props.text}</span>
          <a className="btn" onClick = {
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
