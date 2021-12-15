import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AlertMessage from "../AlertMessage";

const authToken = localStorage.getItem("auth_token");

//Component to send new posts.
export const PostForm = () => {
  //Hold the post in the post state.
  const [post, setPost] = useState({});
  //Status is used for snackbar alert messages.
  const [status, setStatus] = useState(null);

  //When data is changed in the form, get the name and value and append or update them onto the post state.
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setPost((values) => ({ ...values, [name]: value }));
  }

  //Submit post button is pressed
  function handleSubmit(event) {
    event.preventDefault();
    //Check that user is logged in and all the required fields are filled.
    if (authToken && post.code && post.description && post.title) {
      //Send a POST request with the new post.
      fetch("/posts/", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then((res) => {
        //If post was added succesfully, set alert, empty the form and reload the page to show the new post.
        if (res.success) {
          setStatus({
            msg: "Post added!",
            severity: "success",
            key: Math.random(),
          });
          document.getElementById("post-form").value = "";
          window.location.reload(false);
        }
        //If post was not added succesfully, set an alert showing an error.
        else {
          setStatus({
            msg: res.msg,
            severity: "error",
            key: Math.random(),
          });
        }
      });
    }
    //The user hadn't filled some part of the form so set an alert showing an error.
    else {
      setStatus({
        msg: "Write a post first!",
        severity: "error",
        key: Math.random(),
      });
    }
  }
  //If user is logged in show the post form
  if (authToken) {
    return (
      <div>
        <form id="post-form" onSubmit={handleSubmit}>
          <h2>Post a new code snippet</h2>
          <label>
            <br />
            <TextField
              type="text"
              label="Title"
              name="title"
              onChange={handleChange}
              fullWidth
            />
          </label>
          <label>
            <br />
            <TextField
              type="text"
              label="Description"
              name="description"
              onChange={handleChange}
              multiline
              rows={5}
              fullWidth
            />
          </label>
          <br />
          <label>
            <br />
            <TextField
              type="text"
              label="Code"
              name="code"
              onChange={handleChange}
              multiline
              rows={10}
              fullWidth
            />
          </label>
          <br />

          <Button
            type="submit"
            value="Submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
        {
          //Showing the alert messages.
          status ? (
            <AlertMessage
              severity={status.severity}
              message={status.msg}
              key={status.key}
            />
          ) : null
        }
      </div>
    );
  } else {
    //Return empty div if user isn't logged in.
    return <div></div>;
  }
};

export default PostForm;
