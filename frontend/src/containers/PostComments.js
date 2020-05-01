import React, {Component} from "react";
import {PostComment} from "../components/PostComment";
import './css/PostComments.css'

export class PostComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: props.postId,
            comments: props.comments,
            showComments: false,
            newComment: ''
        }

        this.showComments = this.showComments.bind(this);
        this.hideComments = this.hideComments.bind(this);
        this.handleNewComment = this.handleNewComment.bind(this);
        this.saveNewComment = this.saveNewComment.bind(this);
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

    handleNewComment = (event) => {
        this.setState({
            newComment: event.target.value,
        })
    };

    saveNewComment = (event) => {
        const newComment = this.state.newComment;
        const postId = this.state.postId;
        const newCommentJson = {
            "content": newComment,
            "post": postId
        };
        const response = fetch('http://localhost:8080/addCommentToPost/', {
            dataType: "json",
            method: 'POST',
            body: JSON.stringify(newCommentJson),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
            // .finally(() =>  window.location.reload());
        return false;
    };

    render() {
        const showComments = this.state.showComments;
        const numberOfQuestion = this.state.comments.length;
        const newComment = this.state.newComment;
        var comments = this.state.comments.map(function (c, index) {
            return (
                <PostComment id={c.id} content={c.content} addDate={c.addDate}
                             account={c.account}/>
            );
        });
        return (
            <div>
                {showComments == false ?
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
                        <div>
                            <input type="text" value={newComment} onChange={this.handleNewComment}/>
                            <button onClick={this.saveNewComment}>Dodaj komentarz</button>
                        </div>
                    </div>
                }
            </div>
        )


    }
}