import React from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';

import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login({ onLogin }) {
  return (
    <div className="login-container">
      <h1 className="page-title">Login</h1>
      <div className="login-content">
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const loginRequest = { ...values };
    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        onLogin();
      })
      .catch(error => {
        if(error.status === 401) {
          notification.error({
            message: 'Polling App',
            description: 'Your Username or Password is incorrect. Please try again!'
          });
        } else {
          notification.error({
            message: 'Polling App',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
          });
        }
      });
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="login-form">
      <Form.Item
        name="usernameOrEmail"
        rules={[{ required: true, message: 'Please input your username or email!' }]}
      >
        <Input 
          prefix={<UserOutlined />} 
          size="large"
          placeholder="Username or Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input 
          prefix={<LockOutlined />}
          size="large"
          type="password"
          placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
        Or <Link to="/signup">register now!</Link>
      </Form.Item>
    </Form>
  );
}

export default Login;
