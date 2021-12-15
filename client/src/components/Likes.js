import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import useStyles from "./materialui/Styles";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import ParseJwt from "./toolfunctions/ParseJwt";

const authToken = localStorage.getItem("auth_token");

//Vote system component, used in postDetails.
export const Likes = (props) => {
  const classes = useStyles();
  //Used to determine the current vote 1 is like, -1 is dislike and 0 is no vote.
  const [vote, setVote] = useState(0);
  //Used to determine the current amount of votes for the post, the amount without the current user's likes comes from props.
  const [displayableVotes, setDisplayableVotes] = useState(props.post.likes);

  //UseEffect to run everytime the post viewed changes, so essentially when a new post is opened.
  useEffect(() => {
    //If the user is not logged in, we don't need to check if the user has voted before.
    if (!authToken) {
      return;
    } else {
      //Here we check if the user has voted before.
      async function getLikes() {
        const parsedToken = ParseJwt(authToken);
        //Fetch the user
        let response = await fetch("/users/" + parsedToken.id, {
          method: "GET",
        });
        response = await response.json();
        //Look if the post's id is found in the current user's vote array.
        if (response) {
          const foundVote = response.votes.find(
            (element) => element.post.toString() === props.id
          );
          //The user has voted before, so there was either a 1 or a -1 in the database. Set the vote state accordingly.
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
    }
  }, [props.id]);

  //This function updates the post's likes with the current user's vote when they like, dislike or undo their vote.
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

  //When a vote needs to be undone, just set the vote state to 0 and send a 0 from the current user to the back end.
  async function handleUndoLike(vote) {
    setVote(0);
    await updateLikes(0);
  }

  //Handling a like button press
  async function Like() {
    if (vote === 1) {
      //If the user had liked before, undo the like and remove 1 from the displayableVotes.
      setDisplayableVotes(displayableVotes - 1);
      handleUndoLike(1);
    } else if (vote === -1) {
      //If the user had disliked before
      //Change the displayable votes to be 2 more than before, since the dislike turns into a like.
      setDisplayableVotes(displayableVotes + 2);
      //Undo the dislike, then set the like state and update the back end's votes with the new like.
      await handleUndoLike(-1);
      setVote(1);
      await updateLikes(1);
    } else {
      //The current user hadn't voted before on this post, so simply set both states and update the back end's votes with the new like.
      setDisplayableVotes(displayableVotes + 1);
      setVote(1);
      await updateLikes(1);
    }
  }
  async function Dislike() {
    if (vote === -1) {
      //If the user had disliked before, undo the dislike and add 1 to the displayableVotes.
      setDisplayableVotes(displayableVotes + 1);
      handleUndoLike(-1);
    } else if (vote === 1) {
      //If the user had liked before
      //Change the displayable votes to be 2 less than before, since the like turns into a dislike.
      setDisplayableVotes(displayableVotes - 2);
      //Undo the like, then set the dislike state and update the back end's votes with the new dislike.
      await handleUndoLike(1);
      setVote(-1);
      await updateLikes(-1);
    } else {
      //The current user hadn't voted before on this post, so simply set both states and update the back end's votes with the new dislike.
      setDisplayableVotes(displayableVotes - 1);
      setVote(-1);
      await updateLikes(-1);
    }
  }
  //The user needs to be logged in to see the like and dislike buttons.
  if (authToken) {
    return (
      <Grid container className={classes.likesGrid}>
        <Grid item>{displayableVotes}</Grid>
        <IconButton
          //The button's color changes whether the user has liked the post before.
          color={vote === 1 ? "select" : "secondary"}
          onClick={Like}
          aria-label="ThumbUp"
        >
          <ThumbUp />
        </IconButton>
        <IconButton
          //The button's color changes whether the user has disliked the post before.
          color={vote === -1 ? "select" : "secondary"}
          onClick={Dislike}
          aria-label="ThumbDown"
        >
          <ThumbDown />
        </IconButton>
      </Grid>
    );
  } else {
    //If the user isn't logged in just show the amount of likes.
    return (
      <Grid container className={classes.likesGrid}>
        <Grid item>Likes: {displayableVotes}</Grid>
      </Grid>
    );
  }
};

export default Likes;
