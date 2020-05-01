import React from 'react';
import PropTypes from 'prop-types';

// antd components
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';

const FieldEditor = ({ field }) => {
  const fieldTypes = [
    {
      name: 'Commonly Used',
      options: [
        { name: 'Email', value: 'email' },
        { name: 'Phone', value: 'phone' },
        { name: 'Age', value: 'age' },
        { name: 'Gender', value: 'gender' },
      ],
    },
    {
      name: 'String',
      options: [
        { name: 'String', value: 'string' },
        { name: 'Paragraph', value: 'paragraph' },
        { name: 'Email', value: 'email' },
        { name: 'Phone', value: 'phone' },
      ],
    },
    {
      name: 'Number',
      options: [
        { name: 'Number', value: 'number' },
        { name: 'Integer', value: 'integer' },
        { name: 'Whole Number', value: 'wholeNumber' },
      ],
    },
    {
      name: 'Select',
      options: [
        { name: 'Select / Radio', value: 'radio' },
        { name: 'Multi-Select / Checkbox', value: 'checkbox' },
      ],
    },
    {
      name: 'Upload',
      options: [
        { name: 'Image Upload', value: 'image', disabled: true },
        { name: 'File Upload', value: 'file', disabled: true },
      ],
    },
    {
      name: 'Other',
      options: [
        { name: 'Custom Regex', value: 'regex' },
        { name: 'Slot', value: 'slot' },
      ],
    },
  ];

  const renderFieldTypeSelector = (
    <div className="form-group">
      <label htmlFor={`${field.key}-type-selector`}>Field Type</label>
      <Select
        id={`${field.key}-type-selector`}
        defaultValue={field.type ? field.type : 'string'}
        style={{ width: '100%' }}
        size="large"
      >
        {fieldTypes.map((g) => (
          <Select.OptGroup label={g.name}>
            {g.options.map((f) => (
              <Select.Option disabled={f.disabled} value={f.value}>
                {f.name}
              </Select.Option>
            ))}
          </Select.OptGroup>
        ))}
      </Select>
    </div>
  );

  return (
    <div>
      <div className="form-group row mx-0 my-4">
        <div className="col-lg-3">
          <label>Field Key</label>
          <input disabled className="form-control" value={field.key} />
          <small className="text-danger">
            You cannot change key of a field, once entries for the form has been
            received.
          </small>
        </div>
        <div className="col-lg-3">{renderFieldTypeSelector}</div>
        {field.type === 'regex' ? (
          <div className="col-lg-6">
            <label>Regex Expression</label>
            <input className="form-control" value={field.regex} />
          </div>
        ) : null}
      </div>
      <div className="form-group row mx-0 my-4">
        <div className="col-lg-2">
          <label>Required Field</label>
          <div>
            <Switch disabled checked={field.required} />
          </div>
        </div>
        <div className="col-lg-2">
          <label>Important Field</label>
          <div>
            <Switch disabled checked={field.important} />
          </div>
        </div>
        <div className="col-lg-2">
          <label>Exclude from Export</label>
          <div>
            <Switch disabled />
          </div>
        </div>
      </div>
      <div className="form-group row mx-0 my-4">
        <div className="col-12 py-2">
          <label>Question</label>
          <input className="form-control" value={field.question} />
        </div>
        <div className="col-12 py-2">
          <label>Help / Hint / Instruction Text</label>
          <input className="form-control" value={field.helpText} />
        </div>
      </div>
    </div>
  );
};

FieldEditor.propTypes = {
  field: PropTypes.object,
};

export default FieldEditor;
