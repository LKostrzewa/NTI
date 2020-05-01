import React, {Component} from "react";

export class Topic extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            title: props.title
        }
    }

    render() {
        const username = this.state.username;
        const title = this.state.title;

        return <article className="Topic" ref="Topic">
                <header>
                <div className="Topic-user">
                    <div className="Forum-user-nickname">
                        {username}
                    </div>
                </div>
                <div className="Topic-title">
                    {title}
                </div>
            </header>
            </article>;
    }
}