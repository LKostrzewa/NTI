import React, {Component} from "react";
import './PostComment.css'
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {deletePostComment} from "../../utils/Requests";

export class PostComment extends Component {
    constructor(props) {
        super(props);
        const date = props.addDate.replace('T',' ');
        this.state = {
            id: props.id,
            content: props.content,
            addDate: date,
            account: props.account,
            isUserComment: props.currentUserName===props.account.username

        }
        this.deletePostComment = this.deletePostComment.bind(this);
    }

    deletePostComment = (event) => {
        deletePostComment(this.state.id)
            .finally(() => {
                window.location.reload()
            });
        return false;
    };

    render() {
        const content = this.state.content;
        const addDate = this.state.addDate;
        const username = this.state.account.username;
        const isUserTopic = this.state.isUserTopic;

        return <article className="PostComment">
            <header className="Post-header">
                <div className="TopicPostComment">
                    {username}, {addDate}
                </div>
                {isUserTopic === true ?
                    <IconButton className="PostComment-isUserComment" aria-label="delete" onClick={this.deletePostComment}>
                        <DeleteIcon />
                    </IconButton>  : null}
            </header>
            <div className="ContentPostComment">
                <label>{content}</label>
            </div>
        </article>;
    }
}