import React from 'react';
import {connect} from 'react-redux';
import {sign} from '../actions';

const mapStateToProps = (state, ownProps) => ({
  //
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (text) => {
    dispatch(sign(text))
  }
});

let SignBtn = ({onClick}) => {
  let signIn = {
    text:'登陆'
  };
  let signUp = {
    text:'注册'
  };

  return (
    <div className="user">
      <div className="signIn">
        <a onClick = {e => {
          e.preventDefault();
          onClick(signIn.text)
        }}>
          {signIn.text}
        </a>
      </div>
      <div className="signUp">
        <a onClick = {e => {
          e.preventDefault();
          onClick(signUp.text)
        }}>
          {signUp.text}
        </a>
      </div>
    </div>
  )

};

const _SignBtn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignBtn);

export default _SignBtn;
