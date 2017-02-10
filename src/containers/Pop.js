import React from 'react';
import {connect} from 'react-redux';
import Pop from '../components/Pop';

const mapStateToProps = (state) => ({
  text: state.sign.text
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});




let _Pop = connect(mapStateToProps,mapDispatchToProps)(Pop);

export default _Pop;
