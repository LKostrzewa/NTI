import React, {Component} from "react";
import './PostList.css'
import {Post} from "../../components/post/Post";
import {getPosts} from "../../utils/Requests";
import history from "../../history";

export default class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount = () => {
        let postsList = null;

        getPosts()
            .then(response => {
                postsList = response;
            })
            .finally(() => {
                this.setState({
                    posts: postsList
                })
            })
    };

    render() {
        var posts = this.state.posts.map(function (c, index) {
            return (
                <Post postId={c.id} addDate={c.addDate} lob={c.lob}
                      description={c.description} username={c.account.username} comments={c.comments}/>
            );
        });

        return (
            <div className="Centered">
                <span className="PostList-addButton">
                    <button onClick={() => history.push("/posts/addPost")}>Dodaj nowy POST</button>
                </span>
                {posts}
            </div>
        )
    }
}
