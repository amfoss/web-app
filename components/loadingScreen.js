import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const LoadingScreen = ({ text }) => {
  return (
    <div className="loading">
      <ReactLoading type={'bars'} color={'#001529'} height={'10%'} width={'10%'} />
      <h5 className="loading-text">{text}</h5>
    </div>
  );
};

LoadingScreen.propTypes = {
  text: PropTypes.string,
};

export default LoadingScreen;
