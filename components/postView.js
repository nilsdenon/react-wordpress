import React, { Component } from "react";
import axios from "axios";

class PostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: {}
        };
        this.createMarkup = this.createMarkup.bind();
    }

    componentDidMount() {
        const slug = this.props.match.params.slug;
        const jsonWorks = `https://damienpierre.com/wp-json/wp/v2/works?slug=${slug}`;

        axios.get(jsonWorks).then(posts => {
            this.setState({
                posts: posts.data[0]
            });
        });
    }

    createMarkup(html) {
        return {
            __html: html
        };
    }
    render() {
        let build;
        if (this.state.post.title) {
            build = (
                <div>
                    <h1>{this.state.post.title.rendered}</h1>
                </div>
            );
        } else {
            build = <div />;
        }
        return build;
    }
}

export default PostView;
