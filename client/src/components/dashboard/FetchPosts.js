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

//Fetch posts class to get the posts in a list.
class FetchPostsClass extends React.Component {
  //Hold the posts in a state variable.
  state = {
    posts: null,
  };

  //Function for setting the posts. It's sent as props to the searchPosts component so it can set them as well.
  setPosts(postData) {
    //If the data is not empty, set the state with the data.
    if (postData.length > 0) this.setState({ posts: postData });

    //Highlight all of the code blocks using highlight.js highlightelement.
    const codeBlocks = document.getElementsByClassName("code");
    for (var i = 0; i < codeBlocks.length; i++) {
      hljs.highlightElement(codeBlocks[i]);
    }
  }

  //Get the posts from the back end.
  async fetchPosts() {
    const response = await fetch("/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const postData = await response.json();
    //Set the posts to the state.
    this.setPosts(postData);
  }

  //On componentMount fetch the posts.
  async componentDidMount() {
    await this.fetchPosts();
  }

  render() {
    //Get the navigate and classes from props
    const { navigate } = this.props;
    const { classes } = this.props;

    return (
      <div>
        <IconButton
          //On reload button press fetch the posts again from back end.
          onClick={() => {
            this.fetchPosts();
          }}
          aria-label="Cached"
        >
          <Cached />
        </IconButton>

        <SearchPosts
          //Send the setPosts function to the SearchPosts component so it can set it's search results as the post's state.
          setPosts={(data) => {
            this.setPosts(data);
          }}
        ></SearchPosts>

        {
          //If no posts are found, send just the div
          !this.state.posts ? (
            <div>No posts found</div>
          ) : (
            //With posts, map the posts into a list.
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
                              {
                                //Remove everything after @ to make a username.
                                post.user.substring(0, post.user.indexOf("@"))
                              }
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
          )
        }
      </div>
    );
  }
}

//Export as a function component so we can use import functions. Send them as props to the FetchPostsClass which is returned here.
export default function FetchPosts(props) {
  const navigate = useNavigate();
  const classes = useStyles();
  return <FetchPostsClass {...props} navigate={navigate} classes={classes} />;
}
