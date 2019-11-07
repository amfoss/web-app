import React from 'react';
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd';

import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

import dataFetch from '../../utils/dataFetch';
import { TokenAuth as query } from '../../utils/mutations';
import cmsLogo from "../../images/cms_logo.png";

const cookies = new Cookies();

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookieSet: false,
      authFail: false,
      loading: false
    };
  }

  componentDidMount() {
    const token = cookies.get('token');
    if (token != null) {
      this.setState({
        cookieSet: true,
      });
    }
  }

  login = async (variables) => await dataFetch({ query, variables });


  render() {
    const token = cookies.get('token');
    if (token) return <Redirect to="/" />;

    const { getFieldDecorator } = this.props.form;

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.login(values).then( response => {
          if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
            cookies.set('token', response.data.tokenAuth.token, { path: '/' });
            cookies.set('refreshToken', response.data.tokenAuth.refreshToken, { path: '/' });
            cookies.set('username', values.username, { path: '/' });
            this.setState({ cookieSet: true });
          } else {
            this.setState({ authFail: true, loading: false });
          }
        });
        }
      });
    };

    const errorMessage = (<div className="alert alert-danger">Login Failed</div>);

    return !this.state.loading ? (
      <Card className="login-card">
        <img src={cmsLogo} className="w-100 my-4" />
        {this.state.authFail ? errorMessage : null}
        <Form className="login-form" onSubmit={handleSubmit}>
          <Form.Item >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-block login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    ) : <h1>Loading</h1>;
  }
}

export default Form.create({ name: 'normal_login' })(LoginForm);
