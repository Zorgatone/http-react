import React, { Component } from "react";
import { Route } from "react-router-dom";

import Post from "../../../components/Post";
import FullPost from "../FullPost";

import axios from "../../../axios";

import "./Posts.css";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };

    this.postSelectedHandler = this.postSelectedHandler.bind(this);
  }

  postSelectedHandler(id) {
    this.props.history.push("/posts/" + id);
  }

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => ({ ...post, author: "Max" }));
        this.setState({ posts: updatedPosts });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={this.postSelectedHandler.bind(this, post.id)}
        />
      ));
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
