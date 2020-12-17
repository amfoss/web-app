import React, { useState } from 'react';

// antd components
import Card from 'antd/lib/card';
import Menu from 'antd/lib/menu';

import Base from '../../components/base';
import TitleBar from '../../components/titlebar';
import BasicSettings from '../../components/account/basicSettings';
import ChangePassword from '../../components/account/changePassword';

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/account',
    name: 'Account',
  },
  {
    path: '/account/settings',
    name: 'Settings',
  },
];
const AccountSettings = (props) => {
  const [current, setCurrent] = useState('basic');
  return (
    <Base title="Settings" {...props} verificationRequired={false}>
      <TitleBar routes={routes} title="Account Settings" />
      <div className="mx-4 mb-4">
        <Card bordered={false}>
          <div className="row">
            <div className="col-md-3">
              <Menu onClick={(e) => setCurrent(e.key)} selectedKeys={[current]}>
                <Menu.Item key="basic">Update Profile</Menu.Item>
                <Menu.Item key="change-password">Change Password</Menu.Item>
              </Menu>
            </div>
            <div
              className="col-md-9"
              style={{
                flex: 1,
                paddingTop: '8px',
                paddingRight: '40px',
                paddingBottom: '8px',
                paddingLeft: '40px',
              }}
            >
              {current === 'basic' ? <BasicSettings /> : <ChangePassword />}
            </div>
          </div>
        </Card>
      </div>
    </Base>
  );
};

export default AccountSettings;
