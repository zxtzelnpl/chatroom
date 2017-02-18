import {connect} from 'react-redux';
import {messages} from '../actions'
import Input from '../components/Input';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendOne: (datas) => {
    console.log(datas);
    dispatch(messages(datas))
  }
});

const _Input = connect(
  mapStateToProps
  , mapDispatchToProps
)(Input);

export default _Input;
