import React from 'react';
import logo from './logo.svg';
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
      play: true,
      players: [],
      code: null,
      assign: false,
    };
    this.play = this.play.bind(this);
    this.assign = this.assign.bind(this);
  }
  play() {
    this.setState({ play: true });
  }
  assign() {
    this.setState({ assign: true });
  }

  componentWillMount() {
    this.socket = io(connection);
    this.socket.on('gameData', (data) => {
      this.setState({ players: data.players });
      this.setState({ code: data.code });
    });
  }

  render() {
    console.log(document.cookie, 'here');
    return (
      <div className="background">
        {this.state.play ? (
          <Game />
        ) : this.state.assign ? (
          <Assign players={this.state.players} socket={this.socket} />
        ) : (
          <Home socket={this.socket} assign={this.assign} />
        )}
      </div>
    );
  }
}
