import React from 'react';
import {Card, Menu} from '@blueprintjs/core';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
  description: PropTypes.string,
};

class StreamCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <Link to={`/tasks?stream=${this.props.slug}`}>
        <Card elevation="2">
          <h1>{this.props.name}</h1>
          {this.props.description}
        </Card>
      </Link>
    );
  }
}

StreamCard.props = propTypes;

export default StreamCard;