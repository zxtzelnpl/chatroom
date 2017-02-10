import React from 'react';

class Sign extends React.Component{
  render(){
    return(
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
            <span className="btn">提交</span>
          </div>
        </div>
      )
  }
}

export default Sign
