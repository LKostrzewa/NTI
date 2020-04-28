import React, {Component} from "react";
import {Link} from "react-router-dom";
import './css/PostList.css'
import '../components/Post'
import Post from "../components/Post";
class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: []
        };
    }

    componentDidMount = () => {
        // pobranie resource
        let resourcesList = null;

        fetch(" http://localhost:8080/posts/").then((response) => {
            return response.json()
        })
            .then((data) => {
                resourcesList = data;


            }).finally(() => {
            this.setState({
                resources: resourcesList

            })
        });
    };

    render() {
        const resources = this.state.resources;

        // console.log("resources" + JSON.stringify(resources));


        return (
            <div class="centered">
                <h2>Posty: </h2>

                {resources.map((c, index) => <Post id={c.id} addDate={c.addDate} lob={c.lob}
                                                   description={c.description}/>)}

            </div>
        )


    }
}

export default PostsList;