import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Header Component
const Header = (props) => {
  return (
    <div className="header">
    <h1>{props.title}</h1>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// Counter Class Component
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
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
        <div className="counter-score">{this.state.score}</div>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
    );
  }
}
Counter.propTypes = {
  score: PropTypes.number.isRequired
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
        <Counter score={props.score} />
      </div>
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
};

const scoreboard = (props) => {
  return (
    <div className="scoreboard">
      <Header title = {props.title}/>

      <div className="players">
        <Player name="Md Rahaduzzaman" score={36} />
        <Player name="Md Mazharul Islam" score={33} />
      </div>
    </div>
  )
};

scoreboard.defaultProps = {
  title: "Scoreboard"
}
export default scoreboard;