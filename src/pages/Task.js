import React from 'react';
import { Helmet } from 'react-helmet';
import Topbar from '../components/topbar';
import { Flex, Box } from '@rebass/grid'
import { RangeSlider, Label, Checkbox } from '@blueprintjs/core';

import dataFetch from '../utils/dataFetch';
import {Redirect} from 'react-router';

const query = `query getTask($id: String!)
{
  task(id:$id)
  {
    title
    description
    points
    difficulty
    date
    author
    {
      Profile
      {
        firstName
        lastName
      }
    }
    stream
    {
      name
      slug
      type
    }
  }
}`;

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      setId: false,
      error: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({
      id: id,
      setId: false,
      setData: false,
    });
  }
  componentDidUpdate(){
    if(!this.state.setId) { this.getTask(); }
  }

  getTask = async () => {
      let variables = { "id": this.state.id };
      const response = await dataFetch({query, variables});
      if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
        this.setState({
            title: response.data.task.title,
            description: response.data.task.description,
            points: response.data.task.points,
            difficulty: response.data.task.difficulty,
            author: response.data.task.author,
            date: response.data.task.date,
            setData: true
        });
      } else { this.setState({ error: true}) }
  };

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Tasks Page</title>
        </Helmet>
        <Topbar />
        { this.state.error ?  <Redirect to="/tasks" /> : null }
        { this.state.setData ? (
            <React.Fragment>
              <h1>{this.state.title}</h1>
              <p>{this.state.description}</p>
              <div>{this.state.points}</div>
            </React.Fragment>
        ): null
        }
      </React.Fragment>
    );
  }
}

export default Task;
