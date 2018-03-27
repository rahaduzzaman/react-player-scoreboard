import React, { Component } from 'react';

import './App.css';
import Scoreboard from './Scoreboard/scoreboard.js';

var PLAYERS = [
  {
    name: "Md Rahaduzzaman",
    score: 31,
    id: 1,
  },
  {
    name: "Md Rokunuzzaman",
    score: 35,
    id: 2,
  },
  {
    name: "Mazharul Islam",
    score: 42,
    id: 3,
  },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Scoreboard initialPlayers={PLAYERS} />
      </div>
    );
  }
}

export default App;
