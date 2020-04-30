import React, {Component} from "react";
import './css/PostComment.css'

export class PostComment extends Component {
    constructor(props) {
        super(props);
        var date = props.addDate[0] + "-" + props.addDate[1] + "-" + props.addDate[2];
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
                    <div className="Topic">
                        {username}, {addDate}
                    </div>
                </header>
                <div className="Content">
                    <label >{content}</label>
                </div>
            </article>;



    }
}