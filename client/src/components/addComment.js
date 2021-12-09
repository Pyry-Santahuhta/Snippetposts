import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useStyles from "./materialui/styles";

const authToken = localStorage.getItem("auth_token");

export const AddComment = (props) => {
  const [comment, setComment] = useState({});
  const classes = useStyles();

  const { id } = props;
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setComment((values) => ({ ...values, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (authToken && comment.content) {
      fetch("/posts/comment/" + id, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then((res) => {
        res.json().then((data) => {
          if (data.success) {
            document.getElementById("alertState").innerHTML = "Success!";
            document.getElementById("content").value = "";
            window.location.reload(false);
          }
        });
      });
    } else {
      document.getElementById("alertState").innerHTML =
        "Write something first!";
    }
  }

  return (
    <div>
      <TextField
        className={classes.addCommentTextArea}
        type="text"
        id="content"
        label="Add a comment"
        name="content"
        onChange={handleChange}
        fullWidth
      />
      <Button
        type="submit"
        id="submit"
        value="Submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        comment
      </Button>
      <div id="alertState"></div>
    </div>
  );
};

export default AddComment;
