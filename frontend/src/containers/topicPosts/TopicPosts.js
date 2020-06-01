import React, {Component} from "react";
import {addPostToTopic, getPostsUnderTopic} from "../../utils/Requests";
import {Post} from "../../components/forumPost/Post";
import './TopicPosts.css'
import history from "../../history";

export default class TopicPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            posts: [],
            topicTitle: null,
            topicUser: null,
            topicDate: null,
            addPost: false,
            newPostContent: null,
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
                id: id,
                topicTitle: topic.title,
                topicUser: topic.account.username,
                topicDate: dtfPL.format(Date.parse(topic.addDate)),
                posts: topic.forumPosts
            })
        });
    };

    addNewPost = () =>{
        this.setState({
            addPost: true,
        })
    };

    cancelAdd = () => {
        this.setState({
            addPost: false,
        })
    };

    handleChange = (event) => {
      this.setState({newPostContent: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newPostJson = {
            "content": this.state.newPostContent,
            "topicId": this.state.id
        };
        addPostToTopic(newPostJson)
          .finally(() => {
              window.location.reload()
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
        let addPost = this.state.addPost;

        return (
            <div>
                <h2>{topicTitle}
                <span className="TopicPosts-date">{topicDate}</span>
                    <div className="TopicPosts-user"> {topicUser} </div>
                </h2>
                {posts}
                {addPost === false ?
                    <div>
                        <button onClick={() => history.push("/forum")}>Powrót</button>
                        <button onClick={this.addNewPost}>Dodaj nowy post</button>
                    </div>
                    :
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                              Treść nowego postu:
                              <div>
                                  <textarea value={this.state.title} onChange={this.handleChange} />
                              </div>
                            </label>
                            <div>
                                <input type="submit" value="Dodaj" />
                            </div>
                        </form>
                        <button onClick={this.cancelAdd}>Powrót</button>
                    </div>
                }
            </div>
        )
    }
}