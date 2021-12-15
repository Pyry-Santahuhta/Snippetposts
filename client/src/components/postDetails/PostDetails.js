import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddComment from "./AddComment";
import Divider from "@mui/material/Divider";
import * as hljs from "highlight.js";
import useStyles from "../materialui/Styles";
import Likes from "../Likes";

//Class component to view a post's details, including likes and comments.
class PostDetailsClass extends React.Component {
  //State to hold the post, updating the page when the state changes.
  state = {
    post: {},
  };

  //On component mounting, fetch the post by id and highlight it.
  async componentDidMount() {
    const { id } = this.props;
    this.fetchPostAndHighlight(id);
  }

  async fetchPostAndHighlight(id) {
    //Fetch post by id
    const response = await fetch("/posts/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const postData = await response.json();
    //Set the post as state
    if (postData) this.setState({ post: postData });

    //Highlight the code section.
    const codeBlock = document.getElementById("code");
    hljs.highlightElement(codeBlock);
  }

  render() {
    //Load props and state onto variables to use them
    const post = this.state.post;
    const { id } = this.props;
    const { classes } = this.props;

    return (
      <div>
        {
          //Object.keys is just used to see if object is empty, if it is return just the div
          Object.keys(this.state.post).length === 0 ? (
            <div>No post found</div>
          ) : (
            //If post is found return details.
            <Box className={classes.postDetailsBox}>
              <Box className={classes.postBox} bgcolor="primary.light">
                <Typography variant="h4">{post.title}</Typography>
                <Typography className={classes.postContent}>
                  {post.description}
                </Typography>
                <span id="code" className={classes.postContent}>
                  {post.code}
                </span>
                <Typography className={classes.postInfo}>
                  {
                    //Remove everything after @ to make a username.
                    post.user.substring(0, post.user.indexOf("@"))
                  }
                  <br />
                  {post.timestamp}
                </Typography>
                <Likes post={post} id={id} />
              </Box>
              {/* Adding comments component, send the id and fetchPostAndHighlight function as props to update the post when new comments are posted */}
              <AddComment
                id={id}
                fetchPostAndHighlight={(data) => {
                  this.fetchPostAndHighlight(data);
                }}
              ></AddComment>

              {
                //Map the comments, if none are found return null
                post.comments
                  ? post.comments.map((comment, index) => {
                      return (
                        <div key={index}>
                          <Grid item>
                            <Typography className={classes.commentContent}>
                              {comment.content}
                            </Typography>
                          </Grid>
                          <Grid className={classes.postInfo} container>
                            <Grid item xs={1} color="secondary">
                              <Typography>
                                {comment.user.substring(
                                  0,
                                  comment.user.indexOf("@")
                                )}
                              </Typography>
                            </Grid>
                            <Grid item xs={8} color="secondary">
                              <Typography>{comment.timestamp}</Typography>
                            </Grid>
                          </Grid>
                          <Divider
                            className={classes.divider}
                            variant="inset"
                          />
                        </div>
                      );
                    })
                  : null
              }
            </Box>
          )
        }
      </div>
    );
  }
}

//Export a function component that returns the postDetailsClass to use props easier with class components.
export default function PostDetails(props) {
  const { id } = useParams();
  const classes = useStyles();
  return <PostDetailsClass {...props} id={id} classes={classes} />;
}
