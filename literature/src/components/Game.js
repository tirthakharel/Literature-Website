import React from 'react';
import { Row, Col, Button, Modal, Radio, Select } from 'antd';
import {
  QuestionCircleOutlined,
  UserOutlined,
  BellOutlined,
  SwapOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../style/Home.css';
import logo from '../lit-logo.png';
import TeamInfo from './TeamInfo.js';
import Board from './Board';
import Card from './Card';

const { Option } = Select;

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
      transferVisible: false,
      availableCards: [],
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

  handleSetSelect = e => {
    console.log(e);
    //send set name to backend

    //receive set of available cards

    //set state to that list of cards
    this.setState({
      availableCards: [
        { rank: '2', 
          suit: 'Clubs',
          set: 'Low Clubs',
        },
        { rank: '3', 
          suit: 'Clubs',
          set: 'Low Clubs',
        },
        { rank: '4', 
          suit: 'Clubs',
          set: 'Low Clubs',
        },
        { rank: '5', 
          suit: 'Clubs',
          set: 'Low Clubs',
        },
        { rank: '6', 
          suit: 'Clubs',
          set: 'Low Clubs',
        }
      ]
    });

  }

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
                title="Ask For a Card"
                visible={this.state.askVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                  <Row align="middle" justify="center" style={{ marginBottom: '20px'}}>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                      <Radio.Button value="a">Ishaan</Radio.Button>
                      <Radio.Button value="b">Ashwin</Radio.Button>
                      <Radio.Button value="c">Tirtha</Radio.Button>
                      <Radio.Button value="d">Praneeth</Radio.Button>
                    </Radio.Group>
                  </Row>
                  <Row align="middle" justify="center" style={{ marginBottom: '20px'}}>
                    <Select
                      style={{ width: 150 }}
                      placeholder="Select Set"
                      onChange={this.handleSetSelect}
                    >
                      <Option value="LH">Low Hearts</Option>
                      <Option value="HH">High Hearts</Option>
                      <Option value="LD">Low Diamonds</Option>
                      <Option value="HD">High Diamonds</Option>
                      <Option value="LS">Low Spades</Option>
                      <Option value="HS">High Spades</Option>
                      <Option value="LC">Low Clubs</Option>
                      <Option value="HC">High Clubs</Option>
                      <Option value="J">Jokers</Option>
                    </Select>
                  </Row>
                  <Row align="middle" justify="center">
                    {this.state.availableCards.map((card) => 
                      <Card type='ask' suit={card.suit} rank={card.rank} set={card.set} />
                    )}
                  </Row>
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
