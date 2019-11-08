import React from 'react';
import { Collapse, Tag } from 'antd';
import FieldEditor from './fieldEditor';
import ListSlotDetails from './listSlotDetails';

const FormFields = ({ data }) => {

  const renderField = f => (
    <Collapse.Panel key={`field-${f.key}`} header={<h6 className="m-0">{f.question}</h6>}>
      <FieldEditor field={f} />
    </Collapse.Panel>
  );

  return(
    <div className="p-2 my-4">
      <Collapse bordered={false} >
        <Collapse.Panel key="name" header={<h6 className="m-0">Name <Tag color="magenta">Inbuilt</Tag></h6>}>
          <h6>Inbuilt Field</h6>
        </Collapse.Panel>
        <Collapse.Panel key="phone" header={<h6 className="m-0">Phone <Tag color="magenta">Inbuilt</Tag></h6>}>
          <h6>Inbuilt Field</h6>
        </Collapse.Panel>
        <Collapse.Panel key="email" header={<h6 className="m-0">Email <Tag color="magenta">Inbuilt</Tag></h6>}>
          <h6>Inbuilt Field</h6>
        </Collapse.Panel>
        {
          data.hasSlots ?
            <Collapse.Panel key="special" header={<h6 className="m-0">Slots <Tag color="green">Special</Tag></h6>}>
              <ListSlotDetails slots={data.slots} />
            </Collapse.Panel>
            : null
        }
        {data.fields.map(f => renderField(f))}
      </Collapse>
    </div>
  )

};

export default FormFields;
