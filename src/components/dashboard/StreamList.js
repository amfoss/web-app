import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import dataFetch from '../../utils/dataFetch';
import { getStreams as query } from '../../utils/queries';

import StreamCard from './StreamCard';

const StreamList = ({ hasParent, type }) => {
  const [streams, setStreams] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  const getStreams = async () => {
    const variables = { type };
    if (hasParent != null) variables.hasParent = hasParent;
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      setStreams(response.data.streams);
      setLoaded(true);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    if (!isLoaded) getStreams();
  });

  return isLoaded ? (
    <div className="row mx-0 my-4">
      {streams.map(stream => (
        <div className="col-md-6 col-lg-4 col-xl-3 p-2" key={stream.slug}>
          <StreamCard name={stream.name} slug={stream.slug} />
        </div>
      ))}
    </div>
  ) : null;
};

StreamList.propTypes = {
  type: PropTypes.string,
  hasParent: PropTypes.bool,
};

StreamList.defaultProps = {
  type: '',
  hasParent: false,
};

export default StreamList;
