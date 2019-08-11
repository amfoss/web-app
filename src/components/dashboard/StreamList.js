import React from 'react';
import { Row, Col } from 'react-grid';
import PropTypes from 'prop-types';

import dataFetch from '../../utils/dataFetch';
import { getStreams as query } from '../../utils/queries';

import StreamCard from './StreamCard';

const propTypes = {
  type: PropTypes.string,
  noParent: PropTypes.bool,
};

const defaultProps = {
  type: '',
  hasParent: null,
};

class StreamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: '',
      setStreams: false
    };
  }

  componentDidMount() {
      this.getStreams();
  }

  getStreams = async () => {
    let variables = { "type": this.props.type };
    this.props.hasParent != null ? variables["hasParent"] = this.props.hasParent : null;
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
          this.setState({streams: response.data.streams, setStreams: true});
    } else {
        console.log('error');
    }
  };

  render() {
    return (
      this.state.setStreams ?
        <Row>
        { this.state.streams.map((stream) =>
        <Col md={4} key={stream.slug}>
          <StreamCard
            name={stream.name}
            slug={stream.slug}
          />
        </Col>
        )}
        </Row>
        : null
    );
  }
}

StreamList.props = propTypes;
StreamList.defaultProps = defaultProps;

export default StreamList;
