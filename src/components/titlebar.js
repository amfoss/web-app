import React from 'react';
import { PageHeader } from 'antd';

import BreadcrumbGenerator from './BreadcrumbGenerator';

const TitleBar = ({ routes, title, subTitle }) => {
  return (
    <div className="py-4 px-2">
      <div className="px-4">
        <BreadcrumbGenerator routes={routes} />
      </div>
      <PageHeader
        title={title}
        subTitle={subTitle}
      />
    </div>
  );
};

export default TitleBar;
