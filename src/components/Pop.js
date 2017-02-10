import React from 'react';
import Sign from '../containers/Sign'

class Pop extends React.Component{

  constructor(props){
    super(props);
  }

  render(){

    let style;

    if(this.props.text=='关闭'){
      style = {display:'none'}
    }

    return(
      <div className="popBox" style={style}>
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
