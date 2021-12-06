import React from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddComment from "./addComment";
import Divider from "@mui/material/Divider";

class PostDetailsClass extends React.Component {
  state = {
    loading: true,
    post: null,
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
    return (
      <div>
        {this.state.loading || !this.state.post ? (
          <div>No post found</div>
        ) : (
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                width: "80%",
                ml: "10%",
                mt: "5%",
                textAlign: "left",
              }}
            >
              <Box sx={{ bgcolor: "primary.light", p: "50px" }}>
                <Typography sx={{ color: "secondary.light" }} variant="h3">
                  {post.topic}
                </Typography>
                <Typography mt="1%">{post.content}</Typography>
                <Typography mt="1%">
                  {post.user.substring(0, post.user.indexOf("@"))}
                </Typography>
              </Box>
              <AddComment id={id}></AddComment>
              {post.comments
                ? post.comments.map((comment, index) => {
                    return (
                      <div key={index}>
                        <Grid item>
                          <Typography sx={{ wordWrap: "break-word", mt: "1%" }}>
                            {comment.content}
                          </Typography>
                        </Grid>
                        <Grid container>
                          <Grid item xs={1} color="secondary.main">
                            <Typography mt="1%">
                              {comment.user.substring(
                                0,
                                comment.user.indexOf("@")
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs={8} color="secondary.main">
                            <Typography>{comment.timestamp}</Typography>
                          </Grid>
                        </Grid>
                        <Divider sx={{ mb: "s20px" }} variant="inset" />
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
  return <PostDetailsClass {...props} id={id} />;
}
