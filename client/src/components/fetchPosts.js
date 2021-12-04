import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";
const authToken = localStorage.getItem("auth_token");

export default class FetchPosts extends React.Component {
  state = {
    loading: true,
    posts: null,
  };
  async componentDidMount() {
    if (authToken) {
      const response = await fetch("/posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      });
      const postData = await response.json();
      if (postData.length > 0)
        this.setState({ posts: postData, loading: false });
    }
  }

  render() {
    return (
      <div>
        {this.state.loading || !this.state.posts ? (
          <div>No posts found</div>
        ) : (
          <List sx={{ width: "100%", maxWidth: "100%", color: "secondary" }}>
            {this.state.posts.map((post, index) => {
              return (
                <ThemeProvider theme={theme}>
                  <ListItem
                    sx={{ display: "flex", flexDirection: "column" }}
                    alignItems="flex-start"
                    key={index}
                  >
                    <Typography variant="h5">{post.topic}</Typography>
                    <ListItemText
                      sx={{ wordWrap: "break-word", display: "inline-block" }}
                      primary={post.content}
                      secondary={
                        <Typography
                          sx={{ display: "inline-block" }}
                          component="span"
                          variant="body2"
                          color="black"
                        >
                          {post.user.substring(0, post.user.indexOf("@"))}
                          <br />
                          {post.timestamp}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </ThemeProvider>
              );
            })}
          </List>
        )}
      </div>
    );
  }
}
