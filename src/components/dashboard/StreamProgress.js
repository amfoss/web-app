import React from 'react';
import {ProgressBar} from '@blueprintjs/core';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import dataFetch from '../../utils/dataFetch';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const query = `query getStreamProgress($slug: String!, $username: String!, $token: String!)
{
  streamProgress(slug: $slug, username: $username, token: $token)
  {
    progress
    tasksCompleted
  	tasksPending
  }
}`;

const propTypes = {
  slug: PropTypes.string,
};

class StreamProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setData: false,
      progress: 0,
      tasksCompleted: 0,
      tasksPending: 0
    };
  }

  componentDidMount() {
      if(!this.state.setData)
      {
          this.getProgress();
      }
  }

  getProgress = async () => {
    const token = cookies.get('token');
    const username = cookies.get('username');
    let variables = { "slug": this.props.slug, "username": username, "token": token };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      this.setState({
            progress: response.data.streamProgress.progress,
            tasksCompleted: response.data.streamProgress.tasksCompleted,
            tasksPending: response.data.streamProgress.tasksPending,
            setData: true
      });
    } else {
      console.log('error');
    }
  };

  render() {

    return (
      <Link to={`/progress?stream=${this.props.slug}`}>
          {this.state.tasksCompleted} Completed out of {this.state.tasksPending + this.state.tasksCompleted}
          <ProgressBar value={this.state.progress} animate={false} stripes={false} intent="success" />
      </Link>
    );
  }
}

StreamProgress.props = propTypes;

export default StreamProgress;
