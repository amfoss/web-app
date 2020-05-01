import React from 'react';
import Router from 'next/router';

// antd components
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';

import Base from '../components/base';

export default (props) => (
  <Base title="Page Not Found" {...props}>
    <div
      className="h-100 justify-content-center d-flex align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist or you don't have access to view this page."
        extra={
          <Button type="primary" onClick={() => Router.push('/')}>
            Back Home
          </Button>
        }
      />
    </div>
  </Base>
);
