let initialState= document.getElementById('INITIAL_STATE_LOG')?document.getElementById('INITIAL_STATE_LOG').value:undefined;
const log = (state = {name:initialState}, action) => {

  switch (action.type) {
    case 'LOG':
      return {
        name: action.name
      };
    default:
      return state
  }
};


export default log;
