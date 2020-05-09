import React from 'react';
import 'antd/dist/antd.css';
import './Registration.css';
import {Button, Form, Input, notification} from 'antd';
import {register} from "../../utils/Requests";
import history from "../../history";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 8,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
        const registrationRequest = Object.assign({}, values);
        delete registrationRequest.confirm
        register(registrationRequest)
            .then(response => {
                notification.success({
                    message: 'App',
                    description: "You've successfully registered. You may log in now."
                });
                history.push('/login');
            }).catch(error => {
            notification.error({
                message: 'App',
                description: error.message || 'Sorry. Something went wrong. Please try again.'
            });
        });
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register-form"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item label="Username">
                <Form.Item
                    name="username"
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username'
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form.Item>

            <Form.Item label="First name">
                <Form.Item
                    name="firstName"
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name'
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form.Item>

            <Form.Item label="Last name">
                <Form.Item
                    name="lastName"
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name'
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form.Item>

            <Form.Item label="E-mail">
                <Form.Item
                    name="email"
                    noStyle
                    rules={[
                        {
                            type: 'email',
                            message: 'Invalid E-mail address'
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail address'
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form.Item>

            <Form.Item label="Password">
                <Form.Item
                    name="password"
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password'
                        },
                    ]}
                    hasFeedback

                >
                    <Input.Password/>
                </Form.Item>
            </Form.Item>

            <Form.Item label="Confirm Password">
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password'

                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('Passwords do not match');
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm