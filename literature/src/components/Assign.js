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
    };
  }

  componentDidMount() {
    let teamOne = [];
    let teamTwo = [];
    let unassigned = [];
    for (let i = 0; i < this.props.players.length; i++) {
      if (this.props.players[i].team === null) {
        unassigned.push(this.props.players[i]);
      } else if (this.props.players[i].team === 1) {
        teamOne.push(this.props.players[i]);
      } else if (this.props.players[i].team === 2) {
        teamTwo.push(this.props.players[i]);
      }
    }

    this.setState({ teamOne, teamTwo, unassigned });
  }

  componentDidUpdate(prevProps, prevState) {
    let teamOne = [];
    let teamTwo = [];
    let unassigned = [];
    for (let i = 0; i < this.props.players.length; i++) {
      if (this.props.players[i].team === null) {
        unassigned.push(this.props.players[i]);
      } else if (this.props.players[i].team === 1) {
        teamOne.push(this.props.players[i]);
      } else if (this.props.players[i].team === 2) {
        teamTwo.push(this.props.players[i]);
      }
    }
    if (
      teamOne.length !== prevState.teamOne.length ||
      teamTwo.length !== prevState.teamTwo.length ||
      unassigned.length !== prevState.unassigned.length
    ) {
      this.setState({
        teamOne: teamOne,
        teamTwo: teamTwo,
        unassigned: unassigned,
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
          style={{ marginBottom: '5vh', marginTop: '10vh' }}
          width="550px"
        />
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
        <Button type="primary" onClick={this.showTransferModal} size="large">
          Let's start the game
        </Button>
      </Row>
    );
  }
}
