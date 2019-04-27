import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-grid';
import {RangeSlider, Label, Checkbox, IBreadcrumbProps} from '@blueprintjs/core';
import TaskList from '../components/tasks/taskList'

import TopBar from '../components/topbar';
import TitleBar from '../components/titlebar';
import dataFetch from '../utils/dataFetch';

const query = `
query getSubStreams($slug:String!)
{
  stream(slug:$slug)
  {
    name
    description
    streamSet
    {
      name
      slug
    }
  }
}`;

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setParams: false,
      subStreams: null
    };
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    this.setState({
      stream: params.get('stream'),
      minPoints: params.get('minPoints')||0,
      maxPoints: params.get('maxPoints')||10,
      minDifficulty: params.get('minDifficulty')||1,
      maxDifficulty: params.get('maxDifficulty')||4,
      setParams: true
    });
  }

  componentDidUpdate() {
      if(this.state.setParams && this.state.subStreams == null)
      { this.getSubStreams()  }
      else {
        console.log(this.state.subStreams);
      }
  }

  getSubStreams = async () => {
    let variables = { "slug": this.state.stream };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      this.setState({title: response.data.stream.name, description: response.data.stream.description, subStreams: response.data.stream.streamSet});
    } else {
      console.log('error');
    }
  };

  render() {
    const breadcrumbs: IBreadcrumbProps[] = [
      { href: "/", icon: "home", text: "Home" },
      { href: "/tasks", icon: "home", text: "Tasks" },
    ];

    const pointRange = [parseInt(this.state.minPoints),parseInt(this.state.maxPoints)];
    return (
      <React.Fragment>
        <Helmet>
          <title>Tasks Page</title>
        </Helmet>
        <TopBar />
        <div className="page-container">
          <TitleBar title={this.state.title + ' Tasks'} description={this.state.description} breadcrumbs={breadcrumbs} />
          <Container>
            <Row>
              <Col md={3} order={{md:"last"}}>
                <h3>Filters</h3>
                <Label>Points Range</Label>
                <RangeSlider min={0} max={10}  value={pointRange} />
                <Label>Difficulty </Label>
                <Checkbox label="Easy"  />
                <Checkbox label="Medium" />
                <Checkbox label="Tough" />
                <Checkbox label="Hard" />
              </Col>
              <Col md={9} order={{md:"first"}}>
                {this.state.setParams ?
                  <TaskList
                    stream={this.state.stream}
                    minPoints={this.state.minPoints}
                    maxPoints={this.state.maxPoints}
                    minDifficulty={this.state.minDifficulty}
                    maxDifficulty={this.state.maxDifficulty}
                  /> : null
                }
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Tasks;
