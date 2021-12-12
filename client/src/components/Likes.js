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
  const [displayableVotes, setDisplayableVotes] = useState(props.post.likes);

  useEffect(() => {
    async function getLikes() {
      const parsedToken = ParseJwt(authToken);
      let response = await fetch("/users/" + parsedToken.id, {
        method: "GET",
      });
      response = await response.json();
      if (response) {
        const foundVote = response.votes.find(
          (element) => element.post.toString() === props.id
        );
        if (foundVote) {
          if (foundVote.vote === 1) {
            setVote(1);
          } else {
            setVote(-1);
          }
        }
      }
    }
    getLikes();
  }, [props.id]);

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

  async function handleUndoLike(vote) {
    setVote(0);
    await updateLikes(0);
  }

  async function increment() {
    if (vote === 1) {
      setDisplayableVotes(displayableVotes - 1);
      handleUndoLike(1);
    } else if (vote === -1) {
      setDisplayableVotes(displayableVotes + 2);
      await handleUndoLike(-1);
      setVote(1);
      await updateLikes(1);
    } else {
      setDisplayableVotes(displayableVotes + 1);
      setVote(1);
      await updateLikes(1);
    }
  }
  async function decrement() {
    if (vote === -1) {
      setDisplayableVotes(displayableVotes + 1);
      handleUndoLike(-1);
    } else if (vote === 1) {
      setDisplayableVotes(displayableVotes - 2);
      await handleUndoLike(1);
      setVote(-1);
      await updateLikes(-1);
    } else {
      setDisplayableVotes(displayableVotes - 1);
      setVote(-1);
      await updateLikes(-1);
    }
  }

  return (
    <Grid container className={classes.likesGrid}>
      <Grid item>{displayableVotes}</Grid>
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
