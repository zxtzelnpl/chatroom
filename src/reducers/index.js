import { combineReducers } from 'redux'
import sign from './sign'
import log from './log'
import messages from './messages'

const reducer = combineReducers({
  sign
  ,log
  ,messages
});

export default reducer
