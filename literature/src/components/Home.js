import React from 'react';
import { Row, Col, Collapse, Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../style/Home.css';
import GameForm from './GameForm.js';
import logo from '../lit-logo.png';
import io from "socket.io-client";

const connection = process.env.NODE_ENV === 'development' ?
  'http://localhost:5000' : undefined;

const { Panel } = Collapse;
const { TabPane } = Tabs;

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
    };
  }

  componentWillMount() {
    this.socket = io(connection);
  }

  render() {
    return (
      <Row className="bg" align="middle" justify="center">
        <img
          className="homeImg"
          src={logo}
          alt="Literature Logo"
          style={{ marginTop: '10vh', marginBottom: '10vh' }}
          width="550px"
        />
        <Row style={{ width: '100%' }}>
          <Col className="homeCol" sm={12} align="right">
            <div align="left" className="panel homePanel">
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
                    {<GameForm play={this.props.play} text="Join Game" socket={this.socket} />}
                  </TabPane>
                  <TabPane tab="Create Game" key="2">
                    {<GameForm play={this.props.play} text="Create Game" socket={this.socket} />}
                  </TabPane>
                </Tabs>
              </Row>
              </div>
          </Col>
          <Col className="homeCol" sm={12}>
            <div class="panel homePanel">
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
            </div>
          </Col>
        </Row>
      </Row>
    );
  }
}
