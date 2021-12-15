import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useStyles from "../materialui/Styles";
import AlertMessage from "../AlertMessage";

const authToken = localStorage.getItem("auth_token");

export const AddComment = (props) => {
  //Use a state to hold the comment.
  const [comment, setComment] = useState({});
  //Status is used for snackbar alert messages.
  const [status, setStatus] = useState(null);
  const classes = useStyles();

  //Get post id from props
  const { id } = props;

  //When data is changed in the form, get the name and value and append or update them onto the comment state.
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setComment((values) => ({ ...values, [name]: value }));
  }

  //Add comment button is pressed
  function handleSubmit(event) {
    event.preventDefault();
    //If user is logged in and comment is not empty, send a POST request with the comment to the back end.
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
          //If comment was posted succesfully, set alert to show a success message.
          if (data.success) {
            setStatus({
              msg: "Comment posted!",
              severity: "success",
              key: Math.random(),
            });
            //Empty the add comment field and fetch the post again to show the new comment.
            document.getElementById("content").value = "";
            props.fetchPostAndHighlight(id);
          }
        });
      });
    } else {
      //User didn't write a comment before submitting so set an alert to show a error message.
      setStatus({
        msg: "Write a comment first!",
        severity: "error",
        key: Math.random(),
      });
    }
  }

  //Only show the add comment area if user is logged in.
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

export default AddComment;
