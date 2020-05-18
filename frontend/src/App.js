import React, {Component} from "react";
import {Link, Route, Router, Switch} from "react-router-dom";
import "./App.css";
import PostList from "./containers/postList/PostList"
import LoginForm from "./components/login/Login";
import Success from "./components/success/Success";
import history from "./history";
import {ACCESS_TOKEN} from "./utils/Constants";
import {getCurrentUser} from "./utils/Requests";
import Forum from "./containers/forum/Forum";
import {Layout, notification} from "antd";
import RegistrationForm from "./components/registration/Registration";
import LoadingIndicator from "./components/loadingIndicator/LoadingIndicator";
import AppHeader from "./components/appHeader/AppHeader";

const {Content} = Layout;

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
        notification.config({
            placement: "topRight",
            top: 70,
            duration: 3,
        });
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
    }

    handleLogin() {
        notification.success({
            message: "App",
            description: "You've successfully logged in.",
        });
        this.loadCurrentUser();
        history.push("/success");
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <Layout className="app-container">
                <Router history={history}>
                    <AppHeader isAuthenticated={this.state.isAuthenticated}
                               currentUser={this.state.currentUser}
                               onLogout={this.handleLogout}/>
                    <Content className="app-content">
                        <div className="container">
                                <Switch>
                                    <Route path="/postList">
                                        <PostList/>
                                    </Route>
                                    <Route path="/forum">
                                        <Forum/>
                                    </Route>
                                    <Route path="/login"
                                           render={(props) => <LoginForm onLogin={this.handleLogin} {...props} />}/>
                                    <Route path="/success"
                                           render={(props) => <Success
                                               currentUser={this.state.currentUser} {...props} />}/>
                                    <Route path="/registration">
                                        <RegistrationForm/>
                                    </Route>
                                    <Route path="/">
                                        <Home/>
                                    </Route>
                                </Switch>
                        </div>
                    </Content>
                </Router>
            </Layout>
        );
    }
}

function Home() {
    return <h2>Witaj na naszym Instagramie!!!</h2>;
}

export default App;
