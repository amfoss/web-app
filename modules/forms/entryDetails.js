import React from 'react';
import PropTypes from 'prop-types';

const EntryDetails = ({ fields, data }) => {
  const getColSize = (a, b) => {
    if (a == null && b == null) return 'col-md-3 col-sm-4 col-12';
    let value;
    if (a == null) value = b.length;
    else if (b == null) value = a.length;
    else if (a.length > b.length) value = a.length;
    else value = b.length;
    if (value > 100) return 'col-12';
    if (value > 30) return 'col-md-6 col-lg-4';
    return 'col-md-4 col-lg-3';
  };

  const getItem = (label, value) => (
    <div className={`${getColSize(label, value)} p-2`}>
      <div className="card p-2">
        <div className="font-weight-bold mb-2">{label}</div>
        {value}
      </div>
    </div>
  );

  return (
    <div className="row m-0">
      <div className="col-12 py-4 px-0">
        <div className="card p-4">
          <h5 className="px-4">Entry #{data.id}</h5>
          <h4 className="px-4">{data.name}</h4>
          <ul>
            <li>
              <b>Submission Time</b>:{' '}
              {new Date(data.submissionTime).toLocaleString()}
            </li>
            <li>
              <b>Email</b>: {data.email}
            </li>
            <li>
              <b>Phone Number</b>: {data.phone}
            </li>
            <li>
              <b>Details</b>: {data.details}
            </li>
          </ul>
        </div>
      </div>
      {fields.map((f) =>
        getItem(f.question, data.formData.find((d) => d.key === f.key).value)
      )}
    </div>
  );
};

EntryDetails.propTypes = {
  fields: PropTypes.array,
  data: PropTypes.object,
};

export default EntryDetails;
