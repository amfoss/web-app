import React, { useState, useEffect } from 'react';
import {Icon, Menu, Drawer, Card} from 'antd';
import { Link } from 'react-router-dom';

import list from '../pages/links';
import cmsLogo from '../images/cms_logo.png';

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

const Sidebar = ({ selected, children, isClubMember, isLoaded }) => {
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

  const getMenuItem = ( link, label, icon, key) => (
    <Menu.Item key={key}>
      <Link to={link}>
        <Icon type={icon}/>
        {label}
      </Link>
    </Menu.Item>
  );

  const menu = (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      defaultOpenKeys={selectedKeys}
      style={{ height: '100vh' }}
      theme="dark"
    >
      <div className="text-center my-4">
        <img src={cmsLogo} style={{ width: "80%"}} />
      </div>
      {
        list.map(i =>
          (isClubMember || i.clubExclusive === undefined) ?
            i.items ?
              <SubMenu
                key={i.key}
                title={
                  <div><Icon type={i.icon} />{i.title}</div>
                }
              >
                { i.items.map(e =>
                    getMenuItem(`/${i.key}/${e.key}`, e.title, e.icon,`${i.key}-${e.key}`, )
                  )
                }
              </SubMenu>
              : getMenuItem(i.key !== '/' ? `/${i.key}` : '/', i.title, i.icon,`${i.key}`, )
            : null
        )
      }
    </Menu>
  );

  const navbar = (<div className="navbar navbar-light bg-light p-2">
    <div className="row m-0 w-100 p-2">
      { width < 600 ?
        <React.Fragment>
          <div className="col-2 d-flex align-items-center">
            <Icon
              type="menu"
              theme="outlined"
              style={{ fontSize: '1.5rem' }}
              onClick={() => setSidebarVisible(true)}
            />
          </div>
          <div className="col d-flex align-items-center">
            <img src={cmsLogo} style={{ height: "5vh"}} />
          </div>
        </React.Fragment> : null
      }
    </div>
    <Drawer
      placement="left"
      closable
      onClose={() => setSidebarVisible(false)}
      visible={sidebarVisible}
      bodyStyle={{ padding: 0 }}
    >
      {menu}
    </Drawer>
  </div>);

  return width > 600 ? (
    <div className="row m-0">
      <div className="col-sm-4 col-md-4 col-lg-3 col-xl-2 p-0">{menu}</div>
      <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 p-0 page-container">
        {children}
      </div>
    </div>
  ) : (
    <div>
      {navbar}
      <div className="page-container">{children}</div>
    </div>
  );
};

export default Sidebar;
