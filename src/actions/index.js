export const sign = (text) =>({
    type:'SIGN',
    text
});

export const log = (name) =>({
    type:'LOG',
    name
});

export const messages = (messages) => ({
  type:'MESS',
  messages
});

export const onlines = (number) =>({
  type:'ONLINE'
  ,number
});
