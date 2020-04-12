import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { API } from "aws-amplify";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import LoaderButton from "../components/LoaderButton";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./NewPost.css";

export default function NewPost(props) {
  const [title, setTitle] = useState("");
  const [bodyState, setBodyState] = useState(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return title.length > 0 && bodyState.getCurrentContent().hasText();
  }

	async function handleSubmit(event) {
    event.preventDefault();

		setIsLoading(true);

		try {
				await createPost({
          title: title,
          body: JSON.stringify(convertToRaw(bodyState.getCurrentContent())),
          type: "blog"
        });
				props.history.push("/");
			} catch (e) {
					alert(e);
					setIsLoading(false);
				}
	}

	function createPost(post) {
		return API.post("posts", "/posts", {
				body: post
			});
	}


  return (
    <div className="NewPost">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="post.title">
          <Form.Control
            value={title}
            type="text"
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>
        <Editor
          editorState={bodyState}
          editorClassName="post-editor"
          onEditorStateChange={setBodyState}
        />
        {/* <Form.Group controlId="post.body">
          <Form.Control
            value={body}
            as="textarea"
            rows="10"
            placeholder="Body"
            onChange={e => setBody(e.target.value)}
          />
        </Form.Group> */}
        <LoaderButton
          block
          type="submit"
          size="large"
          bsstyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}
