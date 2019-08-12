import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

import '../../styles/styles.sass';

import StreamProgress from './StreamProgress';

const StreamCard = ({ name, slug }) => {
  const [isLoaded, setLoaded] = useState(false);
  const loaded = () => setLoaded(true);

  return (
    <Link to={`/tasks?stream=${slug}`}>
      <Card elevation="1" className="stream-card h-100 d-flex align-items-end" interactive>
        <div>
          <h4 className={classNames({ 'bp3-skeleton': !isLoaded }, 'mb-3')}>{name}</h4>
          <StreamProgress slug={slug} onLoad={loaded} />
        </div>
      </Card>
    </Link>
  );
};

StreamCard.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default StreamCard;
