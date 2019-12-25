import React, {useEffect, useState} from 'react';

import Base from '../Base';
import TitleBar from "../../components/titlebar";
import {Button, Table} from "antd";
import dataFetch from "../../utils/dataFetch";

const Password =  props => {
  const [data, setData] = useState('');
  const [isLoaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [showID, setShowID] = useState(-1);

  const query = `{
  viewAccounts{
    name
    url
    loginName
    password
  }
}`;
  const showPassword = (show, index) => {
    setShow(!show);
    if (showID === index) setShowID(-1);
    else setShowID(index);
  };

  const fetchData = async () => dataFetch({ query });

  useEffect(() => {
    if (!isLoaded) {
      fetchData().then(r => {
        setData(r.data.viewAccounts);
        setLoaded(true);
      });
    }
  });
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/account',
      name: 'Accounts',
    },
    {
      path: '/password',
      name: 'Password Manager',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Login Name',
      dataIndex: 'loginName',
      key: 'loginName',
    },
    {
      title: 'Password',
      dataIndex: '',
      key: 'password',
      render: (records, index) =>
        showID === index ? (
          <div className="row m-0">
            <div className="col-sm-6">
              <div>{records.password}</div>
            </div>
            <div className="col-sm-6"><Button type="dashed" icon="eye" className="m-1" onClick={e => showPassword(show, index)}/></div>
          </div>
      ): <div className="row m-0">
          <div className="col-sm-6">
            <div>***************</div>
          </div>
          <div className="col-sm-6"><Button type="dashed" icon="eye" className="m-1" onClick={e => showPassword(show, index)}/></div>
        </div>
    }
  ];
  return (
    <Base title="Password Manager" {...props}>
      <TitleBar routes={routes} title="Password Manager" />
      <div className="p-4">
        <Table
          bodyStyle={{ overflow: 'auto', maxHeight: '80vh' }}
          loading={!isLoaded}
          dataSource={data}
          columns={columns}
        />
      </div>
    </Base>
  )
};

export default Password
