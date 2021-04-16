import React, { useState } from 'react';
import dataFetch from '../../utils/dataFetch';
import Link from 'next/link';

import Result from 'antd/lib/result';
import Card from "antd/lib/card";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";

const ResetForm = () => {
  const [isLoading, setLoaded] = useState(false);
  const [error, setErrorText] = useState('');
  const [success, setSuccessText] = useState('');

  const query = `
  mutation ($email: String!){
  resetPassword(email:$email){
    status
  }
}
  `;

  const submitForm = async (variables) => await dataFetch({ query, variables });

  const resetPassword = (values) => {
    submitForm(values).then((response) => {
      if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
        setErrorText(response.errors[0].message);
      } else {
        setSuccessText(response.data.status);
        setErrorText('');
        setLoaded(true);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  return !isLoading ? (
    <Card className="login-card">
      <img src="/static/images/cms_logo.png" className="w-100 my-4" alt="CMS Logo" />
      <Form
        className="login-form"
        layout="vertical"
        name="login-form"
        onFinish={resetPassword}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ message: 'Please enter your email' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-block login-form-button"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
      <Link href="/login">Already have an account? Login</Link>
    </Card>
  ) : (
    <Card className="login-form">
      {success !== '' ? (
        <Result status="success" title="Check your email for password" />
      ) : error !== '' ? (
        <div className="alert alert-danger m-4">{error}</div>
      ) : (
        <div className="alert alert-warning m-4">Submitting. Please Wait</div>
      )}
      <Link href="/login">Back to Login</Link>
    </Card>
  );
};

export default ResetForm;
