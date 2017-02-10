import React from 'react';
import Sign from './Sign';

class Pop extends React.Component{
  render(){
    return(
      <div className="popBox">
        <div className="close">

        </div>
        <div className="box">
          <Sign />
        </div>
      </div>
    )
  }
}

export default Pop;
