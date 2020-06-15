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
      this.setState({title: event.target.value});  }
  handleSubmit(event) {
      event.preventDefault();
      addTopic(this.state)
          .then(
              history.push("/forum")
          );
  }


  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Nagłówek nowego tematu:
              <div>
                  <textarea value={this.state.title} onChange={this.handleChange} />
              </div>
            </label>
            <div>
                <input type="submit" value="Dodaj" className="Forum-addButton" />
            </div>
          </form>
            <button className="Forum-addButton" onClick={() => history.push("/forum")}>Powrót</button>
        </div>
    );
  }
}