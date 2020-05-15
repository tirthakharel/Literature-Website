import React from 'react';
import { Row, Col, Collapse, Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../style/Home.css';
import GameForm from './GameForm.js';
import logo from '../lit-logo.png';

const { Panel } = Collapse;
const { TabPane } = Tabs;

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
    };
  }

  render() {
    return (
      <Row
        className="bg"
        align="middle"
        justify="center"
        style={{ flexDirection: 'column' }}
      >
        <img
          src={logo}
          alt="Literature logo"
          style={{ marginTop: '15vh', marginBottom: '10vh' }}
          width="750px"
        />
        <Row style={{ width: '100%' }}>
          <Col
            style={{
              border: '1px solid black',
              marginRight: '10px',
              borderRadius: '10px',
              height: '400px',
              paddingTop: '25px',
              boxShadow: '0px 6px 15px 0px #8e8e8e',
              backgroundColor: '#ffffff',
            }}
            span={6}
            offset={6}
          >
            <Row
              justify="center"
              align="middle"
              style={{ flexDirection: 'column' }}
            >
              <h1 style={{ textAlign: 'center' }}>Hi!</h1>
              <Tabs defaultActiveKey="1" style={{ width: '75%' }}>
                <TabPane tab="Join Game" key="1">
                  {<GameForm />}
                </TabPane>
                <TabPane tab="Create Game" key="2">
                  {<GameForm />}
                </TabPane>
              </Tabs>
            </Row>
          </Col>
          <Col
            span={6}
            style={{
              border: '1px solid black',
              borderRadius: '10px',
              marginLeft: '10px',
              height: '400px',
              paddingTop: '25px',
              boxShadow: '0px 6px 15px 0px #8e8e8e',
              backgroundColor: '#ffffff',
            }}
          >
            <Row
              justify="center"
              align="middle"
              style={{
                flexDirection: 'column',
              }}
            >
              <h1 style={{ textAlign: 'center' }}>How To Play</h1>
              <Tabs defaultActiveKey="1" style={{ width: '75%' }}>
                <TabPane tab="How To Play" key="1">
                  these are soem
                </TabPane>
                <TabPane tab="2" key="2">
                  instructions
                </TabPane>
              </Tabs>
            </Row>
          </Col>
          <Col span={6} />
        </Row>
      </Row>
    );
  }
}
