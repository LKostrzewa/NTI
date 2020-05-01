import React, {Component} from 'react';
import {Link, Route, Router, Switch} from "react-router-dom";
import './App.css';
import PostList from "./containers/postList/PostList"
import LoginForm from "./components/login/Login";
import {Success} from "./components/success/Success";
import history from "./history";
import {ACCESS_TOKEN} from "./utils/Constants";
import {getCurrentUser} from "./utils/Requests";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        // notification.config({
        //     placement: 'topRight',
        //     top: 70,
        //     duration: 3,
        // });
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        history.push(redirectTo);

        // notification[notificationType]({
        //     message: 'Polling App',
        //     description: description,
        // });
    }

    handleLogin() {
        // notification.success({
        //     message: 'Polling App',
        //     description: "You're successfully logged in.",
        // });
        this.loadCurrentUser();
        history.push('/success');
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/postList">Post list</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/postList">
                            <PostList/>
                        </Route>
                        <Route path="/login"
                               render={(props) => <LoginForm onLogin={this.handleLogin} {...props} />}/>
                        <Route path="/success"
                               render={(props) => <Success currentUser={this.state.currentUser} {...props} />}/>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

function Home() {
    return <h2>Witaj na naszym Instagramie!!!</h2>;
}

export default App;
