import { combineReducers } from 'redux'
import sign from './sign'
import log from './log'
import messages from './messages'
import onlines from './onlines'

const reducer = combineReducers({
  sign
  ,log
  ,messages
  ,onlines
});

export default reducer
