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
                    <nav>
                        <ul>
                            <li>
                                <Link to="/postList">Post list</Link>
                            </li>
                            <li>
                                <Link to="/forum"> Forum </Link>
                            </li>
                        </ul>
                    </nav>

                    <h1> Siema {this.state.currentUser.username}</h1>
                </div>
            )
        } else return <h1> Log in... </h1>
    }
}
