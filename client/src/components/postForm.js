import React, { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";

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
    if (authToken && post.content && post.topic) {
      fetch("/posts/", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then((res) => {
        document.getElementById("alertState").innerHTML = "Success!";
        document.getElementById("post-form").value = "";
        window.location.reload(false);
      });
    } else {
      document.getElementById("alertState").innerHTML =
        "Write something first!";
    }
  }
  if (authToken) {
    return (
      <ThemeProvider theme={theme}>
        <form id="post-form" onSubmit={handleSubmit}>
          <h2>Post a new code snippet</h2>
          <label>
            <br />
            <TextField
              type="text"
              id="topic"
              label="Topic"
              name="topic"
              onChange={handleChange}
              fullWidth
            />
          </label>
          <label>
            <br />
            <TextField
              type="text"
              id="content"
              label="Code"
              name="content"
              onChange={handleChange}
              multiline
              rows={8}
              fullWidth
            />
          </label>
          <br />

          <Button
            type="submit"
            id="submit"
            value="Submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
        <div id="alertState"></div>
      </ThemeProvider>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default PostForm;
