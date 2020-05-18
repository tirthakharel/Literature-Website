import React from 'react';
import { Row, Col, List, Button } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import logo from '../lit-logo.png';
import '../style/Home.css';

export default class Assign extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamOne: [],
      teamTwo: [],
      unassigned: [],
      leader: false
    };
  }

  componentWillMount() {
    let teamOne = [];
    let teamTwo = [];
    let unassigned = [];
    let leader = false;
    for (let i = 0; i < this.props.players.length; i++) {
      if (this.props.players[i].team === null) {
        unassigned.push(this.props.players[i]);
      } else if (this.props.players[i].team === 1) {
        teamOne.push(this.props.players[i]);
      } else if (this.props.players[i].team === 2) {
        teamTwo.push(this.props.players[i]);
      }

      if (this.props.players[i].name === this.props.playerName) {
        leader = this.props.players[i].leader;
      }
    }
    console.log(leader);
    this.setState({
      teamOne: teamOne,
      teamTwo: teamTwo,
      unassigned: unassigned,
      leader: leader
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let teamOne = [];
    let teamTwo = [];
    let unassigned = [];
    let leader = false;
    for (let i = 0; i < this.props.players.length; i++) {
      if (this.props.players[i].team === null) {
        unassigned.push(this.props.players[i]);
      } else if (this.props.players[i].team === 1) {
        teamOne.push(this.props.players[i]);
      } else if (this.props.players[i].team === 2) {
        teamTwo.push(this.props.players[i]);
      }

      if (this.props.players[i].name === this.props.playerName) {
        leader = this.props.players[i].leader;
      }
    }
    if (
      teamOne.length !== prevState.teamOne.length ||
      teamTwo.length !== prevState.teamTwo.length ||
      unassigned.length !== prevState.unassigned.length ||
      leader !== prevState.leader
    ) {
      this.setState({
        teamOne: teamOne,
        teamTwo: teamTwo,
        unassigned: unassigned,
        leader: leader
      });
    }
  }

  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      let player = this.state[source.droppableId][source.index];

      const result = this.move(
        this.state[source.droppableId],
        this.state[destination.droppableId],
        source,
        destination
      );

      let team = destination.droppableId;
      this.props.socket.emit('assignTeam', { player, team }, (error) => {});

      this.setState({
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      });
    }
  };

  render() {
    return (
      <Row justify="middle" className="bg">
        <img
          src={logo}
          alt="Literature logo"
          style={{ marginBottom: '3vh', marginTop: '7vh' }}
          width="550px"
        />
        { this.state.leader ? 
        <h2>Drag and drop names to assign teams below</h2> :
        <h2>Waiting for the game leader to assign teams...</h2> 
        }
        <Row style={{ width: '100%', height: 'auto' }}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="teamOne">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className="panel assign-panel">
                  <h1>Team One</h1>
                  {this.state.teamOne.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      isDragDisabled={!this.state.leader}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="assign-name"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="unassigned">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className="panel assign-panel">
                  <h1>Unassigned</h1>
                  {this.state.unassigned.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      isDragDisabled={!this.state.leader}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="assign-name"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="teamTwo">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className="panel assign-panel">
                  <h1>Team Two</h1>
                  {this.state.teamTwo.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      isDragDisabled={!this.state.leader}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="assign-name"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Row>
        { this.state.leader &&
        <Button className="assignButton" type="primary" onClick={this.showTransferModal} size="large">
          Start Game
        </Button>
        } 
      </Row>
    );
  }
}
