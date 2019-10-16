import React, { useState, useEffect } from 'react';
import { Icon, Menu, Drawer } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const Sidebar = ({ selected, children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { width } = useWindowDimensions();

  let selectedKeys = selected ? selected.slice(1).split('/') : [];
  selectedKeys.length > 0
    ? (selectedKeys = selectedKeys.map((e, i) => {
        if (i !== 0) {
          return selectedKeys[i - 1] + '-' + e;
        }
        return e;
      }))
    : [];

  const menu = (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      defaultOpenKeys={selectedKeys}
      style={{ minHeight: '100vh' }}
    >
      <Menu.Item key="dashboard">
        <span>
          <Link to="/">
            <Icon type="dashboard" />
            Dashboard
          </Link>
        </span>
      </Menu.Item>
      <SubMenu
        key="tasks"
        title={
          <span>
            <Icon type="experiment" />
            <span>Tasks</span>
          </span>
        }
      >
        <Menu.Item key="tasks-dashboard">
          <Link to="/tasks/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="tasks-progress">
          <Link to="/tasks/progress/">My Progress</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Divider/>
      <Menu.ItemGroup>
      <SubMenu
        key="attendance"
        title={
          <span>
            <Icon type="deployment-unit" />
            <span>Attendance</span>
          </span>
        }
      >
        <Menu.Item key="attendance-dashboard">
          <Link to="/attendance/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="attendance-live-report">
          <Link to="/attendance/live-report">Live Attendance</Link>
        </Menu.Item>
        <Menu.Item key="attendance-individual-report">
          <Link to="/attendance/individual-report">Individual Report</Link>
        </Menu.Item>
        <Menu.Item key="daily-report">
          <Link to="/attendance/daily-report">Daily Report</Link>
        </Menu.Item>
        <Menu.Item key="attendance-stats">
          <Link to="/attendance/stats">Attendance Stats</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="status-updates"
        title={
          <span>
            <Icon type="schedule" /> <span>Status Updates</span>
          </span>
        }
      >
        <Menu.Item key="status-updates-dashboard">
          <Link to="/status-updates/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="status-updates-daily-report">
          <Link to="/status-updates/daily-report/">Daily Report</Link>
        </Menu.Item>
      </SubMenu>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.ItemGroup>
        <SubMenu
          key="settings"
          title={
            <span>
            <Icon type="setting" />
            <span>Settings</span>
          </span>
          }
        >
          <Menu.Item key="settings-general">
            <Link to="/settings/general">General</Link>
          </Menu.Item>
          <Menu.Item key="settings-preferences">
            <Link to="/settings/preferences">Appearance</Link>
          </Menu.Item>
          <Menu.Item key="settings-privacy">
            <Link to="/settings/privacy">Privacy</Link>
          </Menu.Item>
          <Menu.Item key="settings-notifications">
            <Link to="/settings/notifications">Notifications</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="account"
          title={
            <span>
            <Icon type="user" /> <span>Account</span>
          </span>
          }
        >
          <Menu.Item key="account-profile">
            <Link to="/account/profile/">Profile</Link>
          </Menu.Item>
          <Menu.Item key="change-password">
            <Link to="/account/change-password">Change Password</Link>
          </Menu.Item>
          <Menu.Item key="account-logout">
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </SubMenu>
      </Menu.ItemGroup>
    </Menu>
  );

  return width > 600 ? (
    <div className="row m-0">
      <div className="col-sm-4 col-md-3 col-lg-2">{menu}</div>
      <div className="col-sm-8 col-md-9 col-lg-10 page-container">
        {children}
      </div>
    </div>
  ) : (
    <div>
      <div className="navbar navbar-light bg-light p-2">
        <div className="row m-0 w-100 p-2">
          <div className="col-2 d-flex align-items-center">
            <Icon
              type="menu"
              theme="outlined"
              style={{ fontSize: '1.5rem' }}
              onClick={() => setSidebarVisible(true)}
            />
          </div>
          <div className="col d-flex align-items-center">CMS</div>
        </div>
      </div>
      <Drawer
        title="CMS"
        placement="left"
        closable
        onClose={() => setSidebarVisible(false)}
        visible={sidebarVisible}
        bodyStyle={{ padding: 0 }}
      >
        {menu}
      </Drawer>
      <div className="page-container">{children}</div>
    </div>
  );
};

export default Sidebar;
