import React, { useEffect, useState } from 'react';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EyeOutlined,
  LinkOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

// antd components
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Badge from 'antd/lib/badge';

import dataFetch from '../../utils/dataFetch';
import Base from '../../components/base';
import TitleBar from '../../components/titlebar';

const ViewForms = (props) => {
  const [data, setData] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  const query = `query{
    viewForms
    {
      id
      name
      isActive
      allowMultiple
      entriesCount
      submissionDeadline
      applicationLimit
    }
  }`;

  const fetchData = async () => dataFetch({ query });

  useEffect(() => {
    if (!isLoaded) {
      fetchData().then((r) => {
        setData(r.data.viewForms);
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
      path: '/forms',
      name: 'Forms',
    },
    {
      path: '/forms/view-forms',
      name: 'View Forms',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, obj) => <Link href={`/form/${obj.id}/`}>{name}</Link>,
    },
    {
      title: 'Entries',
      dataIndex: 'entriesCount',
      key: 'entriesCount',
      render: (entriesCount, obj) => (
        <Link href={`/form/${obj.id}/entries`}>
          <Button type="dashed">{entriesCount} Entries</Button>
        </Link>
      ),
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (status) => <Badge status={`${status ? 'success' : 'error'}`} />,
    },
    {
      title: 'Multiple Entries',
      dataIndex: 'allowMultiple',
      key: 'allowMultiple',
      filters: [
        {
          text: 'Allowed',
          value: true,
        },
        {
          text: 'Denied',
          value: false,
        },
      ],
      onFilter: (value, record) => record.allowMultiple === value,
      render: (status) =>
        status ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone twoToneColor="#eb2f96" />
        ),
    },
    {
      title: 'Submission Deadline',
      dataIndex: 'submissionDeadline',
      key: 'submissionDeadline',
      render: (timestamp) =>
        timestamp ? (
          new Date(timestamp).toLocaleString()
        ) : (
          <CloseCircleTwoTone twoToneColor="#eb2f96" />
        ),
    },
    {
      title: 'Admission Limit',
      dataIndex: 'applicationLimit',
      key: 'applicationLimit',
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'x',
      render: () => (
        <div>
          <Button type="dashed" icon={<EyeOutlined />} className="m-1" />
          <Button type="dashed" icon={<LinkOutlined />} className="m-1" />
          <Button type="dashed" icon={<EditOutlined />} className="m-1" />
          <Button type="dashed" icon={<DeleteOutlined />} className="m-1" />
        </div>
      ),
    },
  ];

  return (
    <Base title="View Forms | Forms" {...props}>
      <TitleBar
        routes={routes}
        title="View Forms"
        subTitle="View and manage forms and entries received for which you have access to."
      />
      <div className="p-4">
        <Table
          bodyStyle={{ overflow: 'auto', maxHeight: '80vh' }}
          loading={!isLoaded}
          dataSource={data}
          columns={columns}
        />
      </div>
    </Base>
  );
};

export default ViewForms;
