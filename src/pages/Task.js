import React from 'react';
import { Helmet } from 'react-helmet';
import { IBreadcrumbProps, Card } from '@blueprintjs/core';
import {Container, Row, Col } from 'react-grid';
import {Redirect} from 'react-router';
import dataFetch from '../utils/dataFetch';
import TitleBar from '../components/titlebar';
import Topbar from '../components/topbar';
import parse from 'html-react-parser';
import {Navbar} from '@blueprintjs/core/lib/esnext';

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
    if(!this.state.setData) { this.getTask(); }
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

  getPoints()
  {
    let points = this.state.points.replace(/[^0-9\.]+/g, "");
    return <span>{points + ' Points'}</span>;
  }

  getDifficulty()
  {
    const levels = {
      "1": "Easy",
      "2": "Moderate",
      "3": "Tough",
      "4": "Hard",
    };
    let key = this.state.difficulty.replace(/[^0-9\.]+/g, "");
    return <span className={`difficulty_${key}`}>{levels[key]}</span>;
  }

  getDescription()
  {
    return <div>{parse(this.state.description)}</div>
  }

  render() {
    const breadcrumbs: IBreadcrumbProps[] = [
      { href: "/", icon: "home", text: "Home" },
      { href: "/tasks", icon: "home", text: "Tasks" },
    ];
    const taskinfo = (
        this.state.setData ?
          <div className='task-info'>
            {this.getPoints()} | {this.getDifficulty()}
          </div>: null
    );

    return (
      <React.Fragment>
        <Helmet>
          <title>{`${this.state.title} | Tasks | amFOSS App1`}</title>
        </Helmet>
        <Topbar />
        { this.state.error ?  <Redirect to="/tasks" /> : null }
        { this.state.setData ? (
            <React.Fragment>
              <div className="page-container">
                <TitleBar title={this.state.title} description={taskinfo} breadcrumbs={breadcrumbs} noBottomMargin />
                <Navbar>
                  <Navbar.Group align="center">
                    <Navbar.Heading>Task</Navbar.Heading>
                    <Navbar.Heading>Submit</Navbar.Heading>
                    <Navbar.Heading>View Submissions</Navbar.Heading>
                  </Navbar.Group>
                </Navbar>
                <Container>
                  <Row>
                      <Col lg={8}>
                        <Card>
                          { this.getDescription() }
                        </Card>
                      </Col>
                  </Row>
                </Container>
              </div>
            </React.Fragment>
        ): null
        }
      </React.Fragment>
    );
  }
}

export default Task;
