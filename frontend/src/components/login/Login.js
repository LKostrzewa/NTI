import React from "react";
import {Button, Form, Input} from "antd";
import 'antd/dist/antd.css';
import './Login.css';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
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
                console.log("Your username or password is incorrect. Please try again!", values);
            } else {
                console.log("Sorry! Something went wrong. Please try again!");
            }
        })
    }

    return (
        <Form
            name="login_form"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
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
                {/*Or <a href="">register now!</a>*/}
            </Form.Item>
        </Form>
    );
}

export default LoginForm