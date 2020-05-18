import React from 'react';
import '../style/Card.css';
import { Button } from 'antd';
const images = require.context('../resources/cards', true);

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: '',
      clicked: false
    };

    this.handleAsk.bind(this);
  }

  handleAsk(e) {
    console.log(e.target.value);
  }

  componentDidMount() {
    let { rank, suit, set } = this.props;
    if (rank !== "10") {
      rank = rank.charAt(0);
    }
    let path = `./${set.replace(/ /g, '_')}/${rank}${suit.charAt(0)}.png`;
    this.setState({ path });
  }

  render() {
    if (this.state.path !== '') {
      if (this.props.type === 'ask') {
        return (
          <div className="askwrapper">
            <label>
              <input onClick={this.handleAsk} type="radio" name="test" value={this.props.rank + "_" + this.props.suit} />
              <img width="100%" src={images(`${this.state.path}`)} alt={'card'} />
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
