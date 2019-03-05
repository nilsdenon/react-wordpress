import React, { Component } from "react";
import axios from "axios";

class PostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {}
        };
        this.createMarkup = this.createMarkup.bind();
    }

    componentDidMount() {
        const slug = this.props.match.params.slug;
        const jsonWorks = `https://damienpierre.com/wp-json/wp/v2/works?slug=${slug}`;

        axios.get(jsonWorks).then(post => {
            this.setState({
                post: post.data[0]
            });
        });
    }

    createMarkup(html) {
        return {
            __html: html
        };
    }
    render() {
        const baseURL = "https://damienpierre.com";
        return (
            <div>
                {this.state.post.acf.work_content.map(post => (
                    <li>post</li>
                ))}
            </div>
        );
    }
}

export default PostView;
