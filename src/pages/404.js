import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

import Base from './Base';

export default props => <Base title="Page Not Found" {...props}>
  <div className="h-100 justify-content-center d-flex align-items-center">
    <Result
      status="warning"
      title=""
      subTitle="Sorry, the page you visited does not exist or you don't have access to view this page."
      extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
    />
  </div>
</Base>;
