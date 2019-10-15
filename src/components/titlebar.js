import React from 'react';
import { PageHeader, Breadcrumb } from 'antd';

import BreadcrumbGenerator from './BreadcrumbGenerator';

const TitleBar = ({ routes, title, subTitle }) => {
  return (
    <div className="py-4 px-2">
      <BreadcrumbGenerator routes={routes} />
      <PageHeader
        title={title}
        subTitle={subTitle}
      />
    </div>
  );
};

export default TitleBar;
