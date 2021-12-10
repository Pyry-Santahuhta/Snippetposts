import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import useStyles from "./materialui/Styles";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import ParseJwt from "./toolfunctions/ParseJwt";

const authToken = localStorage.getItem("auth_token");

export const Likes = (props) => {
  const classes = useStyles();
  const [vote, setVote] = useState(0);

  async function updateLikes(vote) {
    await fetch("/posts/vote/" + props.id, {
      method: "PATCH",
      body: JSON.stringify({ vote: vote }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });
  }

  useEffect(() => {
    const parsedToken = ParseJwt(authToken);

    fetch("/users/" + parsedToken.id, {
      method: "GET",
    }).then((res) => {
      res.json().then((user) => {
        if (user) {
          const foundVote = user.votes.find(
            (element) => element.post.toString(),
            props.id
          );
          if (foundVote) {
            if (foundVote.vote === 1) {
              setVote(1);
            } else {
              setVote(-1);
            }
          }
        }
      });
    });
  }, []);

  async function increment() {
    if (vote === 1) {
      handleUndoLike(1);
    } else if (vote === -1) {
      setVote(1);
      props.post.likes += 1;
      await handleUndoLike(-1);
      await updateLikes(1);
    } else {
      setVote(1);
      props.post.likes += 1;
      await updateLikes(1);
    }
  }
  async function decrement() {
    if (vote === -1) {
      handleUndoLike(-1);
    } else if (vote === 1) {
      setVote(-1);
      props.post.likes -= 1;
      await handleUndoLike(1);
      await updateLikes(-1);
    } else {
      setVote(-1);
      props.post.likes -= 1;
      await updateLikes(-1);
    }
  }

  async function handleUndoLike(vote) {
    setVote(0);
    props.post.likes -= vote;
    await updateLikes(0);
  }

  return (
    <Grid container className={classes.likesGrid}>
      <Grid item>{props.post.likes}</Grid>
      <IconButton
        color={vote === 1 ? "select" : "secondary"}
        onClick={increment}
        aria-label="ThumbUp"
      >
        <ThumbUp />
      </IconButton>
      <IconButton
        color={vote === -1 ? "select" : "secondary"}
        onClick={decrement}
        aria-label="ThumbDown"
      >
        <ThumbDown />
      </IconButton>
    </Grid>
  );
};

export default Likes;
