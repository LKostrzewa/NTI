import React, {Component} from "react";
import './PostList.css'
import {Post} from "../../components/post/Post";

export default class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount = () => {
        let postsList = null;

        fetch("http://localhost:8080/posts/").then((response) => {
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
        var posts = this.state.posts.map(function (c,index) {
            return(
                <Post postId={c.id} addDate={c.addDate} lob={c.lob}
                      description={c.description} username={c.account.username} comments={c.comments}/>
            );
        });

        return (
            <div className="centered">
                <h2>Posty: </h2>
                {posts}
            </div>
        )
    }
}