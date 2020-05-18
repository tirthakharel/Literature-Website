import React from 'react';
import { Row, List } from 'antd';
import '../style/Home.css';
import 'antd/dist/antd.css';
const icons = require.context('../resources/icons');

export default class TeamInfo extends React.Component {
  render() {
    return (
      <Row className="panel teamPanel">
        <div className="teamHeader">
          <div>{this.props.name}</div>
          <div>{this.props.score}</div>
        </div>
        <div className="members">
          <List
            itemLayout="horizontal"
            dataSource={this.props.data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.name} />
                <div style={{ position: 'relative', bottom: '2px' }}>
                  {item.hand.length}
                </div>
              </List.Item>
            )}
          />
          <div className="declared-sets">
            <img
              src={icons(`./low_clubs.png`)}
              width="40px"
              alt="declared set"
            />
            <img src={icons(`./jokers.png`)} width="60px" alt="declared set" />
          </div>
        </div>
      </Row>
    );
  }
}
