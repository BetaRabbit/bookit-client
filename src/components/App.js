import React, { Component } from 'react';

import Appbar from 'material-ui/AppBar';

import VoteSession from './VoteSession';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Appbar
          title="Book it"
          showMenuIconButton={false}
          style={{ position: 'fixed' }}
        />
        <div className="main-content">
          <VoteSession />
        </div>
      </div>
    );
  }
}

export default App;
