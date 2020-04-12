import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import Post from "../components/Post";
import "./Home.css";

export default function Home(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
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
    return posts.map((post, i) =>  
      <Post post={post} key={i} />
    );
  }

  return (
      <div className="posts">
        {!isLoading && renderPostsList(posts)}
      </div>
    );
}
