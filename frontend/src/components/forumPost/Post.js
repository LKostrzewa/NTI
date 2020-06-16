import React, {Component} from "react";
import './Post.css'
import {deleteForumPost, editForumPost, getCurrentUser} from "../../utils/Requests";

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            content: props.content,
            addDate: props.addDate,
            isUserPost: props.isUserPost,
            editPostContent: props.editPostContent,
            editPost: false
        }
    }

    componentDidMount = () => {
        let user = null;
        getCurrentUser()
            .then(data => {
                user = data;
            }).finally(() => {
            this.setState({
                isUserPost: this.state.username === user.username
            })
        });
    };

    deletePost = () => {
        deleteForumPost(this.state.id)
            .catch(e => {
                console.log(e);
                if(e.status===404)
                    alert("Coś poszło nie tak")})
            .finally(() => {
                window.location.reload()
            });
    };

    editStart = () => {
        this.setState({
            editPost: true,
        })
    };

    cancelEdit = () => {
        this.setState({
            editPost: false,
        })
    };

    handleChange = (event) => {
        this.setState({editPostContent: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const editPostJson = {
            "content": this.state.editPostContent,
            "postId": this.state.id
        };
        editForumPost(editPostJson)
            .catch(e => {
                console.log(e);
                if(e.status===404)
                    alert("Coś poszło nie tak")})
            .finally(() => {
                window.location.reload()
            });
    };

    editForm = () => {
        let editPost = this.state.editPost;
        return (
            <div>{editPost === false ?
                <div>
                    <button onClick={this.editStart} className="PostForum-addBtn">Edytuj</button>
                    <button onClick={this.deletePost} className="PostForum-addBtn"> Usuń</button>
                </div>
                :
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Podaj nową treść posta:
                            <div>
                                <textarea value={this.state.editPostContent} onChange={this.handleChange}/>
                            </div>
                        </label>
                        <div>
                            <input type="submit" value="Edytuj" className="PostForum-addBtn"/>
                        </div>
                    </form>
                    <button onClick={this.cancelEdit} className="PostForum-addBtn">Powrót</button>
                </div>
            }</div>
        )
    };

    render() {
        const dtfPL = new Intl.DateTimeFormat('PL', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });
        const username = this.state.username;
        const content = this.state.content;
        const date = dtfPL.format(Date.parse(this.state.addDate));

        return <div className="PostForum" ref="PostForum">
            <article>
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
            {this.state.isUserPost === true && this.editForm()}
        </div>
    }
}
