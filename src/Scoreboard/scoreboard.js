import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Stats = (props) => {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce((total, player)=>{
    return total += player.score;
  },0);
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Totalscore:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
};

Stats.propTypes = {
  players: PropTypes.array.isRequired,
};

// Header Component
const Header = (props) => {
  return (
    <div className="header">
    <Stats players = {props.players} />
    <h1>{props.title}</h1>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
};
/*
//Counter Class Component
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score,
    };
    this.incrementScore = this.incrementScore.bind(this);
    this.decrementScore = this.decrementScore.bind(this);
  }

  incrementScore() {
    this.setState({
      score: (this.state.score + 1),
    });
  }
  decrementScore() {
    this.setState({
      score: (this.state.score - 1),
    });
  }

  render() {
    
  }
}
*/
// Counter Component
const Counter = (props) => {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function(){props.onChange(-1);}}> - </button>
      <div className="counter-score">{props.score}</div>
      <button className="counter-action increment" onClick={function(){props.onChange(1);}}> + </button>
    </div>
  );
};
Counter.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
Counter.defaultProps = { score: 0 };
// Player Component
const Player = (props) => {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired
};

// Application Component Class 
class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.initialPlayers,
    };
    this.onScoreChange = this.onScoreChange.bind(this);
    // this.decrementScore = this.decrementScore.bind(this);
  };

  onScoreChange(index, delta) {
    console.log('onScoreChange: ', index, delta);
    this.state.players[index].score += delta;
    this.setState(this.state);
  }

  render() {
    return (
      <div className="scoreboard">
        <Header title = {this.props.title} players= {this.state.players}/>
  
        <div className="players">
          {
            this.state.players.map((player, index) => {
              return(
                <Player
                onScoreChange={(delta)=>{this.onScoreChange(index,delta)}} 
                name={player.name} 
                score={player.score} 
                key={player.id} />
              ); 
            })
          }
        </div>
      </div>
    );
  }
}

Scoreboard.propTypes = {
  title: PropTypes.string.isRequired,
  initialPlayers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired
};

Scoreboard.defaultProps = {
  title: "Scoreboard"
}
export default Scoreboard;