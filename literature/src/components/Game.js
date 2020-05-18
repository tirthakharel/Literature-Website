import React from 'react';
import { Row, Col, Button, Modal, Radio, Select, Tabs } from 'antd';
import {
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

let askedCard = null;
let askedPlayer = null;
let transferPlayer = null;

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      helpVisible: false,
      askVisible: false,
      askPlayer: null,
      askCard: null,
      availableCards: {},
      availableSetCards: [],
      availableSets: [],
      declareVisible: false,
      declareCards: [],
      transferVisible: false,
      teamOneData: [],
      teamTwoData: [],
      team: null,
      cards: [],
      isTurn: false,
      log: "Let's start the game"
    };
  }

  componentWillMount() {
    let teamOne = [];
    let teamTwo = [];
    let arr = this.props.game.players;
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].team === 1) {
        teamOne.push(arr[i]);
      } else if (arr[i].team === 2) {
        teamTwo.push(arr[i]);
      }
      if (arr[i].name === this.props.playerName) {
        this.setState({ 
          cards: arr[i].hand,
          isTurn: arr[i].isTurn,
          availableCards: arr[i].availableCards,
          team: arr[i].team,
          availableSets: arr[i].sets,
          log: this.props.game.log,
        });
      }
    }
    this.setState({
      teamOneData: teamOne,
      teamTwoData: teamTwo,
    });
  }

  componentWillUpdate(prevProps, prevState) {
    let teamOne = [];
    let teamTwo = [];
    let cards = [];
    let availableCards = {};
    let availableSets = [];
    let isTurn = false;
    let team = null;
    let arr = this.props.game.players;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].team === 1) {
        teamOne.push(arr[i]);
      } else if (arr[i].team === 2) {
        teamTwo.push(arr[i]);
      }
      if (arr[i].name === this.props.playerName) {
        cards = arr[i].hand;
        isTurn = arr[i].isTurn;
        availableCards = arr[i].availableCards;
        team = arr[i].team;
        availableSets = arr[i].sets;
      }
    }
    if (
      teamOne.length !== prevState.teamOneData.length ||
      teamTwo.length !== prevState.teamTwoData.length ||
      cards.length !== prevState.cards.length ||
      availableCards.length !== prevState.availableCards.length ||
      availableSets.length !== prevState.availableSets.length ||
      isTurn !== prevState.isTurn ||
      team !== prevState.team ||
      this.props.game.log !== prevState.log
    ) {
      this.setState({
        teamOneData: teamOne,
        teamTwoData: teamTwo,
        isTurn: isTurn,
        cards: cards,
        availableCards: availableCards,
        team: team,
        availableSets: availableSets,
        log: this.props.game.log
      });
    }
  }

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

  cardClicked = (e) => {
    askedCard = {
      rank: e.target.dataset.rank, 
      suit: e.target.dataset.suit,
      set: e.target.dataset.set,
    }
  }

  playerClicked = (e) => {
    console.log(e.target.value);
    askedPlayer = e.target.value;
  }

  handleAsk = e => {
    console.log(askedPlayer);
    console.log(askedCard);
    if (askedCard != null && askedPlayer != null) {
      let card = askedCard;
      let source = this.props.playerName;
      let target = askedPlayer;
      this.props.socket.emit("ask", { source, target, card }, (asked) => {
        askedCard = null;
        this.setState({
          askVisible: asked,
          declareVisible: false,
          transferVisible: false,
          transfer: false,
        });
      });
    }
  };
  
  handleSetSelect = e => {
    console.log(e);
    this.setState({
      availableSetCards: this.state.availableCards[e],
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
      transfer: true,
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

  transferClicked = (e) => {
    transferPlayer = e.target.value;
  }

  handleTransfer = e => {
    console.log(e);
    if (transferPlayer != null) {
      let source = this.props.playerName;
      let target = transferPlayer;
      this.props.socket.emit("transfer", { source, target }, () => {
        transferPlayer = null;
        this.setState({
          askVisible: false,
          declareVisible: false,
          transferVisible: false,
          transfer: true,
        });
      }); 
    }
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
            <TeamInfo name="Team One" score={this.props.game.scoreTeam1} data={this.state.teamOneData} />
            <TeamInfo name="Team Two" score={this.props.game.scoreTeam2} data={this.state.teamTwoData} />
          </Col>
          <Col lg={17} md={16} className="gameCol">
            <Row
              className="panel gamePanel"
              justify="center"
              align="middle"
              style={{ flexDirection: 'column' }}
            >
              <h1 className="log">
                {this.state.log}
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
                    <Radio.Group onChange={this.playerClicked} buttonStyle="solid">
                      {this.props.game.players.map((player) => {
                        if (player.name !== this.props.playerName && player.team !== this.state.team) {
                          return <Radio.Button value={player.name}>{player.name}</Radio.Button>;
                        }

                        return <span></span>;
                      })}
                    </Radio.Group>
                  </Row>
                  <Row align="middle" justify="center" style={{ marginBottom: '20px'}}>
                    <Select
                      style={{ width: 150 }}
                      placeholder="Select Set"
                      onChange={this.handleSetSelect}
                    >
                      {this.state.availableSets.map((set) => 
                        <Option value={set}>{set}</Option>
                      )} 
                    </Select>
                  </Row>
                  <Row align="middle" justify="center">
                    {this.state.availableSetCards.map((card) => 
                      <Card 
                        type='ask' 
                        clickFunc={this.cardClicked} 
                        suit={card.suit} 
                        rank={card.rank} 
                        set={card.set} 
                      />
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
                      <Option value="Low Hearts">Low Hearts</Option>
                      <Option value="High Hearts">High Hearts</Option>
                      <Option value="Low Diamonds">Low Diamonds</Option>
                      <Option value="High Diamonds">High Diamonds</Option>
                      <Option value="Low Spades">Low Spades</Option>
                      <Option value="High Spades">High Spades</Option>
                      <Option value="Low Clubs">Low Clubs</Option>
                      <Option value="High Clubs">High Clubs</Option>
                      <Option value="Jokers">Jokers</Option>
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
                    <Radio.Group onChange={this.transferClicked} buttonStyle="solid">
                      {this.props.game.players.map((player) => {
                        if (player.name !== this.props.playerName && player.team === this.state.team) {
                          return <Radio.Button value={player.name}>{player.name}</Radio.Button>;
                        }

                        return <span></span>;
                      })}
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
