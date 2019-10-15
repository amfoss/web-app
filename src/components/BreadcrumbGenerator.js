import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const BreadcrumbGenerator = ({ routes }) => {
  return (
    <Breadcrumb>
      {routes
        ? routes.map((r,i) => (
            <Breadcrumb.Item key={i}>
              <Link to={r.path}>{r.name}</Link>
            </Breadcrumb.Item>
          ))
        : null}
    </Breadcrumb>
  );
};

export default BreadcrumbGenerator;
