import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import asyncComponent from "../../hoc/asyncComponent";
import Posts from "./Posts";

import "./Blog.css";

const AsyncNewPost = asyncComponent(() => import("./NewPost"));

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts">Posts</NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/new-post" component={AsyncNewPost} />
          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts" />
        </Switch>
      </div>
    );
  }
}

export default Blog;
