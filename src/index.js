import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import Header from './containers/Header';
import Chat from './components/Chat';
import Nav from './components/Nav';
import Video from './components/Video';

import Pop from './containers/Pop';

import reducer from './reducers';
import {Provider} from 'react-redux';

import {messages,onlines} from './actions';

import socket from './socket/socket';

const store = createStore(reducer);

socket.on('chat message',function(msg){
  console.log(msg);
  store.dispatch(messages(msg));
});

socket.on('online',function(msg){
  store.dispatch(onlines(msg))
});


class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <Nav />
        <Video />
        <Chat />
      </div>
    )
  }
}

class Body extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Main />
        <Pop />
      </div>
    )
  }
}

const render = () => {
  console.log(store.getState());
  ReactDOM.render(
    <Provider store={store}>
      <Body />
    </Provider>, document.getElementById('app')
  )
};



render();
store.subscribe(render);



