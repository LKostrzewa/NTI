import React, {Component} from "react";
import {getPostsUnderTopic} from "../../utils/Requests";
import {Post} from "../../components/forumPost/Post";
import './TopicPosts.css'

export default class TopicPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            topicTitle: null,
            topicUser: null,
            topicDate: null,
        }
    }

    componentDidMount = () => {
        const dtfPL = new Intl.DateTimeFormat('PL', { year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit',minute: '2-digit'});

        let topic = null;
        const {id} = this.props.match.params;

        getPostsUnderTopic(id)
            .then(data => {
                topic = data;
            }).finally(() => {
            this.setState({
                topicTitle: topic.title,
                topicUser: topic.account.username,
                topicDate: dtfPL.format(Date.parse(topic.addDate)),
                posts: topic.forumPosts
            })
        });
    };

    render() {
        let posts = this.state.posts.map( function (c) {
            return (
                <Post id={c.id} username={c.account.username} content={c.content} addDate={c.addDate}/>
            );
        });

        let topicTitle = this.state.topicTitle;
        let topicUser = this.state.topicUser;
        let topicDate = this.state.topicDate;

        return (
            <div>
                <h2>{topicTitle}
                <span className="TopicPosts-date">{topicDate}</span>
                    <div className="TopicPosts-user"> {topicUser} </div>
                </h2>
                {posts}
            </div>
        )
    }
}