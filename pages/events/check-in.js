import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// antd components
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';

import { getApplicant as query } from '../../utils/queries.js';
import { CheckIn as Mutation } from '../../utils/mutations';
import TitleBar from '../../components/titlebar';
import Base from '../../components/base';
import dataFetch from '../../utils/dataFetch';

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

const CheckIn = (props) => {
  const [data, setData] = useState('');
  const [result, setResult] = useState('No Results');
  const [status, setStatus] = useState('');
  const [errorText, setErrorText] = useState('');
  const [submitError, setSubmitError] = useState('');

  const delay = 200;

  function handleScan(scanResult) {
    if (scanResult) {
      if (result !== scanResult) {
        setResult(scanResult);
        setStatus('');
        setErrorText('');
        scanQR();
      }
    }
  }

  const scanQR = async () => {
    const variables = { hash: result };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      setData(response.data);
    } else {
      setErrorText(response.errors[0].message);
      setData('');
      setSubmitError('');
    }
  };

  const submitQR = async () => {
    const variables = { appID: data.getApplicant.id };
    const response = await dataFetch({ query: Mutation, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      setStatus(response.data.checkIn.status);
    } else {
      setSubmitError(response.errors[0].message);
      setErrorText('');
    }
  };

  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/events',
      name: 'Events',
    },
    {
      path: '/check-in',
      name: 'Check In',
    },
  ];

  return (
    <Base title="Check In" {...props}>
      <TitleBar routes={routes} title="QR Scanner" />
      <section id="check-in m-4">
        <form
          onSubmit={(e) => {
            submitQR();
            e.preventDefault();
          }}
        >
          <QrReader delay={delay} onScan={handleScan} style={{ width: '100%' }} />
          {status === 'success' ? (
            <div className="alert alert-success m-4">Successfully Checked In</div>
          ) : null}
          {submitError !== '' ? (
            <div className="alert alert-danger m-4">{submitError}</div>
          ) : null}
          {status === '' && submitError === '' ? (
            data !== '' ? (
              <div className="col-sm-12 col-md-4 pt-4">
                <Card elevation={2} className="card">
                  <h4 className="text-center">Details</h4>
                  <h6>{data.getApplicant.id}</h6>
                  <h6>{data.getApplicant.name}</h6>
                  <h6>{data.getApplicant.formData[1].value}</h6>
                  <h6>{data.getApplicant.formData[0].value}</h6>
                </Card>
                <div className="p-4">
                  <Button
                    className="col-sm-12 p-3 text-center"
                    type="submit"
                    intent="primary"
                    text="Check In"
                    style={{ fontSize: '3vh' }}
                  />
                </div>
              </div>
            ) : null
          ) : null}
          {errorText !== '' ? (
            <div className="alert alert-danger m-4">{errorText}</div>
          ) : null}
        </form>
      </section>
    </Base>
  );
};

export default CheckIn;
