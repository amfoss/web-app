import React, {useState} from "react";
import Base from "../Base";
import TitleBar from "../../components/titlebar";
import {Card, Menu, Upload, Icon, Button} from "antd";
import BasicSettings from "../../components/account/BasicSettings";
import ChangePassword from "../../components/account/ChangePassword";


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
  }
];
const AccountSettings = props => {
  const [current, setCurrent] = useState("basic");
  return(
    <Base title="Settings" {...props}>
      <TitleBar routes={routes} title="Account Settings" />
      <div className="mx-4 mb-4">
        <Card bordered={false}>
          <div className="row">
            <div className="col-md-3">
              <Menu
                onClick={e => setCurrent(e.key)}
                selectedKeys={[current]}
              >
                <Menu.Item key="basic">Basic Settings</Menu.Item>
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
                paddingLeft: '40px'
              }}
            >
              { current === 'basic' ? <BasicSettings/> : <ChangePassword/>}
            </div>
          </div>
        </Card>
      </div>
    </Base>
  )
};

export default AccountSettings
