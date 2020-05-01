import React, {Component} from "react";
import {Topic} from "../components/Topic";

export default class Forum extends Component {
    constructor(props) {
        super(props);
        console.log("budowanko ? ");
        this.state = {
            topics: []
        }
    }

    componentDidMount = () => {
        let topicsList = null;
        console.log("Halo ?");

        fetch(" http://localhost:8080/forum/").then((response) => {
            return response.json()
        })
            .then((data) => {
                topicsList = data;
            }).finally(() => {
            this.setState({
                topics: topicsList
            })
        });
    };

    render() {
        var topics = this.state.topics.map(function (c,index) {
            return(
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