import React from 'react';
import { Row, List } from 'antd';
import '../style/Home.css';
import 'antd/dist/antd.css';

export default class TeamInfo extends React.Component {
  render() {
    return (
      <Row
        style={{
          flex: '1',
          borderRadius: '10px',
          boxShadow: '0px 6px 15px 0px #8e8e8e',
          backgroundColor: '#ffffff',
          marginBottom: '20px',
          height: "50%"
        }}
      >
        <div
          style={{
            width: '100%',
            padding: '15px 15px 0 15px',
            height: '20%',
          }}
        >
          <div style={{ float: 'left', fontSize: '2em' }}>{this.props.name}</div>
          <div style={{ float: 'right', fontSize: '2em' }}>{this.props.score}</div>
        </div>
        <div style={{ width: '100%', height: '80%', padding: '15px' }}>
          <List
            itemLayout="horizontal"
            dataSource={this.props.data}
            style={{ width: '100%', padding: '0 10px' }}
            renderItem={(item) => (
              <List.Item style={{ padding: '3px 0' }}>
                <List.Item.Meta
                  title={item.name}
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
    );
  }
}
