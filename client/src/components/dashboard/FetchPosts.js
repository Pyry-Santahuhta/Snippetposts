import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Cached from "@mui/icons-material/Cached";

import Typography from "@mui/material/Typography";
import * as hljs from "highlight.js";

import useStyles from "../materialui/Styles";
import SearchPosts from "./SearchPosts";

class FetchPostsClass extends React.Component {
  state = {
    posts: null,
  };

  setPosts(postData) {
    console.log("setting posts");
    if (postData.length > 0) this.setState({ posts: postData });

    const codeBlocks = document.getElementsByClassName("code");
    for (var i = 0; i < codeBlocks.length; i++) {
      hljs.highlightElement(codeBlocks[i]);
    }
  }

  async fetchPosts() {
    const response = await fetch("/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const postData = await response.json();
    this.setPosts(postData);
  }
  async componentDidMount() {
    await this.fetchPosts();
  }
  render() {
    const { navigate } = this.props;
    const { classes } = this.props;

    return (
      <div>
        <IconButton
          onClick={() => {
            this.fetchPosts();
          }}
          aria-label="Cached"
        >
          <Cached />
        </IconButton>
        <SearchPosts
          setPosts={(data) => {
            this.setPosts(data);
          }}
        ></SearchPosts>
        {!this.state.posts ? (
          <div>No posts found</div>
        ) : (
          <div>
            <List>
              {this.state.posts.map((post, index) => {
                return (
                  <div key={index}>
                    <ListItem
                      className={classes.listItem}
                      sx={{ bgcolor: "primary.light" }}
                    >
                      <Typography
                        onClick={() => {
                          navigate("posts/" + post._id);
                        }}
                        sx={{ cursor: "pointer" }}
                        variant="h5"
                      >
                        {post.title}
                      </Typography>
                      <ListItemText
                        sx={{
                          display: "inline-block",
                        }}
                        primary={
                          <React.Fragment>
                            <Typography>{post.description}</Typography>

                            <span className="code">{post.code}</span>
                          </React.Fragment>
                        }
                        secondary={
                          <Typography
                            className={classes.listItemSecondaryText}
                            component="span"
                            variant="body2"
                            color="secondary"
                          >
                            {post.user.substring(0, post.user.indexOf("@"))}
                            <br />
                            {post.timestamp}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider
                      variant="inset"
                      component="li"
                      className={classes.divider}
                    />
                  </div>
                );
              })}
            </List>
          </div>
        )}
      </div>
    );
  }
}

export default function FetchPosts(props) {
  const navigate = useNavigate();
  const classes = useStyles();
  return <FetchPostsClass {...props} navigate={navigate} classes={classes} />;
}
