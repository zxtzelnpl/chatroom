const sign = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        text: action.text
      };
    case 'SIGN_UP':
      return {
        text: action.text
      };
    case 'CLOSE':
      return {
        text: action.text
      }
  }
};


export default sign;
