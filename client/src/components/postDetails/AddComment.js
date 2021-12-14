import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useStyles from "../materialui/Styles";
import AlertMessage from "../AlertMessage";

const authToken = localStorage.getItem("auth_token");

export const AddComment = (props) => {
  const [comment, setComment] = useState({});
  const [status, setStatus] = useState(null);
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
            setStatus({
              msg: "Comment posted!",
              severity: "success",
              key: Math.random(),
            });
            document.getElementById("content").value = "";
            props.fetchPostAndHighlight(id);
          }
        });
      });
    } else {
      setStatus({
        msg: "Write a comment first!",
        severity: "error",
        key: Math.random(),
      });
    }
  }

  if (authToken) {
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
        {status ? (
          <AlertMessage
            severity={status.severity}
            message={status.msg}
            key={status.key}
          />
        ) : null}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default AddComment;
