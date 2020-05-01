import React, { useEffect, useState } from 'react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { useRouter } from 'next/router';

// antd components
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';

import dataFetch from '../../../utils/dataFetch';
import Base from '../../../components/base';
import TitleBar from '../../../components/titlebar';
import EntryDetails from '../../../modules/forms/entryDetails';

const Entries = (props) => {
  const formID = useRouter().query.id;
  const [data, setData] = useState('');
  const [fields, setFields] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const query = `query viewFormEntries($formID: Int!){
    viewEntries(formID: $formID)
    {
      id
      name
      submissionTime
      phone
      email
      details
      formData
      {
        key
        value
      }
    }
  }`;

  const formFieldsQuery = `query getFromFields($formID: Int!){
   getFormFields(formID: $formID)
    {
      question
      key
      important
    }
  }`;

  const fetchFields = async (variables) =>
    dataFetch({ query: formFieldsQuery, variables });
  const fetchData = async (variables) => dataFetch({ query, variables });

  useEffect(() => {
    if (!isLoaded) {
      if (!isDataLoaded)
        fetchData({ formID }).then((r) => {
          setDataLoaded(true);
          setData(r.data.viewEntries);
        });
      if (isDataLoaded && !isLoaded)
        fetchFields({ formID }).then((r) => {
          setLoaded(true);
          setFields(r.data.getFormFields);
        });
    }
  });

  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/forms/view-forms',
      name: 'Forms',
    },
    {
      path: `/form/${formID}`,
      name: `${formID}`,
    },
    {
      path: `#`,
      name: 'Entries',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => <b>{name}</b>,
    },
    {
      title: 'Submission Time',
      dataIndex: 'submissionTime',
      key: 'submissionTime',
      render: (timestamp) =>
        timestamp ? (
          new Date(timestamp).toLocaleString()
        ) : (
          <CloseCircleTwoTone twoToneColor="#eb2f96" />
        ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (details) =>
        details ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone twoToneColor="#eb2f96" />
        ),
    },
  ];

  isLoaded && fields.length > 0
    ? fields.map((f) => {
        f.important
          ? columns.push({
              title: f.question,
              dataIndex: f.key,
              key: f.key,
              sorter: (a, b) => a.name.localeCompare(b.name),
              render: (a, r) => r.formData.find((d) => d.key === f.key).value,
            })
          : null;
      })
    : null;

  const getExportData = isLoaded
    ? data.map((e) => {
        const obj = {
          name: e.name,
          submissionTime: e.submissionTime,
          email: e.email,
          phone: e.phone,
        };
        fields.map((f) => {
          obj[f.question] = e.formData.find((d) => d.key === f.key).value;
          return null;
        });
        return obj;
      })
    : null;

  return (
    <Base title="Entries | Forms" {...props}>
      <TitleBar
        routes={routes}
        title="Entries"
        subTitle="View & manage entries to this form"
      />
      <div className="d-flex px-4 justify-content-end">
        {isLoaded ? (
          <CSVLink data={getExportData}>
            <Button type="primary">Export Data</Button>
          </CSVLink>
        ) : null}
      </div>
      <div className="my-4 p-4">
        <Table
          loading={!isLoaded}
          dataSource={data}
          columns={columns}
          bodyStyle={{ overflow: 'auto', maxHeight: '80vh' }}
          expandedRowRender={(e) => <EntryDetails fields={fields} data={e} />}
        />
      </div>
    </Base>
  );
};

export default Entries;
