import React, { Fragment } from "react";
import { useState } from "react";
const authToken = localStorage.getItem("auth_token");

export const PostForm = () => {
  const [post, setPost] = useState({});

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setPost((values) => ({ ...values, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (authToken && post.content) {
      fetch("/posts/", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then((res) => {
        document.getElementById("alertState").innerHTML = "Success!";

        document.getElementById("post-form").reset();
      });
    } else {
      document.getElementById("alertState").innerHTML =
        "Write something first!";
    }
  }
  if (authToken) {
    return (
      <Fragment>
        <form id="post-form" onSubmit={handleSubmit}>
          <label>
            Write your code snippet here:
            <br />
            <textarea
              type="text"
              id="content"
              name="content"
              onChange={handleChange}
            />
          </label>
          <br />

          <input type="submit" id="submit" value="Submit" />
        </form>
        <div id="alertState"></div>
      </Fragment>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default PostForm;
