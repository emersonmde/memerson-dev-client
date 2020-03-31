import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";

export default function Home(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const posts = await loadPosts();
        setPosts(posts);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadPosts() {
    return API.get("posts", "/posts");
  }

  function renderPostsList(posts) {
    console.log(posts);
    return [{}].concat(posts).map((post, i) =>
      i !== 0 ? (
        <LinkContainer key={post.postId} to={`/posts/${post.postId}`}>
          <ListGroup.Item>
            <h3>{post.title}</h3>
            {"Created: " + new Date(post.createdAt).toLocaleString()}
          </ListGroup.Item>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/posts/new">
          <ListGroup.Item>
            <h4>
              <b>{"\uFF0B"}</b> Create a new post
            </h4>
          </ListGroup.Item>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
      return (
            <div className="lander">
              <h1>Posts</h1>
              <p>A simple blog</p>
            </div>
          );
  }

  function renderPosts() {
      return (
            <div className="posts">
              Your Posts
              <ListGroup>
                {!isLoading && renderPostsList(posts)}
              </ListGroup>
            </div>
          );
    }

  return (
      <div className="Home">
        {props.isAuthenticated ? renderPosts() : renderLander()}
      </div>
    );
}
