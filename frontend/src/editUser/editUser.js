import React, {Component, useEffect, useState} from 'react'
import 'antd/dist/antd.css'
import './editUser.css'
import {editTopic, editUser, getCurrentUser} from "../utils/Requests";
import history from "../history";



export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

            username: null,
            firstName: "",
            lastName: "",
            email: ""
        }

    }

    componentDidMount = () => {
        let user = null;
        getCurrentUser()
            .then(data => {
                user = data;
            }).finally(() => {
            this.setState({

                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email:user.email

            })
        });
    };

    handleFirstNameChange = (event) => {
        this.setState({firstName: event.target.value});
    };
    handleLastNameChange = (event) => {
        this.setState({lastName: event.target.value});
    };

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const editUserJson = {
            "username": this.state.username,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email" : this.state.email
        };
        editUser(editUserJson)
            .finally(() => {
                history.push("/success")
                window.location.reload()
            });
    };




    editForm = () => {
        let isEnabled = this.state.email.length > 0 && this.state.firstName.length>0 && this.state.lastName.length>0
        return (
            <div>{

                <div>
                    <form onSubmit={this.handleSubmit} className="edit-form">
                        <label id="edit">
                            Podaj nowe imię:
                            <div>
                                <input value={this.state.firstName} onChange={this.handleFirstNameChange}/>
                            </div>
                        </label>
                        <label id="edit">
                            Podaj nowe drugie imię:
                            <div>
                                <input value={this.state.lastName} onChange={this.handleLastNameChange}/>
                            </div>
                        </label>
                        <label id="edit">
                            Podaj nowy email:
                            <div>
                                <input value={this.state.email} onChange={this.handleEmailChange}/>
                            </div>
                        </label>
                        <div id="input">
                            <input disabled={!isEnabled} className="registration-form-button" type="submit" value="Edytuj"/>
                        </div>
                    </form>

                </div>
            }</div>
        )
    };


    render() {
        return <div className="Topic" ref="Topic">
            {this.editForm()}
        </div>
    }

}