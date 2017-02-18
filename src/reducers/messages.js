const messages = (state = [],action)=>{
  switch (action.type){
    case 'MES':
      state.push(action.message);
      return state;
    case 'MESS':
      return state.concat(action.messages);
    default:
      return state
  }
};

export default messages;
