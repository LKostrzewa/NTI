import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        this.setState({currentUser: this.props.currentUser})
    }

    render() {
        if (this.state.currentUser) {
            return (
                <div className="container">
                    <h1> Witamy na naszym portalu {this.state.currentUser.username}</h1>
                </div>
            )
        } else return <h1> Zaloguj się... </h1>
    }
}
