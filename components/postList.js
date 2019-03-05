import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "react-simple-image";

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.createMarkup = this.createMarkup.bind();
    }

    componentDidMount() {
        const jsonWorks = "https://damienpierre.com/wp-json/wp/v2/works";
        axios.get(jsonWorks).then(posts => {
            this.setState({
                posts: posts.data
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
                {this.state.posts.map(post => (
                    <Link to={`/${post.slug}`} key={post.id}>
                        <div className="card" key={post.id}>
                            <div className="card-content">
                                <h1>{post.title.rendered}</h1>
                                <p>{post.excerpt.rendered}</p>
                                <ul>
                                    <li>{post.acf.project_client}</li>
                                    <li>{post.acf.project_type}</li>
                                </ul>

                                <Image
                                    alt={post.acf.hero_background_image.alt}
                                    className="additional-className"
                                    src={
                                        baseURL +
                                        post.acf.hero_background_image.url
                                    }
                                    srcSet={{
                                        "2048w":
                                            baseURL +
                                            (post.acf.hero_background_image.sizes.large
                                                .split(".")
                                                .slice(0, -1) +
                                                "@2x.jpg"),
                                        "1024w":
                                            baseURL +
                                            post.acf.hero_background_image.sizes
                                                .large,
                                        "768w":
                                            baseURL +
                                            post.acf.hero_background_image.sizes
                                                .medium,
                                        "480w":
                                            baseURL +
                                            post.acf.hero_background_image.sizes
                                                .smartphone_large,
                                        "320w":
                                            baseURL +
                                            post.acf.hero_background_image.sizes
                                                .smartphone_small,
                                        "1440w":
                                            baseURL +
                                            post.acf.hero_background_image.sizes
                                                .backdrop,
                                        "1024w":
                                            baseURL +
                                            post.acf.hero_background_image.sizes
                                                .large
                                    }}
                                />
                            </div>
                            <p
                                dangerouslySetInnerHTML={this.createMarkup(
                                    post.acf.project_task
                                )}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        );
    }
}

export default PostList;
