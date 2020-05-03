import React, {Component} from 'react';

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
            return <h1> Siema {this.state.currentUser.username}</h1>
        }
        else return <h1> Log in... </h1>
    }
}
