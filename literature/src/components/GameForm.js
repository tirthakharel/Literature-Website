import React from 'react';
import { Form, Input, Button } from 'antd';
import "antd/dist/antd.css";

export default class GameForm extends React.Component {

  render() {
    return (
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Game Code"
          name="gameCode"
          rules={[
            {
              required: true,
              message: 'Please input the game code!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Join Game
          </Button>
        </Form.Item>
      </Form>
      );
  }
}
