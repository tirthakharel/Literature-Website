import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../style/Home.css';
import 'antd/dist/antd.css';

export default class GameForm extends React.Component {
  render() {
    return (
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        size="large"
      >
        <Form.Item
          placeholder="Name"
          name="name"
          style={{ textAlign: 'left !important' }}
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input
            prefix={
              <UserOutlined
                className="site-form-item-icon"
                style={{ marginRight: '8px' }}
              />
            }
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item
          name="gameCode"
          rules={[
            {
              required: true,
              message: 'Please input the game code!',
            },
          ]}
        >
          <Input
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                style={{ marginRight: '8px' }}
              />
            }
            placeholder="Game Code"
          />
        </Form.Item>

        <Form.Item
          style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            {this.props.text}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
