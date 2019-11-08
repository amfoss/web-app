import React, { useEffect, useState } from 'react';
import { Button, Statistic, Tabs, Result } from 'antd';
import { Link } from 'react-router-dom';

import dataFetch from '../../utils/dataFetch';
import Base from '../Base';
import TitleBar from '../../components/titlebar';
import FormMeta from '../../modules/forms/formMeta';
import FormFields from '../../modules/forms/formFields';

const Form = props => {
  const formID = props.location.pathname.split("/")[2];
  const [data, setData] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  const query = `query getFormDetails($formID: Int!){
    getForm(formID: $formID)
    {
      name
      creator
      {
        username
        firstName
        lastName
      }
      lastEditor
      {
        username
        firstName
        lastName
      }
      creationTime
      lastEditTime
      isActive
      allowMultiple
      submissionDeadline
      admissionLimit
      hasSlots
      slots
      {
        name
        availableCount
      }
      entriesCount
      fields
      {
        question
        required
        important
        type
        regex
        key
      }  
    }
  }`;

  const fetchData = async variables => dataFetch({ query, variables });
  useEffect(() => {
    if (!isLoaded) {
      fetchData({ formID }).then(r => {
        setLoaded(true);
        setData(r.data.getForm);
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
      path: `#`,
      name: isLoaded ? `${data.name}` : formID,
    },
  ];

  const formStat = (
    <div className="d-flex">
      <Statistic className="mr-4" title="Form ID" value={`#${formID}`}/>
      <Statistic
        className="mr-4"
        title="Status"
        value={
          data.isActive &&
          (data.submissionDeadline === null || new Date(data.submissionDeadline) > new Date())
            ? 'Active'
            : 'Inactive'
        }
      />
      <Statistic title="Entries Recieved" value={data.entriesCount} />
    </div>
  );

  const formActions = (
    <div>
      <Link to="entries">
        <Button key="2" className="mr-2">
          View Entries
        </Button>
      </Link>
      <Button key="1" type="primary">Open Form</Button>
    </div>
  );

  const formDetails = (
    <div className="row m-0">
      <div className="col-lg-6" />
      <div className="col-lg-6">{isLoaded ? <FormMeta data={data} /> : null}</div>
    </div>
  );

  const headerContent = (
    <div className="row mx-0 my-4">
      <div className="col-lg-6" />
      <div className="col-lg-6 d-lg-flex justify-content-end">
        {formStat}
      </div>
    </div>
  );

  const panes = (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Statistics" key="1">
        <Result
          status="404"
          title="Statistics are unavailable for this form"
          extra={<p>We are working on it</p>}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Fields" key="2">
        { isLoaded ? <FormFields data={data} /> : null }
      </Tabs.TabPane>
      <Tabs.TabPane tab="About" key="3">
        {formDetails}
      </Tabs.TabPane>
    </Tabs>
  );


  return (
    <Base title="View Forms | Forms" {...props}>
      <TitleBar
        routes={routes}
        title={isLoaded ? data.name : `Form ${formID}`}
        subTitle="View & Manage this form and the entries received."
        pageHeaderProps={{
          extra: formActions,
          footer: panes,
        }}
        pageHeaderContent={{
          extra: headerContent,
        }}
      />
    </Base>
  );
};

export default Form;
