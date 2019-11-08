import React from 'react';

const ListSlotDetails = ({ slots }) => {
  let totalSlotCount = 0;
  slots ? slots.map(s => (totalSlotCount += s.availableCount)) : null;

  return (
    <div className="row m-0">
      <div className="col-12 py-4">
        <b>Slot Types:</b> {slots ? slots.length : 0} | <b>Total Slots:</b>{' '}
        {totalSlotCount}
      </div>
      {slots
        ? slots.map((s, i) => (
            <div className="col-md-3 p-2">
              <div className="card p-4">
                <div>#{i + 1}</div>
                <div className="py-2">
                  <label>Slot Name</label>
                  <input className="form-control" value={s.name} />
                </div>
                <div className="py-2">
                  <label>Slot Size</label>
                  <input className="form-control" value={s.availableCount} />
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ListSlotDetails;
