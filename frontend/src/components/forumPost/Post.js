import React, {Component} from "react";
import './Post.css'

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            content: props.content,
            addDate: props.addDate
        }
    }

    render() {
        const dtfPL = new Intl.DateTimeFormat('PL', { year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit',minute: '2-digit'});
        const username = this.state.username;
        const content = this.state.content;
        const date = dtfPL.format(Date.parse(this.state.addDate));

        return <article className="PostForum" ref="PostForum">
            <header>
                <div className="PostForum-user">
                    {username}
                    <span className="PostForum-date">
                        {date}
                    </span>
                </div>
            </header>
            <div>
                {content}
            </div>
        </article>
    }
}
