import React from 'react';
import PropTypes from 'prop-types';

// antd components
import Alert from 'antd/lib/alert';

const ActiveStatusBar = ({ lastSeen, membersPresentCount, isInLab }) => {
  return membersPresentCount === 0 && !isInLab ? (
    <Alert
      className="m-2"
      message="Attendance is not being recorded."
      description="Looks
      like attendance is not enabled at this point of time,
      or there is something wrong with the module.
      No member is currently getting attendance, just like you!"
      type="error"
      showIcon
    />
  ) : !isInLab && lastSeen !== null ? (
    <Alert
      className="m-2"
      message="You are not in the amFOSS Lab"
      description={`Your attendance is not being recorded. If you are really in the lab, 
      there is certainly something wrong with your configuration. Please fix it,
      or seek help. <b>You were last recorded at ${lastSeen.toString()}</b>`}
      type="warning"
      showIcon
    />
  ) : lastSeen == null ? (
    <Alert
      className="m-2"
      message="Have you configured LabTrac in your System?"
      description={`Your attendance has not been recorded ever.
        If you are yet to install and configure the LabTrac system, please do that soon.`}
      type="error"
      showIcon
    />
  ) : (
    <Alert
      className="m-2"
      message="You are in amFOSS Lab"
      description="Come on start working !"
      type="success"
      showIcon
    />
  );
};

ActiveStatusBar.propTypes = {
  lastSeen: PropTypes.dateTime,
  membersPresentCount: PropTypes.int,
  isInLab: PropTypes.bool,
};

export default ActiveStatusBar;
