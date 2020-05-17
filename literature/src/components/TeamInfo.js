import React from 'react';
import { Row, List } from 'antd';
import '../style/Home.css';
import 'antd/dist/antd.css';
const icons = require.context('../resources/icons');

export default class TeamInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      scrore: this.props.score,
      data: this.props.data
    }
  }

  render() {
    return (
      <Row className="panel teamPanel">
        <div className="teamHeader">
          <div>{this.state.name}</div>
          <div>{this.state.score}</div>
        </div>
        <div className="members">
          <List
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.name} />
                <div style={{ position: 'relative', bottom: '2px' }}>
                  {item.numCards}
                </div>
              </List.Item>
            )}
          />
          <div className="declared-sets">
            <img
              src={icons(`./low_clubs.svg`)}
              width="40px"
              alt="declared set"
            />
            <img src={icons(`./jokers.svg`)} width="40px" alt="declared set" />
          </div>
        </div>
      </Row>
    );
  }
}
