import React from 'react';
import TitleBar from '../../components/titlebar';
import Base from '../../components/base';
import AddBlog from '../../components/blog/addBlog';

import Card from 'antd/lib/card';

const CreateBlog = (props) => {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/blog',
      name: 'Blog',
    },
    {
      path: '/blog/create-blog',
      name: 'Create Blog',
    },
  ];

  return (
    <Base title="Create Blog | Blog" {...props}>
      <TitleBar routes={routes} title="Blog" subTitle="Create Blog" />
      <div className="m-4">
        <Card bordered={false}>
          <AddBlog />
        </Card>
      </div>
    </Base>
  );
};

export default CreateBlog;
