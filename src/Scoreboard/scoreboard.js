import React, { Component } from 'react';
import PropTypes from 'prop-types';


// As three player already loaded while initialyzing the app, let new player id starts with 4
var nextID = 4;
// Stopwatch Component
class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    };
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onTick = this.onTick.bind(this);
  }
  componentDidMount() {
    this.interval = setInterval(
      () => this.onTick(),
      100
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onTick() {
    if(this.state.running){
      var now  = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
    console.log('onTick');
  }
  
  onStart(){
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  }
  onStop(){
    this.setState({running: false});
  }
  onReset(){
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  }
  render() {
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return(
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        {
          this.state.running ?
          <button onClick={this.onStop}>Stop</button>
          :
          <button onClick={this.onStart}>Start</button> 
        }
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
}

// AddPlayerForm form component class
class AddPlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  }

  onNameChange(e) {
    return(
      this.setState({
        name: e.target.value,
      })
    );
  }

  render() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange} />
          <input type="submit" value="Add Player"/>
        </form>
      </div>
    );
  }
}

AddPlayerForm.propTypes = {
  onAdd: PropTypes.func.isRequired
};

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
      <Stopwatch time={0} />
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
        <a className="remove-player" onClick={props.onRemove}>X</a>
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
  onScoreChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

// Application Component Class 
class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.initialPlayers,
    };
    this.onScoreChange = this.onScoreChange.bind(this);
    this.onPlayerAdd = this.onPlayerAdd.bind(this);
    this.onRemovePlayer = this.onRemovePlayer.bind(this);
  };

  onScoreChange(index, delta) {
    console.log('onScoreChange: ', index, delta);
    this.state.players[index].score += delta;
    this.setState(this.state);
  }
  
  onPlayerAdd(name){
    console.log('New Player Name: ', name);
    this.state.players.push({
      name: name,
      score: 0,
      id: nextID
    });
    this.setState(this.state);
    nextID += 1;
  }
  onRemovePlayer(index) {
    this.state.players.splice(index, 1);
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
                onRemove={()=>{this.onRemovePlayer(index)}} 
                name={player.name} 
                score={player.score} 
                key={player.id} />
              ); 
            })
          }
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd} />
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