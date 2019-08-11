import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

import StreamProgress from './StreamProgress';

const StreamCard = ({ name, slug }) => (
<Link to={`/tasks?stream=${slug}`}>
  <Card elevation="2" className="stream-card" interactive>
    <h1>{name}</h1>
    <StreamProgress slug={slug}/>
  </Card>
</Link>);

StreamCard.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default StreamCard;
