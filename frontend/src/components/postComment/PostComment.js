import React, {Component} from "react";
import './PostComment.css'
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {deletePostComment, getCurrentUser} from "../../utils/Requests";

export class PostComment extends Component {
    constructor(props) {
        super(props);
        const dtfPL = new Intl.DateTimeFormat('PL', { year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit',minute: '2-digit'});
        this.state = {
            id: props.id,
            content: props.content,
            addDate: dtfPL.format(Date.parse(props.addDate)),
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
            .catch(e => {
            console.log(e);
            if(e.status===500)
            alert("Coś poszło nie tak")
             }).finally(() => {
                window.location.reload()
            });
    };

    render() {
        const content = this.state.content;
        const addDate = this.state.addDate;
        const username = this.state.username;
        const isUserComment = this.state.isUserComment;

        return <article className="PostComment">
            <header className="Post-header-dwa">
                <div className="TopicPostComment">
                    <label>{username}</label>
                    <label className="DateLabel">{addDate}</label>

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