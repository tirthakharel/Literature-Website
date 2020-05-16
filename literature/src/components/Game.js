import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import '../style/Home.css';
import logo from '../lit-logo.png';
import { List, Avatar } from 'antd';
import TeamInfo from './TeamInfo.js'

const teamOneData = [
  {
    name: 'Praneeth',
    numCards: 9
  },
  {
    name: 'Ishaan',
    numCards: 9
  },
  {
    name: 'Tirtha',
    numCards: 9
  },
  {
    name: 'Ashwin',
    numCards: 9
  },
];
const teamTwoData = [
  {
    name: 'Aditya',
    numCards: 9
  },
  {
    name: 'Rahul',
    numCards: 9
  },
  {
    name: 'Arjun',
    numCards: 9
  },
  {
    name: 'Ritvik',
    numCards: 9
  },
];

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
    };
  }

  render() {
    return (
      <Row className="bg">
        <img
          src={logo}
          alt="Literature logo"
          style={{ margin: '30px' }}
          width="200px"
        />
        <Row className="gameRow">
          <Col className="teamCol" lg={5} md={6}>
            <TeamInfo name="Team One" score={0} data={teamOneData} />
            <TeamInfo name="Team Two" score={0} data={teamTwoData} />
          </Col>
          <Col lg={17} md={16} className="gameCol">
            <Row 
              className="panel gamePanel"
              justify="center"
              align="middle"
            ></Row>
          </Col>
        </Row>
      </Row>
    );
  }
}
