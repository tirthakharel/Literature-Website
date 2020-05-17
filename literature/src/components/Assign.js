import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div className="background">
        <ul>
        {this.props.players.map(item => {
          return <li>{item.name}</li>;
        })}
      </ul>
      </div>
    );
  }
}
