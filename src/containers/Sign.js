import {connect} from 'react-redux';
import {sign,log} from '../actions';
import Sign from '../components/Sign';

const mapStateToProps = (state) => ({
  type: state.sign.text
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSign: (text) => {
    dispatch(sign(text))
  }
  ,onLog:(name) =>{
    dispatch(log(name))
  }
});

let _Sign = connect(mapStateToProps, mapDispatchToProps)(Sign);

export default _Sign;
