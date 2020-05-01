import React from 'react';
import PropTypes from 'prop-types';

// antd components
import Collapse from 'antd/lib/collapse';
import Tag from 'antd/lib/tag';

import FieldEditor from './fieldEditor';

const FormFields = ({ data }) => {
  const renderField = (f) => (
    <Collapse.Panel
      key={`field-${f.key}`}
      header={<h6 className="m-0">{f.question}</h6>}
    >
      <FieldEditor field={f} />
    </Collapse.Panel>
  );

  return (
    <div className="p-2 my-4">
      <Collapse bordered={false}>
        <Collapse.Panel
          key="name"
          header={
            <h6 className="m-0">
              Name <Tag color="magenta">Inbuilt</Tag>
            </h6>
          }
        >
          <h6>Inbuilt Field</h6>
        </Collapse.Panel>
        <Collapse.Panel
          key="phone"
          header={
            <h6 className="m-0">
              Phone <Tag color="magenta">Inbuilt</Tag>
            </h6>
          }
        >
          <h6>Inbuilt Field</h6>
        </Collapse.Panel>
        <Collapse.Panel
          key="email"
          header={
            <h6 className="m-0">
              Email <Tag color="magenta">Inbuilt</Tag>
            </h6>
          }
        >
          <h6>Inbuilt Field</h6>
        </Collapse.Panel>
        {data.fields.map((f) => renderField(f))}
      </Collapse>
    </div>
  );
};

FormFields.propTypes = {
  data: PropTypes.object,
};

export default FormFields;
