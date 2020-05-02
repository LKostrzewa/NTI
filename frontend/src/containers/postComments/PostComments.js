import React, {Component} from "react";
import {PostComment} from "../../components/postComment/PostComment";
import './PostComments.css'

export class PostComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: props.comments,
            showComments: false
        }

        this.showComments = this.showComments.bind(this);
        this.hideComments = this.hideComments.bind(this);
    }

    showComments = (event) => {
        this.setState({
            showComments: true,
        })
    };

    hideComments = (event) => {
        this.setState({
            showComments: false,
        })
    };

    render() {
        const showComments = this.state.showComments;
        const numberOfQuestion = this.state.comments.length;
        var comments = this.state.comments.map(function (c, index) {
            return (
                <PostComment id={c.id} content={c.content} addDate={c.addDate}
                             account={c.account}/>
            );
        });
        return (
            <div>
                {showComments === false ?
                    <div>
                        <div className="TopicPostComments">
                            <label>Liczba komentarzy: {numberOfQuestion}</label>
                            <button className="Button" onClick={this.showComments}> Pokaż komentarze</button>
                        </div>
                    </div> :
                    <div>
                        <div className="TopicPostComments">
                            <label>Liczba komentarzy: {numberOfQuestion}</label>
                            <button className="Button" onClick={this.hideComments}> Ukryj komentarze</button>
                        </div>
                        <div>
                            {comments}
                        </div>
                    </div>
                }
            </div>
        )
    }
}