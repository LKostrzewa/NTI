import React, {Component} from "react";
import './PostComment.css'
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {deletePostComment, getCurrentUser} from "../../utils/Requests";

export class PostComment extends Component {
    constructor(props) {
        super(props);
        const date = props.addDate.replace('T',' ');
        this.state = {
            id: props.id,
            content: props.content,
            addDate: date,
            username: props.account.username,
            isUserComment: false

        }
        this.deletePostComment = this.deletePostComment.bind(this);
    }

    componentDidMount = () => {
        let user = null;
        getCurrentUser()
            .then(data => {
                user = data;
            }).finally(() => {
            this.setState({
                isUserComment: this.state.username === user.username,
            })

        });
    };

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
        const username = this.state.username;
        const isUserComment = this.state.isUserComment;

        return <article className="PostComment">
            <header className="Post-header">
                <div className="TopicPostComment">
                    {username}, {addDate}
                </div>
                {isUserComment === true ?
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