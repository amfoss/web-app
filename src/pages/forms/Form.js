import React, { useEffect, useState } from 'react';
import {Table, Icon, Button} from 'antd';
import dataFetch from '../../utils/dataFetch';
import Base from '../Base';
import TitleBar from '../../components/titlebar';
import {Link} from 'react-router-dom';

const Form = props => {
  const formID = props.location.pathname.split("/")[2];

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
      name: `${formID}`,
    },
  ];

  return (
    <Base title="View Forms | Forms" {...props}>
      <TitleBar routes={routes} title={`Form ${formID}`} subTitle="View & Manage this form and the entries received." />
      <div className="p-4">
        <Link to="entries"><Button type="primary">View Entries Received</Button></Link>
      </div>
    </Base>
  );
};

export default Form;
