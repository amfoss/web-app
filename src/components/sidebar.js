import React, { useState, useEffect } from 'react';
import { Icon, Menu, Drawer, Typography } from 'antd';
const { Title } = Typography;
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

  const selectedKeys = selected ? selected.slice(1).split('/') : [];

  const menu = (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      defaultOpenKeys={selectedKeys}
    >
      <Menu.Item key="home">
        <span>
          <Link to="/">
            <Icon type="home" />
            Home
          </Link>
        </span>
      </Menu.Item>
      <SubMenu
        key="attendance"
        title={
          <span>
            <Icon type="deployment-unit" />
            <span>Attendance</span>
          </span>
        }
      >
        <Menu.Item key="dashboard">
          <Link to="/attendance/">
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="live-report">
          <Link to="/attendance/live-report">
              Live Attendance
          </Link>
        </Menu.Item>
        <Menu.Item key="individual-report">
          <Link to="/attendance/individual-report">
            Individual Report
          </Link>
        </Menu.Item>
        <Menu.Item key="daily-report">
          <Link to="/attendance/daily-report">
            Daily Report
          </Link>
        </Menu.Item>
        <Menu.Item key="stats">
          <Link to="/attendance/stats">
            Attendance Stats
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );

  return width > 600 ? (
        <div className="row m-0">
          <div className="col-sm-4 col-md-3">{menu}</div>
          <div className="col-sm-8 col-md-9 page-container">{children}</div>
        </div>) : (<div>
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
              <div className="col d-flex align-items-center">
                CMS
              </div>
            </div>
          </div>
          <Drawer
            title="CMS"
            placement="left"
            closable
            onClose={() => setSidebarVisible(false)}
            visible={sidebarVisible}
            bodyStyle={{ padding: 0}}
          >
            {menu}
          </Drawer>
          <div className="page-container">{children}</div>
        </div>);
};

export default Sidebar;
