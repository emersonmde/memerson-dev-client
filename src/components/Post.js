import React from "react";
import Moment from "react-moment";
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import "./Post.css";

export default function Post(props) {
    function asdf() {
        return {};
    }

    function renderBody(body) {
        let bodyState = null;
        try {
            bodyState = JSON.parse(body);
        } catch(e) {
            // do nothing
        }

        if (bodyState !== null) {
            let editorState = convertFromRaw(bodyState);
            return (
                <div className="readonly-editor">
                    <Editor editorState={EditorState.createWithContent(editorState)} readOnly={true} /> 
                </div>
            );
        } else {
            return (
                <p>{body}</p>
            );
        }
    }

    return (
        <div className="post">
            <h1 className="post-title">{props.post.title}</h1>
            <p className="post-meta">
                <Moment format="dddd, MMMM Do YYYY">{props.post.createdAt}</Moment>
            </p>
            <div>{renderBody(props.post.body)}</div>
        </div>
    );
}