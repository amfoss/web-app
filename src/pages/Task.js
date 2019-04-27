import React from 'react';
import { Helmet } from 'react-helmet';
import Topbar from '../components/topbar';
import { Flex, Box } from '@rebass/grid'
import { RangeSlider, Label, Checkbox } from '@blueprintjs/core';

import TaskList from '../components/tasks/taskList'


import dataFetch from '../utils/dataFetch';

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
      setId: false
    };
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    this.setState({
      id: params.get('id'),
      setId: false,
      setData: false,
    });
  }
  componentDidUpdate(){
    if(!this.state.setId)
    {
      this.getTask();
    }

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
      } else {
        console.log('error');
      }
  };

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Tasks Page</title>
        </Helmet>
        <Topbar />
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
