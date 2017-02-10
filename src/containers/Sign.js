import React from 'react';
import {connect} from 'react-redux';
import {sign} from '../actions';
import Sign from '../components/Sign';

const mapStateToProps = (state) => ({
  text: state.sign.text
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (text) => {
    dispatch(sign(text))
  }
});

let _Sign = connect(mapStateToProps, mapDispatchToProps)(Sign);

export default _Sign;
