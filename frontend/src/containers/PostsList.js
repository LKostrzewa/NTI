import React, {Component} from "react";
import './css/PostList.css'
import {Post} from "../components/Post";

export class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount = () => {
        let postsList = null;

        fetch(" http://localhost:8080/posts/").then((response) => {
            return response.json()
        })
            .then((data) => {
                postsList = data;
            }).finally(() => {
            this.setState({
                posts: postsList
            })
        });
    };

    render() {
        const posts = this.state.posts;
        return (
            <div className="centered">
                <h2>Posty: </h2>

                {posts.map((c, index) => <Post id={c.id} addDate={c.addDate} lob={c.lob}
                                               description={c.description} login={c.account.login}/>)}
            </div>
        )
    }
}