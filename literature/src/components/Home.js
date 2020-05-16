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
      >
        <img
          src={logo}
          alt="Literature Logo"
          style={{ marginTop: '10vh', marginBottom: '10vh' }}
          width="550px"
        />
        <Row style={{ width: '100%' }}>
          <Col 
            className="panel"
            style={{
              marginRight: '10px',
              height: '400px',
              paddingTop: '25px',
            }}
            span={6}
            offset={6}
          >
            <Row
              justify="center"
              align="middle"
              style={{ flexDirection: 'column' }}
            >
              <Tabs
                defaultActiveKey="1"
                style={{ width: '75%', marginTop: '10%' }}
              >
                <TabPane tab="Join Game" key="1">
                  {<GameForm text="Join Game" />}
                </TabPane>
                <TabPane tab="Create Game" key="2">
                  {<GameForm text="Create Game" />}
                </TabPane>
              </Tabs>
            </Row>
          </Col>
          <Col 
            className="panel"
            span={6}
            style={{
              marginLeft: '10px',
              height: '400px',
              paddingTop: '25px',
            }}
          >
            <Row
              justify="center"
              align="middle"
              style={{
                flexDirection: 'column',
              }}
            >
              <Tabs
                defaultActiveKey="1"
                style={{ width: '75%', marginTop: '10%' }}
              >
                <TabPane tab="How To Play" key="1">
                  These are some
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
