import React, {Component} from 'react';
import {getUserProfile} from '../../utils/Requests';
import LoadingIndicator from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
            .then(response => {
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
            if (error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        const username = this.props.currentUser.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentUser.username !== prevProps.currentUser.username) {
            this.loadUserProfile(this.props.currentUser.username);
        }
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>;
        }

        if (this.state.notFound) {
            return <NotFound/>;
        }

        if (this.state.serverError) {
            return <ServerError/>;
        }

        return (
            <div className="profile">
                {
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details-info">
                                <div className="user-summary-info">
                                    <div
                                        className="full-name-info">{this.state.user.firstName} {this.state.user.lastName}</div>
                                    <div className="username-info">{this.state.user.username}</div>
                                    <div className="email-info">{this.state.user.email}</div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Profile;