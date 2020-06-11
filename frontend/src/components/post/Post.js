import React, {Component} from "react";
import './Post.css'
import {PostComments} from "../../containers/postComments/PostComments";
import {addCommentToPost, deletePost, deleteTopic, getCurrentUser} from "../../utils/Requests";
import { IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export class Post extends Component {
    constructor(props) {
        super(props);
        const dtfPL = new Intl.DateTimeFormat('PL', { year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit',minute: '2-digit'});
        this.state = {
            postId: props.postId,
            username: props.username,
            addDate: dtfPL.format(Date.parse(props.addDate)),
            lob: props.lob,
            description: props.description,
            comments: props.comments,
            isUserPost: false,
            currentUserName: null
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
                isUserPost: this.state.username === user.username,
                currentUserName: user.username
            })
        });
    };

    deletePost = (event) => {
        deletePost(this.state.postId)
            .finally(() => {
                window.location.reload()
            });

    };

    render() {
        const postId = this.state.postId;
        const username = this.state.username;
        const addDate = this.state.addDate;
        const lob = this.state.lob;
        const description = this.state.description;
        const comments = this.state.comments;
        const isUserPost = this.state.isUserPost;
        const currentUserName = this.state.currentUserName;


        return <article className="Post" ref="Post">
            <header className="Post-header">
                <div className="Post-user">
                    <div className="Post-user-nickname">
                        <label>{username}</label>
                        <label className="DateLabel">{addDate}</label>
                    </div>

                </div>
                {isUserPost === true ?
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
               <PostComments postId={postId} comments={comments} currentUserName={currentUserName}/>
            </div>
        </article>;
    }
}