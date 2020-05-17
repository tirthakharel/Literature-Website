import React from 'react';
import { Row, Col, Button, Modal } from 'antd';
import {
  QuestionCircleOutlined,
  BellOutlined,
  SwapOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../style/Home.css';
import logo from '../lit-logo.png';
import TeamInfo from './TeamInfo.js';
import Board from './Board';

const teamOneData = [
  {
    name: 'Praneeth',
    numCards: 9,
  },
  {
    name: 'Ishaan',
    numCards: 9,
  },
  {
    name: 'Tirtha',
    numCards: 9,
  },
  {
    name: 'Ashwin',
    numCards: 9,
  },
];
const teamTwoData = [
  {
    name: 'Aditya',
    numCards: 9,
  },
  {
    name: 'Rahul',
    numCards: 9,
  },
  {
    name: 'Arjun',
    numCards: 9,
  },
  {
    name: 'Ritvik',
    numCards: 9,
  },
];

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      askVisible: false,
      declareVisible: false,
      transferVisible: false
    };
  }

  showAskModal = () => {
    this.setState({
      askVisible: true,
    });
  };
  showDeclareModal = () => {
    this.setState({
      declareVisible: true,
    });
  };
  showTransferModal = () => {
    this.setState({
      transferVisible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      askVisible: false,
      declareVisible: false,
      transferVisible: false,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      askVisible: false,
      declareVisible: false,
      transferVisible: false,
    });
  };

  render() {
    return (
      <Row className="bg">
        <img
          src={logo}
          alt="Literature logo"
          style={{ margin: '30px' }}
          width="200px"
        />
        <Row className="gameRow">
          <Col className="teamCol" lg={5} md={6}>
            <TeamInfo name="Team One" score={0} data={teamOneData} />
            <TeamInfo name="Team Two" score={0} data={teamTwoData} />
          </Col>
          <Col lg={17} md={16} className="gameCol">
            <Row
              className="panel gamePanel"
              justify="center"
              align="middle"
              style={{ flexDirection: 'column' }}
            >
              <h1 className="log">
                Ishaan asked for the 9 of clubs from Praneeth
              </h1>
              <Board />
              <div className="buttonrow">
                <Button type="primary" onClick={this.showAskModal} size="large">
                  <QuestionOutlined />
                  Ask
                </Button>
                <Button type="primary" onClick={this.showDeclareModal} size="large">
                  <BellOutlined />
                  Declare
                </Button>
                <Button type="primary" onClick={this.showTransferModal} size="large">
                  <SwapOutlined />
                  Transfer
                </Button>
              </div>
              <Modal
                title="Ask for a card"
                visible={this.state.askVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
              <Modal
                title="Declare a set"
                visible={this.state.declareVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
              <Modal
                title="Transfer your turn"
                visible={this.state.transferVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </Row>
          </Col>
        </Row>
      </Row>
    );
  }
}
