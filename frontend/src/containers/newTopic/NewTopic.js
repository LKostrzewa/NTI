import React, {Component} from "react";
import {addTopic} from "../../utils/Requests";
import {notification} from "antd";
import history from "../../history";

export default class NewTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      console.log(this.state);
      this.setState({title: event.target.value});  }
  handleSubmit(event) {
      event.preventDefault();
      console.log(this.state);
    addTopic(this.state);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nagłówek nowego tematu:
          <textarea value={this.state.title} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Dodaj" />
      </form>
    );
  }
}