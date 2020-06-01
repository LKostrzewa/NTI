import React, {Component} from "react";
import {addPost} from "../../utils/Requests";
import {notification} from "antd";
import history from "../../history";

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({description: event.target.value});  }
    handleSubmit(event) {
        event.preventDefault();
        addPost(this.state)
            .then(
                history.push("/postList")
            );
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nagłówek nowego teatu:
                        <div>
                            <textarea value={this.state.description} onChange={this.handleChange} />
                        </div>
                    </label>
                    <div>
                        <input type="submit" value="Dodaj" />
                    </div>
                </form>
                <button onClick={() => history.push("/postList")}>Powrót</button>
            </div>
        );
    }
}