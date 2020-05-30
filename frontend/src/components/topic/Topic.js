import React, {Component} from "react";
import './Topic.css'
import history from "../../history"

export class Topic extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            title: props.title,
            addDate: props.addDate
        }
    }

    render() {
        const dtfPL = new Intl.DateTimeFormat('PL', { year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit',minute: '2-digit'});
        const username = this.state.username;
        const title = this.state.title;
        const date = dtfPL.format(Date.parse(this.state.addDate));


        return <article className="Topic" ref="Topic" onClick={() => history.push("/forum/" + this.state.id)}>
                <header>
                <div className="Topic-user">
                    {username}
                    <span className="Topic-date">
                        {date}
                    </span>
                </div>
                </header>
                <div className="Topic-title">
                    {title}
                </div>
            </article>;
    }
}