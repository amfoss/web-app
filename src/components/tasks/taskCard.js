import React from 'react';
import {Card} from '@blueprintjs/core';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  points: PropTypes.number,
  difficulty: PropTypes.number
};

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={`/task?id=${this.props.id}`}>
        <Card elevation="2">
          <h1>{this.props.title}</h1>
          <div>{this.props.points}</div>
          <div>{this.props.difficulty}</div>
        </Card>
      </Link>
    );
  }
}

TaskCard.props = propTypes;

export default TaskCard;
