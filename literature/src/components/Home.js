import React from 'react';
import GameForm from './GameForm.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
    };
  }

  render() {
    return <GameForm />;
  }
}
