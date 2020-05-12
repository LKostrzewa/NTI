import React from 'react';
import 'antd/dist/antd.css';
import './Registration.css';
import {Button, Form, Input, notification} from 'antd';
import {register} from "../../utils/Requests";
import history from "../../history";


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
            form={form}
            layout="vertical"
            name="registration_form"
            className="registration-form"
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

            <Form.Item>
                <Button type="primary" htmlType="submit" className="registration-form-button">
                    Register
                </Button>
                <text className="login-link">Already have an acoount? <a href="../login">Login</a></text>
            </Form.Item>
        </Form>
    );
};

function validateEmailAvailability() {
    // First check for client side errors in email
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if(emailValidation.validateStatus === 'error') {
        this.setState({
            email: {
                value: emailValue,
                ...emailValidation
            }
        });
        return;
    }

    this.setState({
        email: {
            value: emailValue,
            validateStatus: 'validating',
            errorMsg: null
        }
    });

    checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'This Email is already registered'
                    }
                });
            }
        }).catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'success',
                errorMsg: null
            }
        });
    });
}

export default RegistrationForm