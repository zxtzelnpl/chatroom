const onlines = (state = 0,action)=>{
  switch (action.type){
    case 'ONLINE':
      return action.number;
    default:
      return state
  }
};

export default onlines;
