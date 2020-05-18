import React from 'react';
import { Row, Col, Button, Modal, Radio, Select, Tabs } from 'antd';
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

const { TabPane } = Tabs;
const { Option } = Select;

let teamOneData = [];
let teamTwoData = [];

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      helpVisible: false,
      askVisible: false,
      askPlayer: null,
      askCard: null,
      availableCards: [],
      declareVisible: false,
      declareCards: [],
      transferVisible: false,
      teamOneData: [],
      teamTwoData: [],
      cards: []
    };
  }

  // componentWillMount() {
  //   let teamOne = [];
  //   let teamTwo = [];
  //   let arr = this.props.game.players;
  //   console.log(arr);
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i].team === 1) {
  //       teamOne.push(arr[i]);
  //     } else if (arr[i].team === 2) {
  //       teamTwo.push(arr[i]);
  //     }
  //     if (arr[i].name === this.props.playerName) {
  //       this.setState({ cards: arr[i].hand });
  //     }
  //   }
  //   this.setState({
  //     teamOneData: teamOne,
  //     teamTwoData: teamTwo,
  //   });
  // }

  // componentWillUpdate(prevProps, prevState) {
  //   let teamOne = [];
  //   let teamTwo = [];
  //   let arr = this.props.game.players;
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i].team === 1) {
  //       teamOne.push(arr[i]);
  //     } else if (arr[i].team === 2) {
  //       teamTwo.push(arr[i]);
  //     }
  //   }
  //   if (
  //     teamOne.length !== prevState.teamOneData.length ||
  //     teamTwo.length !== prevState.teamTwoData.length
  //   ) {
  //     this.setState({
  //       teamOneData: teamOne,
  //       teamTwoData: teamTwo,
  //     });
  //   }
  // }

  showHelpModal = () => {
    this.setState({
      helpVisible: true,
    });
  };

  //Ask Modal Events
  showAskModal = () => {
    this.setState({
      askVisible: true,
    });
  };

  handleAsk = e => {
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

  //Declare Modal Events
  showDeclareModal = () => {
    this.setState({
      declareVisible: true,
    });
  };

  handleDeclare = e => {
    console.log(e);
    this.setState({
      askVisible: false,
      declareVisible: false,
      transferVisible: false,
    });
  };

  handleDeclareSelect = e => {
    console.log(e);
    //send set name to backend

    //receive set of available cards

    //set state to that list of cards
    this.setState({
      declareCards: [
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
        },
        { rank: '7', 
          suit: 'Clubs',
          set: 'Low Clubs',
        }
      ]
    });
  }

  handleDeclareMap(e) {
    console.log(e.target.value);
  }

  //Transfer Modal Events
  showTransferModal = () => {
    this.setState({
      transferVisible: true,
    });
  };

  handleTransfer = e => {
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
      helpVisible: false,
    });
  };

  render() {
    return (
      <Row className="bg">
        <Row>
          <Col span={22}>
            <img
            src={logo}
            alt="Literature logo"
            style={{ margin: '30px' }}
            width="200px"
          />
          </Col>
          <Col span={1}>
            <Row style={{height: '100%'}} align='middle' justify='center'>
              <Button onClick={this.showHelpModal} shape="circle" icon={<QuestionOutlined />}>
              </Button>
            </Row>
          </Col>
        </Row>
        <Row className="gameRow">
          <Col className="teamCol" lg={5} md={6}>
            <TeamInfo name="Team One" score={0} data={this.state.teamOneData} />
            <TeamInfo name="Team Two" score={0} data={this.state.teamTwoData} />
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
              <Board cards={this.state.cards} />
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
                onOk={this.handleAsk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="cancel" onClick={this.handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="ask" type="primary" onClick={this.handleAsk}>
                    Ask
                  </Button>,
                ]}
                >
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
                title="Declare a Set"
                visible={this.state.declareVisible}
                onOk={this.handleDeclare}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="cancel" onClick={this.handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="ask" type="primary" onClick={this.handleDeclare}>
                    Declare
                  </Button>,
                ]}
              >
                <Row align="middle" justify="center" style={{ marginBottom: '20px'}}>
                    <Select
                      style={{ width: 150 }}
                      placeholder="Select Set"
                      onChange={this.handleDeclareSelect}
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
                    
                    {this.state.declareCards.map((card, index) =>
                      <div className="declareRow">
                        <span style={{marginRight: '10px'}}>{card.rank + ' of ' + card.suit}</span>
                        <Radio.Group onChange={this.handleDeclareMap} name={index} defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="a">Ishaan</Radio.Button>
                          <Radio.Button value="b">Ashwin</Radio.Button>
                          <Radio.Button value="c">Tirtha</Radio.Button>
                          <Radio.Button value="d">Praneeth</Radio.Button>
                        </Radio.Group>
                      </div> 
                    )}
                  </Row>
              </Modal>
              <Modal
                title="Transfer Your Turn"
                visible={this.state.transferVisible}
                onOk={this.handleTransfer}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="cancel" onClick={this.handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="ask" type="primary" onClick={this.handleTransfer}>
                    Transfer
                  </Button>,
                ]}
              >
                <Row align="middle" justify="center">
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                      <Radio.Button value="a">Ishaan</Radio.Button>
                      <Radio.Button value="b">Ashwin</Radio.Button>
                      <Radio.Button value="c">Tirtha</Radio.Button>
                      <Radio.Button value="d">Praneeth</Radio.Button>
                    </Radio.Group>
                  </Row>
              </Modal>
              <Modal
                title="How To Play"
                visible={this.state.helpVisible}
                onOk={this.handleTransfer}
                onCancel={this.handleCancel}
                style={{padding: 0}}
                footer={[
                  
                ]}
              >
                <Tabs
                  defaultActiveKey="1"
                >
                  <TabPane tab="Setup" key="1">
                    <p style={{marginBottom: '3px'}}><b>Players:</b> 6, 8, or 10</p>
                    <p style={{marginBottom: '3px'}}><b>Deck:</b> 52 Card Deck + 2 Jokers</p> 
                    <p>
                      Literature, or Fish, is a strategic turn-based card game. The game is comprised
                      of two teams whose objective is to win 5 sets. 
                    </p>
                  </TabPane>
                  <TabPane tab="Ask" key="2">
                    instructions
                  </TabPane>
                  <TabPane tab="Declare" key="3">
                    instructions
                  </TabPane>
                </Tabs>
              </Modal>
            </Row>
          </Col>
        </Row>
      </Row>
    );
  }
}
