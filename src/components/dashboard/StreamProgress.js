import React, { useState, useEffect, useContext } from 'react';
import { ProgressBar } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Cookies from 'universal-cookie';

import dataFetch from '../../utils/dataFetch';
import { getStreamProgress as query } from '../../utils/queries';

const cookies = new Cookies();

const StreamProgress = ({ slug, onLoad }) => {
  const [isSet, setData] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [tasksPending, setTasksPending] = useState(0);

  const getProgress = async () => {
    const token = cookies.get('token');
    const username = cookies.get('username');
    const variables = { slug, username, token };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      setTasksPending(response.data.streamProgress.tasksPending);
      setTasksCompleted(response.data.streamProgress.tasksCompleted);
      setProgress(response.data.streamProgress.progress);
      setData(true);
      onLoad();
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    if (!isSet) getProgress();
  });

  return (
    <React.Fragment>
      <div className={classNames({ 'bp3-skeleton': !isSet }, 'mb-2')}>
        {`${tasksCompleted} completed out of ${tasksPending + tasksCompleted}`}
      </div>
      <ProgressBar
        className={classNames({ 'bp3-skeleton': !isSet })}
        value={progress > 0 ? progress : 0.05}
        animate={false}
        stripes={false}
        intent="success"
      />
    </React.Fragment>
  );
};

StreamProgress.propTypes = {
  slug: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default StreamProgress;
