import React from "react";
import {Button, Form, Input, notification} from "antd";
import "antd/dist/antd.css";
import "./Login.css";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {login} from "../../utils/Requests";
import {ACCESS_TOKEN} from "../../utils/Constants";

const LoginForm = (props) => {
    const onFinish = values => {
        const loginRequest = Object.assign({}, values);
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                props.onLogin();
            }).catch(error => {
            if (error.status === 401) {
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
        })
    }

    return (
        <Form
            name="login_form"
            className="login-form"
            onFinish={onFinish}>

            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please enter your username"
                    }
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon"/>}
                    type="text"
                    placeholder="Username"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please enter your password"
                    }
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Don't have an account? <a href="../registration">Sign up</a>
            </Form.Item>
        </Form>
    );
}

export default LoginForm