import React, {Component, useEffect, useState} from 'react'
import 'antd/dist/antd.css'
import './editUser.css'
import {editTopic, editUser, getCurrentUser} from "../utils/Requests";
import history from "../history";



export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

            id: null,
            username: null,
            firstName: null,
            lastName: null,
            email: null
        }

    }

    componentDidMount = () => {
        let user = null;
        getCurrentUser()
            .then(data => {
                user = data;
            }).finally(() => {
            this.setState({

                id: user.id,
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
            "accountId": this.state.id,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email" : this.state.email
        };
        editUser(editUserJson)
            .finally(() => {
                window.location.reload()
            });
    };

    editForm = () => {
        let editTopic = this.state.editTopic;
        return (
            <div>{editTopic === false ?
                <div>
                    <button onClick={this.editStart}>Edytuj</button>
                    <button onClick={this.deleteForumTopic}> Usuń</button>
                </div>
                :
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Podaj nową Imie:
                            <div>
                                <textarea value={this.state.firstName} onChange={this.handleFirstNameChange}/>
                            </div>
                        </label>
                        <label>
                            Podaj nową Drugie Imie:
                            <div>
                                <textarea value={this.state.lastName} onChange={this.handleLastNameChange}/>
                            </div>
                        </label>
                        <label>
                            Podaj nową Email:
                            <div>
                                <textarea value={this.state.email} onChange={this.handleEmailChange}/>
                            </div>
                        </label>
                        <div>
                            <input type="submit" value="Edytuj"/>
                        </div>
                    </form>

                </div>
            }</div>
        )
    };


    render() {


        const username = this.state.username;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const id = this.state.id;
        const email = this.state.email


        return <div className="Topic" ref="Topic">
            <article>
                <header>
                    <div className="Topic-user">
                        {username} {firstName} {lastName} {id} {email}
                        <span className="Topic-date">

                        </span>
                    </div>
                </header>
                <div className="Topic-title">

                </div>
            </article>
            { this.editForm()}
        </div>
    }

}