import React from 'react';
import { Card } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import dataFetch from '../../utils/dataFetch';
import StreamCard from './StreamCard';

const query = `
query getStreams($type:String,$hasParent:Boolean)
{
  streams(streamType: $type, hasParent:$hasParent)
  {
    name
    slug
    type
    description
  }
}`;

const propTypes = {
  type: PropTypes.string,
  noParent: PropTypes.bool
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
          this.state.setStreams ? this.state.streams.map((stream) =>
            <StreamCard
                  name={stream.name}
                  description={stream.description}
                  slug={stream.slug}
                  key={stream.slug}
            /> ) : null
    );
  }
}

StreamList.props = propTypes;
StreamList.defaultProps = defaultProps;

export default StreamList;
