import React from 'react';
import { Avatar } from 'antd';

const FormMeta = ({ user, timestamp }) => (
  <div className="d-flex py-2">
    <div style={{ width: '3rem' }} className="d-flex align-items-center">
      <Avatar>{user ? user.username[0] : 'U'}</Avatar>
    </div>
    <div style={{ width: 'auto' }} className="d-flex align-items-center">
      <div>
        <div className="font-weight-bold">{ user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}</div>
        <div>{new Date(timestamp).toLocaleString()}</div>
      </div>
    </div>
  </div>
);

export default FormMeta;
