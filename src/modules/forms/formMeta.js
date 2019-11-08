import React from 'react';
import UserLogCard from '../../components/user/UserLogCard';

const FormMeta = ({ data }) => {
  const processedData = [
    {
      label: 'Last Edited',
      col: 'col-lg-6',
      value: (
        <UserLogCard user={data.lastEditor} timestamp={data.lastEditTime} />
      ),
    },
    {
      label: 'Created',
      col: 'col-lg-6',
      value: <UserLogCard user={data.creator} timestamp={data.creationTime} />,
    },
  ];

  const renderProperty = (label, value) => (
    <div className="p-2">
      <div className="mb-2 font-weight-bold">{label}</div>
      {value}
    </div>
  );

  return (
    <div className="card p-2">
      <h5 className="p-4">History</h5>
      <div className="row m-0">
        {processedData.map(p => (
          <div className={p.col}>{renderProperty(p.label, p.value)}</div>
        ))}
      </div>
    </div>
  );
};
export default FormMeta;
