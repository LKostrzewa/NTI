import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import './App.css';
import PostsList from "./containers/PostsList"
import Forum from "./containers/Forum";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/containers/PostsList">Posts List</Link>
                        </li>
                        <li>
                            <Link to="/containers/Forum"> Forum </Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/containers/PostsList">
                        <PostsList/>
                    </Route>
                    <Route path="/containers/Forum">
                        <Forum/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Witaj na naszym Instagramie!!!</h2>;
}

export default App;
