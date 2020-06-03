import React, {Component} from "react";
import './Post.css'
import {PostComments} from "../../containers/postComments/PostComments";
import {addCommentToPost, deletePost, deleteTopic, getCurrentUser} from "../../utils/Requests";
import { IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export class Post extends Component {
    constructor(props) {
        super(props);
        const date = props.addDate.replace('T',' ');
        this.state = {
            postId: props.postId,
            username: props.username,
            addDate: date,
            lob: props.lob,
            description: props.description,
            comments: props.comments,
            isUserTopic: false
        }
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount = () => {
        let user = null;
        getCurrentUser()
            .then(data => {
                user = data;
            }).finally(() => {
            this.setState({
                isUserTopic: this.state.username === user.username
            })
        });
    };

    deletePost = (event) => {
        deletePost(this.state.postId)
            .finally(() => {
                window.location.reload()
            });
        return false;
    };

    render() {
        const postId = this.state.postId;
        const username = this.state.username;
        const addDate = this.state.addDate;
        const lob = this.state.lob;
        const description = this.state.description;
        const comments = this.state.comments;
        const isUserTopic = this.state.isUserTopic;

        return <article className="Post" ref="Post">
            <header className="Post-header">
                <div className="Post-user">
                    <div className="Post-user-nickname">
                        {username}, {addDate}


                    </div>

                </div>
                {isUserTopic === true ?
                    <IconButton className="Post-isUserTopic" aria-label="delete" onClick={this.deletePost}>
                        <DeleteIcon />
                    </IconButton> : null}


            </header>
            <div className="Post-image">
                <div className="Post-image-bg">
                    <img src={"data:image/png;base64," + lob} className="image"/>
                </div>
            </div>
            <div className="Post-description">
                <label>{description}</label>
            </div>
            <div>
               <PostComments postId={postId} comments={comments}/>
            </div>
        </article>;
    }
}