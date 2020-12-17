import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';

import dataFetch from '../../utils/dataFetch';

const AlertComponent = ({ changedPlatforms, show, toggle, data }) => {
  const [result, setResult] = useState(null);

  const query = `
    mutation changeUserPlatform($username: String!, $GitLab: Boolean, $GitHub: Boolean, $CloudFlare: Boolean, $Telegram: Boolean){
      changeUserPlatform(username: $username, gitlab: $GitLab, github: $GitHub, cloudflare: $CloudFlare, telegram: $Telegram){
        status
      }
    }
  `;
  const fetchData = async (variables) => dataFetch({ query, variables });

  function getValue(obj, key) {
    let value;
    for (let i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (i === key) {
        value = obj[i];
      }
    }
    return value;
  }

  function submit() {
    const variables = { username: data.user };
    changedPlatforms.map((platform) => {
      variables[`${platform}`] = getValue(data, platform);
    });
    fetchData(variables).then((r) => {
      setResult(r.data.changeUserPlatform.status);
    });
  }

  return show ? (
    <React.Fragment>
      <div className="confirm-modal-overlay" />
      <div className="confirm-modal-wrapper" aria-modal aria-hidden role="dialog">
        <div className="confirm-modal">
          {result ? (
            <div className="alert alert-success m-2">Successfully Updated</div>
          ) : null}
          <div className="confirm-modal-header">
            <h5>Are you sure?</h5>
          </div>
          <p style={{ color: 'black' }}>
            You are updating status of <b>{data.user}</b> in the following platforms
          </p>
          {changedPlatforms.map((platform, index) => (
            <li
              key={index}
              style={{ listStyleType: 'none' }}
              className={`platform-${getValue(data, platform)}`}
            >
              {getValue(data, platform) ? (
                <PlusSquareOutlined className="platform-icon" />
              ) : (
                <MinusSquareOutlined className="platform-icon" />
              )}{' '}
              {platform}
            </li>
          ))}
          <div style={{ float: 'right' }}>
            <button
              type="button"
              className="btn btn-danger m-1"
              data-dismiss="modal"
              aria-label="Close"
              onClick={toggle}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary m-1"
              aria-label="Confirm"
              onClick={submit}
            >
              Confirm
            </button>
          </div>
          <br />
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

AlertComponent.propTypes = {
  changedPlatforms: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  show: PropTypes.bool,
  toggle: PropTypes.func,
};

export default AlertComponent;
