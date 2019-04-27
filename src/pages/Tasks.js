import React from 'react';
import { Helmet } from 'react-helmet';
import Topbar from '../components/topbar';
import { Flex, Box } from '@rebass/grid'
import { RangeSlider, Label, Checkbox } from '@blueprintjs/core';

import TaskList from '../components/tasks/taskList'

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setParams: false
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

  render() {
    const pointRange = [parseInt(this.state.minPoints),parseInt(this.state.maxPoints)];
    return (
      <React.Fragment>
        <Helmet>
          <title>Tasks Page</title>
        </Helmet>
        <Topbar />
        <Flex>
          <Box width={3/4} p={4}>
          <h1>{this.state.stream} Tasks</h1>
            {this.state.setParams ?
              <TaskList
                stream={this.state.stream}
                minPoints={this.state.minPoints}
                maxPoints={this.state.maxPoints}
                minDifficulty={this.state.minDifficulty}
                maxDifficulty={this.state.maxDifficulty}
              /> : null
            }
          </Box>
          <Box width={1/4} p={4}>
            <Label>Points Range </Label>
            <RangeSlider min={0} max={10}  value={pointRange} />
            <Label>Difficulty </Label>
            <Checkbox label="Easy"  />
            <Checkbox label="Medium" />
            <Checkbox label="Tough" />
            <Checkbox label="Hard" />
          </Box>
        </Flex>

      </React.Fragment>
    );
  }
}

export default Tasks;
