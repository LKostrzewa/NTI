import React, {Component} from "react";
import {Route, Router, Switch} from "react-router-dom";
import "./App.css";
import PostList from "./containers/postList/PostList"
import LoginForm from "./components/login/Login";
import Success from "./components/success/Success";
import history from "./history";
import {ACCESS_TOKEN} from "./utils/Constants";
import {getCurrentUser} from "./utils/Requests";
import Forum from "./containers/forum/Forum";
import TopicPosts from "./containers/topicPosts/TopicPosts";
import {Layout, notification} from "antd";
import RegistrationForm from "./components/registration/Registration";
import LoadingIndicator from "./common/LoadingIndicator";
import AppHeader from "./common/AppHeader";
import NewTopic from "./containers/newTopic/NewTopic";
import Profile from "./components/profile/Profile";
import PrivateRoute from './common/PrivateRoute';
import EditUser from "./editUser/editUser";
import {Provider} from 'react-redux';
import store from "./store";
import AddPost from "./containers/newPost/AddPost";

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
                                <Route exact path="/postList" authenticated={this.state.isAuthenticated}
                                              component={PostList}/>
                                <Route path="/forum/addTopic">
                                    <NewTopic/>
                                </Route>
                                <Route path="/posts/addPost">
                                <Provider store={store}>
                                        <AddPost/>
                                </Provider>
                                </Route>    
                                <Route path="/forum/:id" render={(props) => <TopicPosts {...props}/>}/>
                                <Route path="/forum">
                                    <Forum/>
                                </Route>
                                <Route path="/accounts/editUser">
                                    <EditUser/>
                                </Route>
                                <Route exact path="/login"
                                       render={(props) => <LoginForm onLogin={this.handleLogin}
                                                                     isAuthenticated={this.state.isAuthenticated} {...props} />}/>
                                <Route exact path="/success"
                                       render={(props) => <Success
                                           currentUser={this.state.currentUser} {...props} />}/>
                                <Route exact path="/registration"
                                       render={(props) => <RegistrationForm
                                           isAuthenticated={this.state.isAuthenticated} {...props} />}/>

                                <Route exact path="/my-profile"
                                       render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                                   currentUser={this.state.currentUser} {...props}  />}/>
                                <Route exact path="/">
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
    return <h2>Welcome and thank you my friend</h2>;
}

export default App;
