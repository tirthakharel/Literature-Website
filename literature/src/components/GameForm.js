import React from 'react';
import { Tabs, Form, Input, Button, Checkbox } from 'antd';
import "antd/dist/antd.css";

const { TabPane } = Tabs;
const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default class GameForm extends React.Component {

  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Join Game" key="1">
          <Form
            {...layout}
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

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Join Game
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Create Game" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
      );
  }
}
