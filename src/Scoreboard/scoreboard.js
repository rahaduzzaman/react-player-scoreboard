import React from 'react';
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

// Counter Component
const Counter = (props) => {
  return (
    <div className="counter">
      <button className="counter-action decrement"> - </button>
      <div className="counter-score">{props.score}</div>
      <button className="counter-action increment"> + </button>
    </div>
  );
};
Counter.propTypes = {
  score: PropTypes.number.isRequired
};

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