import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Post.css";

export default function Post(props) {
  //const file = useRef(null);
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadPost() {
      return API.get("posts", `/posts/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const post = await loadPost();
        console.log(post);
        const { body, title } = post;

        setTitle(title);
        setBody(body);
        setPost(post);
      } catch(e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return body.length > 0;
  }

  function savePost(post) {
    console.log(post);
    return API.put("posts", `/posts/${props.match.params.id}`, {
      body: post
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await savePost({
        body: body,
        title: title
      });
      props.history.push("/");
    } catch(e) {
      console.log(e);
      alert(e);
      setIsLoading(false);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
  }

  return (
    <div className="Posts">
      {post && (
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Control
              value={title}
              type="text"
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Control
              value={body}
              type="textarea"
              onChange={e => setBody(e.target.value)}
            />
          </Form.Group>
          <LoaderButton
            block
            type="submit"
            size="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            size="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );

}
