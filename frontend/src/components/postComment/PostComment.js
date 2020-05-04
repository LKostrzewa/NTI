import React, {Component} from "react";
import './PostComment.css'

export class PostComment extends Component {
    constructor(props) {
        super(props);
        const date = props.addDate.replace('T',' ');
        this.state = {
            id: props.id,
            content: props.content,
            addDate: date,
            account: props.account

        }
    }

    render() {
        const content = this.state.content;
        const addDate = this.state.addDate;
        const username = this.state.account.username;

        return <article className="PostComment">
            <header>
                <div className="TopicPostComment">
                    {username}, {addDate}
                </div>
            </header>
            <div className="ContentPostComment">
                <label>{content}</label>
            </div>
        </article>;
    }
}