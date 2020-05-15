import React from 'react';
import { Row, Col, Collapse, Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../style/Home.css';
import GameForm from './GameForm.js';

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
        <Row style={{ width: '100%' }}>
          <Col span={8} offset={4} style={{ height: '100vh' }}>
            <Row align="middle" justify="center" style={{ height: '100%' }}>
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
          <Col span={8} style={{ height: '100vh' }}>
            <Row
              align="middle"
              justify="center"
              style={{
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <h1 style={{ textAlign: 'center' }}>How To Play</h1>
              <Collapse id="collapse" style={{ width: '80%' }} accordion>
                <Panel header="This is panel header 1" key="1">
                  <p>{'hi'}</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                  <p>{'hi'}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                  <p>{'hi'}</p>
                </Panel>
              </Collapse>
            </Row>
          </Col>
          <Col span={4} />
        </Row>
      </Row>
    );
  }
}
