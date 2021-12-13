import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import * as hljs from "highlight.js";
import useStyles from "../materialui/Styles";
import SearchPosts from "./SearchPosts";
import Likes from "../Likes";

class FetchPostsClass extends React.Component {
  state = {
    posts: null,
  };

  setPosts(postData) {
    if (postData.length > 0) this.setState({ posts: postData });

    const codeBlocks = document.getElementsByClassName("code");
    for (var i = 0; i < codeBlocks.length; i++) {
      hljs.highlightElement(codeBlocks[i]);
    }
  }

  async componentDidMount() {
    const response = await fetch("/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const postData = await response.json();
    this.setPosts(postData);
  }
  render() {
    const { navigate } = this.props;
    const { classes } = this.props;

    return (
      <div>
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
                      <Likes post={post} id={post._id} />
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
