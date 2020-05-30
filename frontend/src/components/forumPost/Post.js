import React, {Component} from "react";

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            content: props.content
        }
    }

    render() {
        const username = this.state.username;
        const content = this.state.content;

        return <article>
            <header>
                <div>
                    {username}
                </div>
            </header>
            <div>
                {content}
            </div>
        </article>
    }
}
