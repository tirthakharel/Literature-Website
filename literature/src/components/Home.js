import React from 'react';
import { Row, Col, Collapse, Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../style/Home.css'
import GameForm from './GameForm.js'

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
    return <Row className="bg" justify="start">
      <Col span={12}>
        <Row
          align="middle"
          justify="center"
          >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Join Game" key="1">
            <GameForm />
          </TabPane>
          <TabPane tab="Create Game" key="2">
            <GameForm />
          </TabPane>
        </Tabs>
        </Row>
      </Col>
      <Col span={12}>
        <h1>How To Play</h1> 
        <Row
            align="middle"
            justify="center"
            style={{
              height: "100%",
            }}
          >
          <Collapse id="collapse" accordion>
            <Panel header="This is panel header 1" key="1">
              <p>{"hi"}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{"hi"}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{"hi"}</p>
            </Panel>
          </Collapse>
        </Row>
      </Col>
    </Row>;
  }
}
