import React from 'react';
import { Row, Col, Collapse, Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../style/Home.css';
import GameForm from './GameForm.js';
import logo from '../lit-logo.png';
import { List, Avatar } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
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
              <div style={{ width: '100%', height: '80%' }}>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  style={{ width: '100%', padding: '0 10px' }}
                  renderItem={(item) => (
                    <List.Item style={{ padding: '3px 0' }}>
                      <List.Item.Meta
                        title={<a href="https://ant.design">{item.title}</a>}
                      />
                      <div style={{ position: 'relative', bottom: '2px' }}>
                        Content
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
              <div style={{ width: '100%', padding: '15px' }}>
                <span style={{ float: 'left', fontSize: '2em' }}>Team Two</span>
                <span style={{ float: 'right', fontSize: '2em' }}>0</span>
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
