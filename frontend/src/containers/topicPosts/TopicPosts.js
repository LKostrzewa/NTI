import React, {Component} from "react";
import {getPostsUnderTopic} from "../../utils/Requests";
import {Post} from "../../components/forumPost/Post";

export default class TopicPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            topicTitle: null,
            topicUser: null
        }
    }

    componentDidMount = () => {
        let topic = null;

        getPostsUnderTopic()
            .then(data => {
                topic = data;
            }).finally(() => {
            this.setState({
                topicTitle: topic.title,
                topicUser: topic.account.username,
                posts: topic.forumPosts
            })
        });
    };

    render() {
        let posts = this.state.posts.map( function (c) {
            return (
                <Post id={c.id} username={c.account.username} content={c.content}/>
            );
        });

        let topic = this.state.topicTitle;

        return (
            <div>
                <h2>{topic}</h2>
                {posts}
            </div>
        )
    }
}