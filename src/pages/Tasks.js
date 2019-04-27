import React from 'react';
import { Helmet } from 'react-helmet';
import Topbar from '../components/topbar';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: '',
    };
  }

  componentDidMount() {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      this.setState({stream: params.get('stream') });
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Tasks Page</title>
        </Helmet>
        <Topbar />
        <h1>{this.state.stream} Tasks</h1>

      </React.Fragment>
    );
  }
}

export default Tasks;
