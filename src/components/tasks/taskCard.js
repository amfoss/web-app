import React from 'react';
import { Card, Button, Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import { Row, Col } from 'react-grid';

import dataFetch from '../../utils/dataFetch';
import { getTaskProgress as query } from '../../utils/queries';

import Cookies from 'universal-cookie';

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
      assigner: ''
    };
  }
  componentDidMount() {
    if(!this.state.setData) { this.getProgress(); }
  }

  getProgress = async () => {
    const token = cookies.get('token');
    const username = cookies.get('username');
    let variables = { "id": this.props.id, "username": username, "token": token };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      this.setState({
        status: response.data.taskProgress.status,
        isComplete: response.data.taskProgress.isComplete,
        start: response.data.taskProgress.start,
        submission: response.data.taskProgress.submission,
        assignTime: response.data.taskProgress.assignTime,
        assigner:  response.data.taskProgress.assigner,
        setData: true
      });
    } else {
      console.log('error');
    }
  };

  getPoints()
  {
    let points = this.props.points.replace(/[^0-9\.]+/g, "");
    return (points + ' Points');
  }

  getDifficulty()
  {
    const levels = {
        "1": "Easy",
        "2": "Moderate",
        "3": "Tough",
        "4": "Hard",
    };
    let key = this.props.difficulty.replace(/[^0-9\.]+/g, "");
    return <span className={`difficulty_${key}`}>{levels[key]}</span>;
  }

  render() {

    return (
      <Link to={`/tasks/${this.props.id}`} >
        <Card elevation="2" className={classNames('task-card',this.props.classNames)} interactive>
          <Row>
            <Col sm={6} md={7} lg={8}>
              <h2>
                {this.state.isComplete ? <Icon icon="tick-circle" intent="success" /> : null }
                {this.props.title}
              </h2>
              <div className="task-info">{this.getPoints()} | {this.getDifficulty()}</div>
            </Col>
            <Col sm={6} md={5} lg={4} style={{display: 'flex', alignItems: 'center' }}>
              <Icon icon="star-empty" iconSize="24" style={{padding: '0 1rem'}}/>
              <Button text="Take up Task" large/>
            </Col>
          </Row>
        </Card>
      </Link>
    );
  }
}

TaskCard.props = propTypes;

export default TaskCard;
