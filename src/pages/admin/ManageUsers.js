import React, {useEffect, useRef, useState} from "react";
import Base from "../Base";

import TitleBar from "../../components/titlebar";
import dataFetch from "../../utils/dataFetch";
import AddRemoveCard from "../../components/admin/AddRemoveCard";
import Highlighter from 'react-highlight-words';
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useModal from "../../components/admin/useModal";

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/admin',
    name: 'Admin',
  },
  {
    path: '/admin/users',
    name: 'Users',
  }
];

const Users = props => {
  const [usersData, setUsersData] = useState([]);
  const [isUsersLoaded, setUsersLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const [username, setUsername] = useState("");
  const searchInput = useRef(null);
  const {show, toggle} = useModal();

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: 'S.NO',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: 90,
    },
    {
      title: 'Name',
      dataIndex: 'profile.fullName',
      key: 'profile.fullName',
      sorter: (a, b) => a.profile.fullName.localeCompare(b.profile.fullName),
      ...getColumnSearchProps('profile.fullName'),
    },
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Batch',
      dataIndex: 'profile.batch',
      key: 'profile.batch',
      filters: [
        { text: '2016', value: "2016" },
        { text: '2017', value: "2017" },
        { text: '2018', value: "2018" },
        { text: '2019', value: "2019" }
      ],
      onFilter: (value, record) => record.profile.batch.indexOf(value) === 0,
    },
    {
      title: 'Membership',
      dataIndex: 'isMembershipActive',
      key: 'isMembershipActive',
      render: (record) => record ? 'Active': 'Not Active',
      filters: [
        { text: 'Active', value: true },
        { text: 'Not Active', value: false },
      ],
      onFilter: (value, record) => record.isMembershipActive === value
    },
  ];

  const usersQuery = `
    {
      users{
        username
        email
        isMembershipActive
        profile{
          fullName
          batch
        }
      }
    }
  `;

  const fetchUsersData = async() => dataFetch({ query: usersQuery });

  useEffect(() => {
    if(!isUsersLoaded){
      fetchUsersData().then(r => {
        setUsersLoaded(true);
        setUsersData(r.data.users);
      })
    }
  });

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setUsername(selectedRows[0].username);
      toggle();
    },
    getCheckboxProps: record => ({
      disabled: record.username === 'amFOSS-Admin',
      username: record.username,
    }),
  };

  return (
    <Base title="Manage Users" {...props}>
      <TitleBar routes={routes} title="Manage Users" />
      <div className="m-4">
        <Table
          className="mt-4"
          bordered
          pagination={false}
          bodyStyle={{ overflow: 'auto', maxHeight: '80vh' }}
          loading={!isUsersLoaded}
          dataSource={usersData}
          columns={columns}
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          scroll={{ y: 240 }}
        />
      </div>
      <AddRemoveCard showCard={show} toggleCard={toggle} name="Add or Remove" username={username}/>
    </Base>
  )
};

export default Users
