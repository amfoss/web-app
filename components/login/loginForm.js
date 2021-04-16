import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';

// antd components
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';

import dataFetch from '../../utils/dataFetch';
import { TokenAuth as query } from '../../utils/mutations';

const cookies = new Cookies();

const LoginForm = () => {
  const router = useRouter();
  const [cookiesSet, setCookies] = useState(false);
  const [authFail, setAuthFail] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = cookies.get('token');
    if (token != null) {
      setCookies(true);
      router.push('/');
    }
  });

  const login = async (variables) => await dataFetch({ query, variables });

  const onFinish = (values) => {
    login(values).then((response) => {
      if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
        const tokenMaxAge =
          response.data.tokenAuth.payload.exp -
          response.data.tokenAuth.payload.origIat;
        cookies.set('token', response.data.tokenAuth.token, {
          path: '/',
          maxAge: tokenMaxAge,
        });
        cookies.set('refreshToken', response.data.tokenAuth.refreshToken, {
          path: '/',
          maxAge: response.data.tokenAuth.refreshExpiresIn,
        });
        cookies.set('username', values.username, { path: '/' });
        cookies.set('expiry', response.data.tokenAuth.payload.exp);
        setCookies(true);
        router.push('/');
      } else {
        setAuthFail(true);
        setLoading(false);
      }
    });
  };

  const errorMessage = (
    <div className="alert alert-danger">Please enter vaild credentials</div>
  );

  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  return !loading ? (
    <Card className="login-card">
      <img src="/static/images/cms_logo.png" className="w-100 my-4" alt="CMS Logo" />
      {authFail ? errorMessage : null}
      <Form
        className="login-form"
        layout="vertical"
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-block login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        <Link href="/reset-password">Forgot Password?</Link>

      </Form>
      <Link href="/register">Don't have account? Register</Link>

    </Card>
  ) : (
    <h1>Loading</h1>
  );
};

export default LoginForm;
