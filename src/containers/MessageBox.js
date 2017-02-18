import {connect} from 'react-redux';
import {messages} from '../actions'
import MessageBox from '../components/MessageBox';

const mapStateToProps = (state, ownProps) => ({
  messages: state.messages
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAll: (datas) => {
    dispatch(messages(datas))
  }
});

const _MessageBox = connect(
  mapStateToProps
  , mapDispatchToProps
)(MessageBox);

export default _MessageBox;
