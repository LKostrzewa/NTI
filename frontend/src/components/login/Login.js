import React, {useEffect} from "react";
import {Button, Form, Input, notification} from "antd";
import "antd/dist/antd.css";
import "./Login.css";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {login} from "../../utils/Requests";
import {ACCESS_TOKEN} from "../../utils/Constants";
import history from "../../history";

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
                    message: 'Niepowodzenie',
                    description: 'Podano nieprawidłowy login lub hasło. Proszę spróbować jeszcze raz!'
                });
            } else {
                notification.error({
                    message: 'Niepowodzenie',
                    description: error.message || 'Wystąpił błąd. Proszę spróbować jeszcze raz'
                });
            }
        })
    }

    useEffect(() => {
        if (props.isAuthenticated) {
            history.push("/success");
        }
    });

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
                        message: "Proszę podać login"
                    }
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon"/>}
                    type="text"
                    placeholder="Login"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Proszę podać hasło"
                    }
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Hasło"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Zaloguj
                </Button>
                Nie masz konta? <a href="../registration">Zarejestruj się</a>
            </Form.Item>
        </Form>
    );
}

export default LoginForm