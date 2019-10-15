import React from 'react';
import { Alert } from 'antd';

const ActiveStatusBar = ({ lastSeen, membersPresentCount, isInLab }) => {
  return membersPresentCount === 0 && !isInLab ? (
    <Alert
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
      message="You are not in the FOSS Lab"
      description={`Your attendance is not being recorded. If you are really in the lab, 
      there is certainly something wrong with your configuration. Please fix it,
      or seek help. <b>You were last recorded at ${lastSeen.toString()}</b>`}
      type="warning"
      showIcon
    />
  ) : lastSeen == null ? (
    <Alert
      message="Have you configured LabTrac in your System?"
      description={`Your attendance has not been recorded ever.
        If you are yet to install and configure the LabTrac system, please do that soon.`}
      type="error"
      showIcon
    />
  ) : (
    <Alert
      message="You are in FOSSLab"
      description={`Your attendance is being recorded.
       You were last recorded at ${lastSeen.toString()}`}
      type="error"
      showIcon
    />
  );
};

export default ActiveStatusBar;
