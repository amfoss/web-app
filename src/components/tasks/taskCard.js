import React from 'react';
import { Card, Button, Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Cookies from 'universal-cookie';
import dataFetch from '../../utils/dataFetch';
import { getTaskProgress as query } from '../../utils/queries';

const cookies = new Cookies();

const propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  points: PropTypes.number,
  difficulty: PropTypes.number,
};

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setData: false,
      status: '',
      isComplete: false,
      start: '',
      submission: '',
      assignTime: '',
      assigner: '',
    };
  }

  componentDidMount() {
    if (!this.state.setData) {
      this.getProgress();
    }
  }

  getProgress = async () => {
    const token = cookies.get('token');
    const username = cookies.get('username');
    const variables = { id: this.props.id, username, token };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      this.setState({
        status: response.data.taskProgress.status,
        isComplete: response.data.taskProgress.isComplete,
        start: response.data.taskProgress.start,
        submission: response.data.taskProgress.submission,
        assignTime: response.data.taskProgress.assignTime,
        assigner: response.data.taskProgress.assigner,
        setData: true,
      });
    } else {
      console.log('error');
    }
  };

  getPoints() {
    const points = this.props.points.replace(/[^0-9\.]+/g, '');
    return `${points} Points`;
  }

  getDifficulty() {
    const levels = {
      '1': 'Easy',
      '2': 'Moderate',
      '3': 'Tough',
      '4': 'Hard',
    };
    const key = this.props.difficulty.replace(/[^0-9\.]+/g, '');
    return <span className={`difficulty_${key}`}>{levels[key]}</span>;
  }

  render() {
    return (
      <Link to={`/tasks/${this.props.id}`}>
        <Card elevation="2" className={classNames('task-card', this.props.classNames)} interactive>
          <div className="row">
            <div className="col-sm-6 col-md-7 col-lg-8">
              <h2>
                {this.state.isComplete ? <Icon icon="tick-circle" intent="success" /> : null}
                {this.props.title}
              </h2>
              <div className="task-info">
                {this.getPoints()} | {this.getDifficulty()}
              </div>
            </div>
            <div className="col-sm-6 col-md-5 col-lg-4" style={{ display: 'flex', alignItems: 'center' }}>
              <Icon icon="star-empty" iconSize="24" style={{ padding: '0 1rem' }} />
              <Button text="Take up Task" large />
            </div>
          </div>
        </Card>
      </Link>
    );
  }
}

TaskCard.props = propTypes;

export default TaskCard;
