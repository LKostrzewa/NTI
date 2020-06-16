import React, {Component} from "react";
import './Topic.css'
import history from "../../history"
import {getCurrentUser, deleteTopic, editTopic} from "../../utils/Requests";

export class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            title: props.title,
            addDate: props.addDate,
            isUserTopic: props.isUserTopic,
            editTopicContent: props.editTopicContent,
            editTopic: false
        }
    }

    componentDidMount = () => {
        let user = null;
        getCurrentUser()
            .then(data => {
                user = data;
            }).finally(() => {
            this.setState({
                isUserTopic: this.state.username === user.username
            })
        });
    };

    deleteForumTopic = () => {
        deleteTopic(this.state.id)
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
            editTopic: true,
        })
    };

    cancelEdit = () => {
        this.setState({
            editTopic: false,
        })
    };

    handleChange = (event) => {
        this.setState({editPostContent: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const editPostJson = {
            "title": this.state.editPostContent,
            "topicId": this.state.id
        };
        editTopic(editPostJson)
            .catch(e => {
                console.log(e);
                if(e.status===404)
                    alert("Coś poszło nie tak")})
            .finally(() => {
                window.location.reload()
            });
    };

    editForm = () => {
        let editTopic = this.state.editTopic;
        return (
            <div>{editTopic === false ?
                <div>
                    <button onClick={this.editStart} className="Forum-addButton">Edytuj</button>
                    <button onClick={this.deleteForumTopic} className="Forum-addButton"> Usuń</button>
                </div>
                :
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Podaj nową treść tematu:
                            <div>
                                <textarea value={this.state.editTopicContent} onChange={this.handleChange}/>
                            </div>
                        </label>
                        <div>
                            <input type="submit" value="Edytuj" className="Forum-addButton"/>
                        </div>
                    </form>
                    <button onClick={this.cancelEdit} className="Forum-addButton">Powrót</button>
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
        const title = this.state.title;
        const date = dtfPL.format(Date.parse(this.state.addDate));

        return <div className="Topic" ref="Topic">
            <article onClick={() => history.push("/forum/" + this.state.id)}>
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
            </article>
            {this.state.isUserTopic === true && this.editForm()}
        </div>
    }
}