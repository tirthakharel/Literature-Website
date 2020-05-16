import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: '',
    };
  }

  componentDidMount() {
    const { rank, suit, set } = this.props;

    let path = `../resources/cards/${set}/${rank.charAt(0)}${suit.charAt(
      0
    )}.png`;

    this.setState({ path });
  }

  render() {
    if (this.state.path !== '') {
      return (
        <div className="cardwrapper">
          <img src={this.state.path} alt={'card'} />
        </div>
      );
    }

    return <div></div>;
  }
}
