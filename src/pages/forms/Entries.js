import React, { useEffect, useState } from 'react';
import { Table, Icon } from 'antd';
import dataFetch from '../../utils/dataFetch';
import Base from '../Base';
import TitleBar from '../../components/titlebar';
import EntryDetails from '../../modules/forms/entryDetails';

const Entries = props => {
  const formID = props.location.pathname.split("/")[2];
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
      isImportant
    }
  }`;

  const fetchFields = async variables => dataFetch({ query: formFieldsQuery, variables });
  const fetchData = async variables => dataFetch({ query, variables });

  useEffect(() => {
    if (!isLoaded) {
      if (!isDataLoaded)
        fetchData({ formID }).then(r => {
          setDataLoaded(true);
          setData(r.data.viewEntries);
        });
      if (isDataLoaded && !isLoaded)
        fetchFields({ formID }).then(r => {
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
      path: '/form/view-forms',
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
      render: name => <b>{name}</b>,
    },
    {
      title: 'Submission Time',
      dataIndex: 'submissionTime',
      key: 'submissionTime',
      render: timestamp =>
        timestamp ? (
          new Date(timestamp).toLocaleString()
        ) : (
          <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96" />
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
  ];

  isLoaded && fields.length > 0 ? fields.map( f => {
    f.isImportant ? columns.push({
              title: f.question,
              dataIndex: f.key,
              key: f.key,
              sorter: (a, b) => a.name.localeCompare(b.name),
              render: (a,r) => r.formData.find(d=> d.key === f.key).value
            })
          : null;
  }) : null;

  return (
    <Base title="View Forms | Forms" {...props}>
      <TitleBar routes={routes} title="View Entries" subTitle="View & manage entries to this form" />
      <div className="p-4">
        <Table
          loading={!isLoaded}
          dataSource={data}
          columns={columns}
          expandedRowRender={e => <EntryDetails fields={fields} data={e} />}
        />
      </div>
    </Base>
  );
};

export default Entries;
