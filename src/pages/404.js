import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

import Base from './Base';

export default props => <Base {...props}>
  <Result
    status="404"
    title=""
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
  />
</Base>;
