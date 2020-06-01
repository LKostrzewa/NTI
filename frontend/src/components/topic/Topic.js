import React, {Component} from "react";
import './Topic.css'
import history from "../../history"
import {getCurrentUser, deleteTopic, editTopic} from "../../utils/Requests";

export class Topic extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            title: props.title,
            addDate: props.addDate,
            isUserTopic: props.isUserTopic,
            editTopicContent: props.editTopicContent,
            editTopic: props.editTopic
        }
    }

    belongsToUser = () =>{
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

    deleteTopic = () => {
        deleteTopic(this.state.id)
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
        const newPostJson = {
            "content": this.state.editPostContent,
            "topicId": this.state.id
        };
        editTopic(newPostJson)
          .finally(() => {
              window.location.reload()
          });
    };

    render() {
        const dtfPL = new Intl.DateTimeFormat('PL', { year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit',minute: '2-digit'});
        const username = this.state.username;
        const title = this.state.title;
        const date = dtfPL.format(Date.parse(this.state.addDate));
        this.belongsToUser();
        let editTopic = this.state.editTopic;

        return <div className="Topic" ref="Topic">
                <article  onClick={() => history.push("/forum/" + this.state.id)}>
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
                {this.state.isUserTopic === true &&
                //{editTopic === false ?
                    <div>
                        <button onClick={this.editStart}>Edytuj</button>
                        <button onClick={this.deleteTopic}>Usuń</button>
                    </div>
                //}
                }
            </div>
    }
}