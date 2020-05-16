import React from 'react';
import { Row, Col, Collapse, Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../style/Home.css';
import GameForm from './GameForm.js';
import logo from '../lit-logo.png';
import { List, Avatar } from 'antd';

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
            span={5}
          >
            <Row
              style={{
                flex: '1',
                borderRadius: '10px',
                boxShadow: '0px 6px 15px 0px #8e8e8e',
                backgroundColor: '#ffffff',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  padding: '15px 15px 0 15px',
                  height: '20%',
                }}
              >
                <div style={{ float: 'left', fontSize: '2em' }}>Team One</div>
                <div style={{ float: 'right', fontSize: '2em' }}>0</div>
              </div>
              <div style={{ width: '100%', height: '80%', padding: '15px' }}>
                <List
                  itemLayout="horizontal"
                  dataSource={teamOneData}
                  style={{ width: '100%', padding: '0 10px' }}
                  renderItem={(item) => (
                    <List.Item style={{ padding: '3px 0' }}>
                      <List.Item.Meta
                        title={<a href="https://ant.design">{item.name}</a>}
                      />
                      <div style={{ position: 'relative', bottom: '2px' }}>
                        {item.numCards}
                      </div>
                    </List.Item>
                  )}
                />
                <div
                  style={{
                    width: '100%',
                    display: 'block',
                    fontSize: '1em',
                    padding: '10px',
                  }}
                >
                  Declared sets
                </div>
              </div>
            </Row>
            <Row
              justify="center"
              style={{
                flex: '1',
                borderRadius: '10px',
                boxShadow: '0px 6px 15px 0px #8e8e8e',
                backgroundColor: '#ffffff',
              }}
            >
              <div
                style={{
                  width: '100%',
                  padding: '15px 15px 0 15px',
                  height: '20%',
                }}
              >
                <div style={{ float: 'left', fontSize: '2em' }}>Team Two</div>
                <div style={{ float: 'right', fontSize: '2em' }}>0</div>
              </div>
              <div style={{ width: '100%', height: '80%', padding: '15px' }}>
                <List
                  itemLayout="horizontal"
                  dataSource={teamTwoData}
                  style={{ width: '100%', padding: '0 10px' }}
                  renderItem={(item) => (
                    <List.Item style={{ padding: '3px 0' }}>
                      <List.Item.Meta
                        title={<a href="https://ant.design">{item.name}</a>}
                      />
                      <div style={{ position: 'relative', bottom: '2px' }}>
                        {item.numCards}
                      </div>
                    </List.Item>
                  )}
                />
                <div
                  style={{
                    width: '100%',
                    display: 'block',
                    fontSize: '1em',
                    padding: '10px',
                  }}
                >
                  Declared sets
                </div>
              </div>
            </Row>
          </Col>
          <Col span={17} style={{ marginLeft: '30px' }}>
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
