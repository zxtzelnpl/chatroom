export const sign = (text) =>({
    type:'SIGN',
    text
});

export const log = (name) =>({
    type:'LOG',
    name
});

export const message = (message) => ({
  type:'MES',
  message
});

export const messages = (messages) => ({
  type:'MESS',
  messages
});
