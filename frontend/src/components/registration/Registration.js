import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.css'
import './Registration.css'
import {Button, Form, Input, notification} from 'antd'
import {checkEmailAvailability, checkUsernameAvailability, register} from "../../utils/Requests"
import history from "../../history"


const RegistrationForm = (props) => {
    const [form] = Form.useForm();
    const [usernameValidationStatus, setUsernameValidationStatus] = useState('')
    const [usernameErrorMsg, setUsernameErrorMsg] = useState(null)
    const [emailValidationStatus, setEmailValidationStatus] = useState('')
    const [emailErrorMsg, setEmailErrorMsg] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const {getFieldError} = form

    const onFinish = values => {
        const registrationRequest = Object.assign({}, values)
        delete registrationRequest.confirm
        register(registrationRequest)
            .then(() => {
                notification.success({
                    message: "Sukces",
                    description: "Udana rejestracja. Możesz się teraz zalogować."
                });
                history.push("/login")
            }).catch(error => {
            notification.error({
                message: "Niepowodzenie",
                description: error.message || "Wystąpił błąd. Proszę spróbować jeszcze raz"
            })
        })
    }

    const validateUsernameAvailability = () => {
        if (getFieldError("username").length === 0) {
            checkUsernameAvailability(username)
                .then(response => {
                    if (response.available) {
                        setUsernameValidationStatus("success");
                        setUsernameErrorMsg(null)
                    } else {
                        setUsernameValidationStatus("error");
                        setUsernameErrorMsg("Ten login jest już zajęty");
                    }
                })
        }
    }

    const validateEmailAvailability = () => {
        if (getFieldError("email").length === 0) {
            checkEmailAvailability(email)
                .then(response => {
                    if (response.available) {
                        setEmailValidationStatus("success")
                        setEmailErrorMsg(null)
                    } else {
                        setEmailValidationStatus("error")
                        setEmailErrorMsg("Ten email jest już zajęty")
                    }
                })
        }
    }

    useEffect(() => {
        if (props.isAuthenticated) {
            history.push("/success");
        }
    });

    return (
        <Form
            form={form}
            layout="vertical"
            name="registration_form"
            className="registration-form"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                label="Login"
                validateStatus={usernameValidationStatus}
                help={usernameErrorMsg}
                name="username"
                rules={[
                    {
                        required: true
                    },
                    {
                        validator: (rule, value) => {
                            if (value) {
                                setUsernameValidationStatus("success")
                                setUsernameErrorMsg('')
                                return Promise.resolve()
                            } else {
                                setUsernameValidationStatus("error")
                                setUsernameErrorMsg("Login jest wymagany")
                                return Promise.reject('')
                            }
                        }
                    }
                ]}
            >
                <Input
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    onBlur={validateUsernameAvailability}/>
            </Form.Item>

            <Form.Item
                label="Imię"
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: "Imię jest wymagane"
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Nazwisko"
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: "Nazwisko jest wymagane"
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="E-mail"
                validateStatus={emailValidationStatus}
                help={emailErrorMsg}
                name="email"
                rules={[
                    {
                        required: true,
                    },
                    {
                        validator: (rule, value) => {
                            if (value) {
                                setEmailValidationStatus("success")
                                setEmailErrorMsg('')
                                return Promise.resolve()
                            } else {
                                setEmailValidationStatus("error")
                                setEmailErrorMsg("E-mail jest wymagany")
                                return Promise.reject('')
                            }
                        }
                    }
                ]}
            >
                <Input
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    onBlur={validateEmailAvailability}/>
            </Form.Item>

            <Form.Item
                label="Hasło"
                name="password"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Hasło jest wymagane"
                    }
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label="Potwierdź hasło"
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Potwierdzenie hasła jest wymagane"
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve()
                            } else return Promise.reject("Hasła nie są takie same")
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
                <text className="login-link">Masz już konto? <a href="../">Zaloguj się</a></text>
            </Form.Item>
        </Form>
    )
}

export default RegistrationForm