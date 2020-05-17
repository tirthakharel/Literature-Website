import React from 'react';
import logo from './logo.svg';
import Home from './components/Home';
import Game from './components/Game';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
    };
    this.play = this.play.bind(this);
  }
  play() {
    this.setState({ play: true });
  }

  render() {
    return (
      <div className="background">
        { this.state.play ?
          <Game /> :
          <Home play={this.play} />
        }
      </div>
    );
  }
}
