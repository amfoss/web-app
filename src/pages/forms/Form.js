import React, { useEffect, useState } from 'react';
import { Table, Icon } from 'antd';
import dataFetch from '../../utils/dataFetch';
import Base from '../Base';
import TitleBar from '../../components/titlebar';

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
        <h1>This feature is arriving soon</h1>
      </div>
    </Base>
  );
};

export default Form;
