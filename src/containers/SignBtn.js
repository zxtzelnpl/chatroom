import {connect} from 'react-redux';
import {sign,log} from '../actions';
import SignBtn from '../components/SignBtn'

const mapStateToProps = (state, ownProps) => ({
  name:state.log.name
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSign: (text) => {
    dispatch(sign(text))
  }
  ,onLog:(name) =>{
    dispatch(log(name))
  }
});

const _SignBtn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignBtn);

export default _SignBtn;
