import React, {Component} from "react";
import './Post.css'
import {PostComments} from "../../containers/postComments/PostComments";

export class Post extends Component {
    constructor(props) {
        super(props);
        const date = props.addDate[0] + "-" + props.addDate[1] + "-" + props.addDate[2];
        this.state = {
            postId: props.postId,
            username: props.username,
            addDate: date,
            lob: props.lob,
            description: props.description,
            comments: props.comments
        }
    }

    render() {
        const postId = this.state.postId;
        const username = this.state.username;
        const addDate = this.state.addDate;
        const lob = this.state.lob;
        const description = this.state.description;
        const comments = this.state.comments;

        return <article className="Post" ref="Post">
            <header>
                <div className="Post-user">
                    <div className="Post-user-nickname">
                        {username}, {addDate}
                    </div>
                </div>
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