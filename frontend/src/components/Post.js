import React, { Component } from "react";
import './css/Post.css'
class Post extends Component {
    constructor(props) {
        super(props);
        var date = props.addDate[0]+"-"+props.addDate[1]+"-"+props.addDate[2];
        this.state = {
            id: props.id,
            login: props.login,
            addDate: date,
            lob: props.lob,
            description: props.description
        }
    }
    render() {
        const login= this.state.login;
        const addDate= this.state.addDate;
        const lob= this.state.lob;
        const description= this.state.description;

        console.log("date: "+addDate);

        return<article className="Post" ref="Post">
            <header>
                <div className="Post-user">
                    <div className="Post-user-nickname">
                        {login}, {addDate}
                    </div>
                </div>
            </header>
            <div className="Post-image">
                <div className="Post-image-bg">
                    <img src={"data:image/png;base64,"+lob} className="image"/>
                </div>
            </div>
            <div className="Post-caption">
                <strong>{description}</strong>
            </div>
        </article>;
    }
}
export default Post;