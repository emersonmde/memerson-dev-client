import React from "react";
import Moment from "react-moment";
import "./Post.css";

export default function Post(props) {
    console.log(props.post);
    return (
        <div className="post">
            <h1 className="post-title">{props.post.title}</h1>
            <p className="post-meta">
                <Moment format="dddd, MMMM Do YYYY">{props.post.createdAt}</Moment>
            </p>
            <p>{props.post.body}</p>
        </div>
    );
}