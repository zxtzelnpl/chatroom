import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Chat from './components/Chat';
import Nav from './components/Nav';
import Video from './components/Video';


class Main extends React.Component{
  render(){
    return(
      <div className="main">
        <Nav />
        <Video />
        <Chat />
      </div>
      )
  }
}

class Body extends React.Component{
    render(){
    return(
      <div className="app">
        <Header />
        <Main />
      </div>
    )
  }
}

ReactDOM.render(<Body />,document.getElementById('app'));

