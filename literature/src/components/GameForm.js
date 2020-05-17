import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../style/Home.css';
import 'antd/dist/antd.css';

export default class GameForm extends React.Component {

  onFinish = values => {
    let name = values.name;
    let room = values.gameCode;
    if (this.props.text === "Join Game") {
      this.props.socket.emit('join', { name, room }, (error) => {
        if (error) {
          alert(error);
        } else {
          this.props.play();
        }
      });
    } else if (this.props.text === "Create Game") {
      this.props.socket.emit('create', { name, room }, (error) => {
        if (error) {
          alert(error);
        } else {
          this.props.play();
        }
      });
    }
  }

  render() {
    return (
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        size="large"
        onFinish={this.onFinish}
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
