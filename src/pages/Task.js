import React from 'react';
import { Helmet } from 'react-helmet';
import Topbar from '../components/topbar';
import { IBreadcrumbProps } from '@blueprintjs/core';

import dataFetch from '../utils/dataFetch';
import {Redirect} from 'react-router';
import TitleBar from '../components/titlebar';

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
            name: response.data.task.author,
            date: response.data.task.date,
            setData: true
        });
      } else { this.setState({ error: true}) }
  };

  render() {
    const breadcrumbs: IBreadcrumbProps[] = [
      { href: "/", icon: "home", text: "Home" },
      { href: "/tasks", icon: "home", text: "Tasks" },
      { href: "/", icon:"home",text:"Task"}
    ];
    return (
      <React.Fragment>
        <Helmet>
          <title>Tasks Page</title>
        </Helmet>
        <Topbar />
        { this.state.error ?  <Redirect to="/tasks" /> : null }
        { this.state.setData ? (
            <React.Fragment>
              <div className="page-container">
                <TitleBar title={this.state.title} description={this.state.description} breadcrumbs={breadcrumbs} />
                <div>{this.state.points}</div>
                {this.state.difficulty}
              </div>
            </React.Fragment>
        ): null
        }
      </React.Fragment>
    );
  }
}

export default Task;
