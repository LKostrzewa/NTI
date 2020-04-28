import React, { Component } from "react";
import './css/Post.css'
class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            addDate: props.addDate,
            lob: props.lob,
            description: props.description

        }
        var date = new Date(props.addDate);

        console.log("props " + props.addDate );
        console.log("resources" + date );

    }
    render() {
        const id= this.state.id;
        const addDate= this.state.addDate;
        const lob= this.state.lob;
        const description= this.state.description;
        return <article className="Post" ref="Post">
            <header>
                <div className="Post-user">
                    <div className="Post-user-nickname">
                        {id}, {addDate}

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