import React, { Fragment } from "react";
import { useState } from "react";
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
      <ThemeProvider theme={theme}>
        <form id="post-form" onSubmit={handleSubmit}>
          <label>
            <h2>Write your code snippet here:</h2>
            <br />
            <TextField
              type="text"
              id="content"
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
