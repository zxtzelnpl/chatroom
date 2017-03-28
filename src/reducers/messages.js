let initialState= JSON.parse(document.getElementById('INITIAL_STATE_MES').value);
const messages = (state = initialState,action)=>{
  switch (action.type){
    case 'MESS':
      return state.concat(action.messages);
    default:
      return state
  }
};

export default messages;
