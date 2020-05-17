import React from 'react';
import { Row, Col } from 'antd';
import Card from './Card';
import 'antd/dist/antd.css';
import '../style/Home.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  render() {
    //let cardRow = this.state.cards.map((card, index) => <Card key={index} rank={card.rank} suit={card.suit} set={card.set} />);

    return (
      <Row className="cardrow">
        <Card suit="Clubs" rank="4" set="Low Clubs" />
        <Card suit="Clubs" rank="5" set="Low Clubs" />
        <Card suit="Clubs" rank="6" set="Low Clubs" />
        <Card suit="Clubs" rank="4" set="Low Clubs" />
        <Card suit="Clubs" rank="5" set="Low Clubs" />
        <Card suit="Clubs" rank="6" set="Low Clubs" />
        <Card suit="Clubs" rank="4" set="Low Clubs" />
        <Card suit="Clubs" rank="4" set="Low Clubs" />
        <Card suit="Clubs" rank="4" set="Low Clubs" />
        <Card suit="Clubs" rank="4" set="Low Clubs" />
      </Row>
    );
  }
}
