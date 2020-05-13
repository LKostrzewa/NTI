import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './Registration.css';
import {Button, Form, Input, notification} from 'antd';
import {checkEmailAvailability, checkUsernameAvailability, register} from "../../utils/Requests";
import history from "../../history";


const RegistrationForm = () => {
        const [form] = Form.useForm();
        const [usernameValidationStatus, setUsernameValidationStatus] = useState('');
        const [usernameErrorMsg, setUsernameErrorMsg] = useState(null);
        const [emailValidationStatus, setEmailValidationStatus] = useState(null);
        const [emailErrorMsg, setEmailErrorMsg] = useState(null);
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');

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
        }

        function validateUsernameAvailability() {
            checkUsernameAvailability(username)
                .then(response => {
                    if (response.available) {
                        setUsernameValidationStatus('success');
                        setUsernameErrorMsg(null);
                    } else {
                        setUsernameValidationStatus('error');
                        setUsernameErrorMsg('Username is already taken');
                    }
                });
        }

        function validateEmailAvailability() {
            checkEmailAvailability(email)
                .then(response => {
                    if (response.available) {
                        setEmailValidationStatus('success');
                        setEmailErrorMsg(null);
                    } else {
                        setEmailValidationStatus('error');
                        setEmailErrorMsg('E-mail address is already taken');
                    }
                });
        }

        function validateUsername() {

        }

        return (
            <Form
                form={form}
                layout={"vertical"}
                name={"registration_form"}
                className={"registration-form"}
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    label={"Username"}
                    validateStatus={usernameValidationStatus}
                    help={usernameErrorMsg}
                    name={"username"}
                    rules={[
                        {
                            required: true,
                            message: 'Username is required'
                        },
                    ]}
                >
                    <Input
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        onBlur={validateUsernameAvailability}/>
                </Form.Item>

                <Form.Item
                    label={"First Name"}
                    name={"firstName"}
                    rules={[
                        {
                            required: true,
                            message: 'First Name is required'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={"Last Name"}
                    name={"lastName"}
                    rules={[
                        {
                            required: true,
                            message: 'Last Name is required'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={"E-mail"}
                    validateStatus={emailValidationStatus}
                    help={emailErrorMsg}
                    name={"email"}
                    rules={[
                        {
                            type: 'email',
                            message: 'Invalid E-mail address',

                        },
                        {
                            required: true,
                            message: 'E-mail address is required'
                        }
                    ]}
                >

                    <Input
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        onBlur={validateEmailAvailability}/>
                </Form.Item>

                <Form.Item
                    label={"Password"}
                    name={"password"}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Password is required'
                        }
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label={"Confirm Password"}
                    name={"confirm"}
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Password confirmation is required'
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('Passwords do not match');
                            }
                        })
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="registration-form-button">
                        Register
                    </Button>
                    <text className="login-link">Already have an acoount? <a href="../login">Login</a></text>
                </Form.Item>
            </Form>
        );
    }
;

export default RegistrationForm