import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

// antd components
import Breadcrumb from 'antd/lib/breadcrumb';

const BreadCrumbGenerator = ({ routes }) => {
  return (
    <Breadcrumb>
      {routes
        ? routes.map((r, i) => (
            <Breadcrumb.Item key={i}>
              <Link href={r.path}>{r.name}</Link>
            </Breadcrumb.Item>
          ))
        : null}
    </Breadcrumb>
  );
};

BreadCrumbGenerator.propTypes = {
  routes: PropTypes.array,
};

export default BreadCrumbGenerator;
