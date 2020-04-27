import React, {Component} from "react";
import {Link} from "react-router-dom";


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
                resources: resourcesList,
            })
        });
    };

    render() {
        const resources = this.state.resources;
        console.log("resources" + JSON.stringify(resources));
        return (
            <div>
                <h2>Posty: </h2>
                {resources.map((c,index)=> (
                        <div>

                            <h1>{index}:  Uzytkownik: {c.ID}  Data: {c.addDate} </h1>
                            <h1>{c.lob}></h1>
                            <h1>{c.description}</h1>
                        </div>
                    )
                )}
            </div>


        );
    }
}

export default PostsList;