import React from 'react';
import { PageHeader } from 'antd';

import BreadcrumbGenerator from './BreadcrumbGenerator';

const TitleBar = ({
  routes,
  title,
  subTitle,
  pageHeaderProps,
  pageHeaderContent,
}) => {
  return (
    <div className="py-4 px-2">
      <div className="px-4">
        <BreadcrumbGenerator routes={routes} />
      </div>
      <PageHeader title={title} subTitle={subTitle} {...pageHeaderProps}>
        {pageHeaderContent ? (
          <div className="content">
            <div className="main">{pageHeaderContent.children}</div>
            <div className="extra">{pageHeaderContent.extra}</div>
          </div>
        ) : null}
      </PageHeader>
    </div>
  );
};

export default TitleBar;
