import React, {Component} from "react";
import {Topic} from "../../components/topic/Topic";
import {getTopicsList} from "../../utils/Requests";

export default class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: []
        }
    }

    componentDidMount = () => {
        let topicsList = null;

        getTopicsList()
            .then((data) => {
                topicsList = data;
            }).finally(() => {
            this.setState({
                topics: topicsList
            })
        });
    };

    render() {
        let topics = this.state.topics.map(function (c) {
            return (
                <Topic id={c.id} title={c.title} username={c.account.username}/>
            );
        });


        return (
            <div className="centered">
                <h2>Tematy: </h2>
                {topics}
            </div>
        )
    }
}