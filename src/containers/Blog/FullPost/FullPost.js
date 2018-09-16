import React, { Component } from "react";

import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedPost: null
    };

    this.deletePostHandler = this.deletePostHandler.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        this.state.loadedPost.id !== Number(this.props.match.params.id)
      ) {
        axios.get("/posts/" + this.props.match.params.id).then(response => {
          this.setState({ loadedPost: response.data });
        });
      }
    }
  }

  deletePostHandler() {
    if (this.props.match.params.id && this.state.loadedPost) {
      axios
        .delete("/posts/" + this.props.match.params.id)
        .then(response => console.log(response));
    }
  }

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }

    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            {(this.props.match.params.id &&
              this.state.loadedPost && (
                <button onClick={this.deletePostHandler} className="Delete">
                  Delete
                </button>
              )) ||
              null}
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
