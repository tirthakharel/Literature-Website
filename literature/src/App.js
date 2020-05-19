import React from 'react';
import Home from './components/Home';
import Game from './components/Game';
import Assign from './components/Assign';
import './App.css';
import io from 'socket.io-client';

const connection =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : undefined;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      game: null,
      playerName: null,
      assign: false,
    };
    this.assign = this.assign.bind(this);
  }

  assign(playerName) {
    this.setState({
      assign: true,
      playerName: playerName,
    });
  }

  componentWillMount() {
    this.socket = io(connection);

    let persistentData = window.localStorage.getItem('lit-game-user');

    if (persistentData !== null) {
      let info = JSON.parse(persistentData);
      let user = info.user;
      let game = info.gameCode;
      console.log(info);
      this.socket.emit('reconnect', { user, game }, (err) => {
        if (err) {
          window.localStorage.removeItem('lit-game-user');
        }
      });
    }

    this.socket.on('gameData', (data) => {
      console.log('received game data');
      this.setState({ game: data.game });
      if (data.game.started) {
        this.setState({ play: true });
      } else {
        this.setState({ play: false });
      }
    });
  }

  render() {
    //console.log(document.cookie, 'here');
    return (
      <div className="background">
        {this.state.play ? (
          <Game
            playerName={this.state.playerName}
            game={this.state.game}
            socket={this.socket}
          />
        ) : this.state.assign ? (
          <Assign
            playerName={this.state.playerName}
            game={this.state.game}
            socket={this.socket}
          />
        ) : (
          <Home socket={this.socket} assign={this.assign} />
        )}
      </div>
    );
  }
}
