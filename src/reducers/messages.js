const messages = (state = [],action)=>{
  switch (action.type){
    case 'MESS':
      return state.concat(action.messages);
    default:
      return state
  }
};

export default messages;
