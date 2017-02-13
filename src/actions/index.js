export const sign = (text) =>{
  return{
    type:'SIGN',
    text
  }
};

export const log = (name) =>{
  return{
    type:'LOG',
    name
  }
};
