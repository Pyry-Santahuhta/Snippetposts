import React from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { textAlign } from "@mui/system";

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
    return (
      <div>
        {this.state.loading || !this.state.post ? (
          <div>No posts found</div>
        ) : (
          <ThemeProvider theme={theme}>
            <Box sx={{ width: "80%", ml: "10%", mt: "5%", textAlign: "left" }}>
              <Typography variant="h3">{post.topic}</Typography>
              <Typography mt="1%">{post.content}</Typography>
              <Typography mt="1%">{post.user}</Typography>
              <TextField
                mt="20px"
                type="text"
                id="comment"
                label="Add a comment"
                name="comment"
                fullWidth
              />
              {post.comments
                ? post.comments.map((comment, index) => {
                    return (
                      <div key={index}>
                        <Typography mt="1%">{comment.user}</Typography>
                        <Typography>{comment.timestamp}</Typography>
                        <Typography mt="1%">{comment.content}</Typography>
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
