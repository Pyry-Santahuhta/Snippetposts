import React from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/Theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddComment from "./AddComment";
import Divider from "@mui/material/Divider";
import useStyles from "./materialui/Styles";
import Highlight from "react-highlight";
import Likes from "./Likes";

class PostDetailsClass extends React.Component {
  state = {
    loading: true,
    post: {},
  };
  async componentDidMount() {
    const { id } = this.props;
    const response = await fetch("/posts/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const postData = await response.json();
    if (postData) this.setState({ post: postData, loading: false });
  }

  render() {
    const post = this.state.post;
    const { id } = this.props;
    const { classes } = this.props;

    return (
      <div>
        {this.state.loading || !this.state.post ? (
          <div>No post found</div>
        ) : (
          <ThemeProvider theme={theme}>
            <Box className={classes.postDetailsBox}>
              <Box className={classes.postBox} bgcolor="primary.light">
                <Typography variant="h3">{post.title}</Typography>
                <Typography className={classes.postContent}>
                  {post.description}
                </Typography>
                <Highlight className={classes.postContent}>
                  {post.code}
                </Highlight>
                <Typography className={classes.postInfo}>
                  {post.user.substring(0, post.user.indexOf("@"))}
                  <br />
                  {post.timestamp}
                </Typography>
                <Likes post={post} id={id} />
              </Box>
              <AddComment id={id}></AddComment>
              {post.comments
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
                        <Divider className={classes.divider} variant="inset" />
                      </div>
                    );
                  })
                : null}
            </Box>
          </ThemeProvider>
        )}
      </div>
    );
  }
}

export default function PostDetails(props) {
  const { id } = useParams();
  const classes = useStyles();
  return <PostDetailsClass {...props} id={id} classes={classes} />;
}
