const sign = (state = {text:'关闭'}, action) => {
  switch (action.type) {
    case 'SIGN':
      return {
        text: action.text
      };
    default:
      return state
  }
};


export default sign;
