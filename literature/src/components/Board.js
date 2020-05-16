import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import '../style/Home.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  render() {
    return <Row className="bg"></Row>;
  }
}
