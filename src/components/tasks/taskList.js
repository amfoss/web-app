import React from 'react';
import { Card } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import dataFetch from '../../utils/dataFetch';
import TaskCard from '../tasks/taskCard';

const query = `
query getTasks($stream: String, $maxPoints: Int, $minPoints: Int, $maxDifficulty: Int, $minDifficulty: Int )
{
  tasks(
    stream: $stream,
    maxPoints: $maxPoints,
    minPoints: $minPoints, 
    maxDifficulty: $maxDifficulty, 
    minDifficulty: $minDifficulty
  )
  {
    id
    title
    points
    difficulty 
    
  }
}`;

const propTypes = {
  stream: PropTypes.string,
  minPoints: PropTypes.number,
  maxPoints: PropTypes.number,
  minDifficulty: PropTypes.number,
  maxDifficulty: PropTypes.number
};

const defaultProps = {
  type: '',
  hasParent: null,
};

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: '',
      setTasks: false
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks = async () => {
    let variables = {};
    this.props.stream != null ? variables["stream"] = this.props.stream : null;
    this.props.minPoints != null ? variables["minPoints"] = this.props.minPoints : null;
    this.props.maxPoints != null ? variables["maxPoints"] = this.props.maxPoints : null;
    this.props.minDifficulty != null ? variables["minDifficulty"] = this.props.minDifficulty : null;
    this.props.maxDifficulty != null ? variables["maxDifficulty"] = this.props.maxDifficulty : null;

    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
          this.setState({tasks: response.data.tasks, setTasks: true })
    } else {
      console.log('error');
    }
  };


  render() {

    return (
          this.state.setTasks ? this.state.tasks.map((task) =>
            <TaskCard
              title={task.title}
              difficulty={task.difficulty}
              points={task.points}
              id={task.id}
              key={task.id}
            /> ) : null
    );
  }
}

TaskList.props = propTypes;
TaskList.defaultProps = defaultProps;

export default TaskList;
