import React from 'react';
import { Row, Col, Button, Modal, Radio, Select, Tabs } from 'antd';
import {
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
import allSets from '../constants/constants.js';

const { TabPane } = Tabs;
const { Option } = Select;

let askedCard = null;
let askedPlayer = null;
let transferPlayer = null;

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      playerTurn: null,
      log: null,
      declareMap: new Array(6),
      declareSet: null,
      declaredSetsTeamOne: [],
      declaredSetsTeamTwo: [],
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
      if (arr[i].isTurn) {
        this.setState({ playerTurn: arr[i].name });
      }
    }
    this.setState({
      teamOneData: teamOne,
      teamTwoData: teamTwo,
      declaredSetsTeamOne: this.props.game.declaredSetsTeam1,
      declaredSetsTeamTwo: this.props.game.declaredSetsTeam2,
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
    let playerTurn = null;
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
      if (arr[i].isTurn) {
        playerTurn = arr[i].name;
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
      this.props.game.log !== prevState.log ||
      this.props.game.declaredSetsTeam1.length !==
        prevState.declaredSetsTeamOne.length ||
      this.props.game.declaredSetsTeam2.length !==
        prevState.declaredSetsTeamTwo.length ||
      playerTurn !== prevState.playerTurn
    ) {
      this.setState({
        teamOneData: teamOne,
        teamTwoData: teamTwo,
        isTurn: isTurn,
        cards: cards,
        availableCards: availableCards,
        team: team,
        availableSets: availableSets,
        log: this.props.game.log,
        declaredSetsTeamOne: this.props.game.declaredSetsTeam1,
        declaredSetsTeamTwo: this.props.game.declaredSetsTeam2,
        playerTurn: playerTurn,
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
    };
  };

  playerClicked = (e) => {
    console.log(e.target.value);
    askedPlayer = e.target.value;
  };

  handleAsk = (e) => {
    console.log(askedPlayer);
    console.log(askedCard);
    if (askedCard != null && askedPlayer != null) {
      let card = askedCard;
      let source = this.props.playerName;
      let target = askedPlayer;
      this.props.socket.emit('ask', { source, target, card }, (asked) => {
        this.setState({
          askVisible: asked,
          declareVisible: false,
          transferVisible: false,
          transfer: false,
          availableSetCards: this.state.availableCards[askedCard.set],
        });
        askedCard = null;
      });
    }
  };

  handleSetSelect = (e) => {
    console.log(e);
    this.setState({
      availableSetCards: this.state.availableCards[e],
    });
  };

  //Declare Modal Events
  showDeclareModal = () => {
    this.setState({
      declareVisible: true,
    });
  };

  handleDeclare = (e) => {
    e.preventDefault();
    console.log(this.state.declareMap);
    if (Object.keys(this.state.declareMap).length === 6) {
      let cards = this.state.declareMap;
      let player = this.props.playerName;
      let set = this.state.declareSet;
      this.props.socket.emit('declare', { player, cards, set }, (declare) => {
        if (declare) {
          this.setState({ transfer: true });
          alert(player + ' correctly declared the ' + set);
        } else {
          this.setState({ transfer: false });
          alert(player + ' incorrectly declared the ' + set);
        }

        this.setState({
          askVisible: false,
          declareVisible: false,
          transferVisible: false,
          declareMap: new Array(6),
        });
      });
    }

    this.setState({
      askVisible: false,
      declareVisible: false,
      transferVisible: false,
      transfer: true,
    });
  };

  handleDeclareSelect = (e) => {
    console.log(allSets[e]);
    this.setState({
      declareCards: allSets[e],
      declareSet: e,
    });
  };

  handleDeclareMap = (e) => {
    let map = this.state.declareMap;
    const card = this.state.declareCards[e.target.name];
    const player = e.target.value;

    map[e.target.name] = {
      player: player,
      card: card,
    };

    this.setState({ declareMap: map });
  };

  //Transfer Modal Events
  showTransferModal = () => {
    this.setState({
      transferVisible: true,
    });
  };

  transferClicked = (e) => {
    transferPlayer = e.target.value;
  };

  handleTransfer = (e) => {
    if (transferPlayer != null) {
      let source = this.props.playerName;
      let target = transferPlayer;
      this.props.socket.emit('transfer', { source, target }, () => {
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

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      askVisible: false,
      declareVisible: false,
      transferVisible: false,
      helpVisible: false,
    });
  };

  newGame = () => {
    this.props.socket.emit('newGame');
  };

  toString = (card) => {
    return card.suit === 'Joker'
      ? card.rank + ' ' + card.suit
      : card.rank + ' of ' + card.suit;
  };

  render() {
    let hasEnded = 'none';
    if (this.props.game.scoreTeam1 >= 5 || this.props.game.scoreTeam2 >= 5) {
      hasEnded = 'block';
    }
    return (
      <Row className="bg">
        <Row>
          <img
            src={logo}
            alt="Literature logo"
            style={{ margin: '30px' }}
            width="200px"
          />
          <div
            style={{
              position: 'absolute',
              right: '5vw',
              top: '35px',
              display: hasEnded,
            }}
          >
            <Button
              type="primary"
              size="large"
              style={{ borderRadius: '7.5px' }}
              onClick={this.newGame}
            >
              New Game
            </Button>
          </div>
        </Row>
        <Row className="gameRow">
          <Col className="teamCol" lg={5} md={6}>
            <TeamInfo
              name="Team One"
              score={this.props.game.scoreTeam1}
              data={this.state.teamOneData}
              playerTurn={this.state.playerTurn}
              isTeam={this.state.team === 1}
              declaredSets={this.state.declaredSetsTeamOne}
            />
            <TeamInfo
              name="Team Two"
              score={this.props.game.scoreTeam2}
              data={this.state.teamTwoData}
              playerTurn={this.state.playerTurn}
              isTeam={this.state.team === 2}
              declaredSets={this.state.declaredSetsTeamTwo}
            />
          </Col>
          <Col lg={17} md={16} className="gameCol">
            <div className="panel" style={{ height: '100%' }}>
              <Row
                style={{ position: 'absolute', right: '30px', top: '30px' }}
                align="middle"
                justify="center"
              >
                <Button
                  onClick={this.showHelpModal}
                  shape="circle"
                  icon={<QuestionOutlined />}
                ></Button>
              </Row>
              <Row
                className="gamePanel"
                justify="center"
                align="middle"
                style={{ flexDirection: 'column' }}
              >
                <h1 className="log">{this.state.log}</h1>
                <Board cards={this.state.cards} />
                <div className="buttonrow">
                  <Button
                    type={this.state.isTurn ? 'primary' : 'disabled'}
                    onClick={this.state.isTurn ? this.showAskModal : ''}
                    size="large"
                  >
                    <QuestionOutlined />
                    Ask
                  </Button>
                  <Button
                    type={this.state.isTurn ? 'primary' : 'disabled'}
                    onClick={this.state.isTurn ? this.showDeclareModal : ''}
                    size="large"
                  >
                    <BellOutlined />
                    Declare
                  </Button>
                  <Button
                    type={this.state.isTurn ? 'primary' : 'disabled'}
                    onClick={this.state.isTurn ? this.showTransferModal : ''}
                    size="large"
                  >
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
                  <Row
                    align="middle"
                    justify="center"
                    style={{ marginBottom: '20px' }}
                  >
                    <Radio.Group
                      onChange={this.playerClicked}
                      buttonStyle="solid"
                    >
                      {this.props.game.players.map((player) => {
                        if (
                          player.name !== this.props.playerName &&
                          player.team !== this.state.team
                        ) {
                          return (
                            <Radio.Button value={player.name}>
                              {player.name}
                            </Radio.Button>
                          );
                        }

                        return <span></span>;
                      })}
                    </Radio.Group>
                  </Row>
                  <Row
                    align="middle"
                    justify="center"
                    style={{ marginBottom: '20px' }}
                  >
                    <Select
                      style={{ width: 150 }}
                      placeholder="Select Set"
                      onChange={this.handleSetSelect}
                    >
                      {this.state.availableSets.map((set) => (
                        <Option value={set}>{set}</Option>
                      ))}
                    </Select>
                  </Row>
                  <Row
                    align="middle"
                    justify="center"
                    style={{ marginBottom: '20px' }}
                  >
                    {this.state.availableSetCards.map((card) => (
                      <Card
                        type="ask"
                        clickFunc={this.cardClicked}
                        suit={card.suit}
                        rank={card.rank}
                        set={card.set}
                      />
                    ))}
                  </Row>
                  <Row align="middle" justify="center">
                    {this.state.log}
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
                    <Button
                      onClick={this.handleDeclare}
                      key="ask"
                      type="primary"
                    >
                      Declare
                    </Button>,
                  ]}
                >
                  <Row
                    align="middle"
                    justify="center"
                    style={{ marginBottom: '20px' }}
                  >
                    <Select
                      style={{ width: 150 }}
                      placeholder="Select Set"
                      onChange={this.handleDeclareSelect}
                    >
                      {this.state.availableSets.map((set) => (
                        <Option style={{ marginBottom: '10px' }} value={set}>
                          {set}
                        </Option>
                      ))}
                    </Select>
                  </Row>
                  <div>
                    {this.state.declareCards.map((card, index) => (
                      <Row style={{ width: '100%' }} className="declareRow">
                        <Col
                          span={8}
                          style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                          }}
                        >
                          <span style={{ marginRight: '10px' }}>
                            {this.toString(card)}
                          </span>
                        </Col>
                        <Col span={15}>
                          <Radio.Group
                            onChange={this.handleDeclareMap}
                            data-index={index}
                            name={index}
                            buttonStyle="solid"
                          >
                            {this.props.game.players.map((player) => {
                              if (player.team === this.state.team) {
                                return (
                                  <Radio.Button value={player.name}>
                                    {player.name}
                                  </Radio.Button>
                                );
                              }

                              return <span></span>;
                            })}
                          </Radio.Group>
                        </Col>
                      </Row>
                    ))}
                  </div>
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
                    <Button
                      key="ask"
                      type="primary"
                      onClick={this.handleTransfer}
                    >
                      Transfer
                    </Button>,
                  ]}
                >
                  <Row align="middle" justify="center">
                    <Radio.Group
                      onChange={this.transferClicked}
                      buttonStyle="solid"
                    >
                      {this.props.game.players.map((player) => {
                        if (
                          player.name !== this.props.playerName &&
                          player.team === this.state.team
                        ) {
                          return (
                            <Radio.Button value={player.name}>
                              {player.name}
                            </Radio.Button>
                          );
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
                  style={{ padding: 0 }}
                  footer={[]}
                >
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Setup" key="1">
                      <p style={{ marginBottom: '3px' }}>
                        <b>Players:</b> 6, 8, or 10
                      </p>
                      <p style={{ marginBottom: '3px' }}>
                        <b>Deck:</b> 52 Card Deck + 2 Jokers
                      </p>
                      <p>
                        Literature, or Fish, is a strategic turn-based card
                        game. The game is comprised of two teams whose objective
                        is to win 5 sets.
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
            </div>
          </Col>
        </Row>
      </Row>
    );
  }
}
