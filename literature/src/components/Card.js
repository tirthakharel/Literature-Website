import React from 'react';
import '../style/Card.css';
const images = require.context('../resources/cards', true);

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: '',
    };
  }

  componentDidMount() {
    const { rank, suit, set } = this.props;

    let path = `./${set.replace(/ /g, '_')}/${rank.charAt(0)}${suit.charAt(
      0
    )}.png`;

    this.setState({ path });
  }

  render() {
    if (this.state.path !== '') {
      return (
        <div className="cardwrapper">
          <img width="100%" src={images(`${this.state.path}`)} alt={'card'} />
        </div>
      );
    }

    return <div></div>;
  }
}
