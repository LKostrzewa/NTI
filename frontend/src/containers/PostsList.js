import React, {Component} from "react";
import {Link} from "react-router-dom";
import './css/PostList.css'
import '../components/Post'
import Post from "../components/Post";
class PostsList extends Component {
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
            <div class="centered">
                <h2>Posty: </h2>

                {posts.map((c, index) => <Post id={c.id} addDate={c.addDate} lob={c.lob}
                                                   description={c.description} login={c.account.login}/>)}

            </div>
        )
    }
}

export default PostsList;