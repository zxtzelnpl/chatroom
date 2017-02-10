import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import Header from './components/Header';
import Chat from './components/Chat';
import Nav from './components/Nav';
import Video from './components/Video';

import Pop from './containers/Pop';

import reducer from './reducers';
import {Provider} from 'react-redux';

const store = createStore(reducer);


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

  ReactDOM.render(
    <Provider store={store}>
      <Body />
    </Provider>, document.getElementById('app')
  )
};

render();
store.subscribe(render);

