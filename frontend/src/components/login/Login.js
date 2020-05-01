import React from "react";
import './Login.css'
import {Formik} from "formik";
import * as Yup from "yup";
import {login} from "../../utils/Requests";
import {ACCESS_TOKEN} from "../../utils/Constants";

const LoginForm = (props) => (
    <Formik
        initialValues={{username: "", password: ""}}
        onSubmit={(values, {setSubmitting}) => {
            setSubmitting(false);
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
            });
        }}
        validationSchema={Yup.object().shape({
            username: Yup.string()
                .required("Required"),
            password: Yup.string()
                .required("No password provided.")
                .min(6, "Password is too short - should be 6 chars minimum.")
                .matches(/(?=.*[0-9])/, "Password must contain a number.")
        })}
    >
        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;
            return (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.username && touched.username && "error"}
                    />
                    {errors.username && touched.username && (
                        <div className="input-feedback">{errors.username}</div>
                    )}
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password && "error"}
                    />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                    <button type="submit" disabled={isSubmitting}>
                        Login
                    </button>
                </form>
            );
        }}
    </Formik>
);

export default LoginForm;
