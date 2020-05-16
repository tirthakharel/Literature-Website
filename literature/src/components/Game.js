import React from 'react';
import { Row, Col, Collapse, Tabs } from 'antd';
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
const { Panel } = Collapse;
const { TabPane } = Tabs;

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
    };
  }

  render() {
    return (
      <Row className="bg" style={{ flexDirection: 'column' }}>
        <img
          src={logo}
          alt="Literature logo"
          style={{ margin: '30px' }}
          width="200px"
        />
        <Row style={{ width: '100%', flexDirection: 'row' }}>
          <Col
            style={{
              height: '80vh',
              marginLeft: '30px',
              display: 'flex',
              flexDirection: 'column',
            }}
            lg={5} xs={6}
          >
            <TeamInfo name="Team One" score={0} data={teamOneData} />
            <TeamInfo name="Team Two" score={0} data={teamTwoData} />
          </Col>
          <Col lg={17} xs={16} style={{ marginLeft: '30px' }}>
            <Row
              justify="center"
              align="middle"
              style={{
                flex: '1',
                borderRadius: '10px',
                paddingTop: '25px',
                boxShadow: '0px 6px 15px 0px #8e8e8e',
                backgroundColor: '#ffffff',
                marginBottom: '20px',
                height: '100%',
              }}
            ></Row>
          </Col>
        </Row>
      </Row>
    );
  }
}
