import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        const jsonWorks = "https://damienpierre.com/wp-json/wp/v2/works";
        axios.get(jsonWorks).then(posts => {
            this.setState({
                posts: posts.data
            });
        });
    }
    render() {
        return (
            <div>
                {this.state.posts.map(post => (
                    <Link to={`/${post.slug}`} key={post.id}>
                        <div className="card" key={post.id}>
                            <div className="card-content">
                                <h3>{post.title.rendered}</h3>
                                <p>{post.excerpt.rendered}</p>
                                <ul>
                                    <li>{post.acf.project_client}</li>
                                    <li>{post.acf.project_type}</li>
                                </ul>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }
}

export default PostList;
