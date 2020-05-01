import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// antd components
import Button from 'antd/lib/button';
import Statistic from 'antd/lib/statistic';
import Result from 'antd/lib/result';
import Tabs from 'antd/lib/tabs';

import dataFetch from '../../../utils/dataFetch';
import Base from '../../../components/base';
import TitleBar from '../../../components/titlebar';
import FormFields from '../../../modules/forms/formFields';

const FormId = (props) => {
  const formID = useRouter().query.id;
  const [data, setData] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  const query = `query getFormDetails($formID: Int!){
    getForm(formID: $formID)
    {
      name
      isActive
      allowMultiple
      submissionDeadline
      applicationLimit
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

  const fetchData = async (variables) => dataFetch({ query, variables });
  useEffect(() => {
    if (!isLoaded && formID) {
      fetchData({ formID }).then((r) => {
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
      <Statistic className="mr-4" title="Form ID" value={`#${formID}`} />
      <Statistic
        className="mr-4"
        title="Status"
        value={
          data.isActive &&
          (data.submissionDeadline === null ||
            new Date(data.submissionDeadline) > new Date())
            ? 'Active'
            : 'Inactive'
        }
      />
      <Statistic title="Entries Recieved" value={data.entriesCount} />
    </div>
  );

  const formActions = (
    <div>
      <Link href="entries">
        <Button key="2" className="mr-2">
          View Entries
        </Button>
      </Link>
      <Button key="1" type="primary">
        Open Form
      </Button>
    </div>
  );

  const headerContent = (
    <div className="row mx-0 my-4">
      <div className="col-lg-6" />
      <div className="col-lg-6 d-lg-flex justify-content-end">{formStat}</div>
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
        {isLoaded ? <FormFields data={data} /> : null}
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

export default FormId;
