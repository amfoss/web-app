import React from 'react';
import {Card} from '@blueprintjs/core';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import StreamProgress from './StreamProgress';

const propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
};

class StreamCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <Link to={`/tasks?stream=${this.props.slug}`}>
        <Card elevation="2" className="stream-card" interactive>
          <h1>{this.props.name}</h1>
          <StreamProgress slug={this.props.slug} />
        </Card><br /><br />
      </Link>
    );
  }
}

StreamCard.props = propTypes;

export default StreamCard;
