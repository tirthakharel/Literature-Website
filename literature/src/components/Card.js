import React from 'react';
import '../style/Card.css';
const images = require.context('../resources/cards', true);

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: '',
      clicked: false,
    };
  }

  componentDidMount() {
    let { rank, suit, set } = this.props;
    if (rank !== '10') {
      rank = rank.charAt(0);
    }
    let path = `./${set.replace(/ /g, '_')}/${rank}${suit.charAt(0)}.png`;
    this.setState({ path });
  }

  componentDidUpdate(prevProps, prevState) {
    let { rank, suit, set } = this.props;
    if (rank !== '10') {
      rank = rank.charAt(0);
    }
    let path = `./${set.replace(/ /g, '_')}/${rank}${suit.charAt(0)}.png`;
    if (path !== prevState.path) {
      this.setState({ path });
    }
  }

  render() {
    if (this.state.path !== '') {
      if (this.props.type === 'ask') {
        return (
          <div className="askwrapper">
            <label>
              <input
                onClick={this.props.clickFunc}
                type="radio"
                name="test"
                data-suit={this.props.suit}
                data-rank={this.props.rank}
                data-set={this.props.set}
              />
              <img
                width="100%"
                src={images(`${this.state.path}`)}
                alt={'card'}
              />
            </label>
          </div>
        );
      } else if (this.props.type === 'board') {
        return (
          <div className="cardwrapper">
            <img width="100%" src={images(`${this.state.path}`)} alt={'card'} />
          </div>
        );
      }
    }

    return <div></div>;
  }
}
