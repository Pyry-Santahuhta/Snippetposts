import React, { Fragment } from "react";
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
      this.setState({ posts: postData, loading: false });
    }
  }

  render() {
    return (
      <div>
        {this.state.loading || !this.state.posts ? (
          <div>Loading...</div>
        ) : (
          <List sx={{ width: "100%", maxWidth: "100%", color: "secondary" }}>
            {this.state.posts.map((post, index) => {
              return (
                <ThemeProvider theme={theme}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ mb: 5, mt: 2 }}
                    key={index}
                  >
                    <ListItemText
                      sx={{ wordWrap: "break-word" }}
                      primary={post.content}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="black"
                          >
                            {post.user.substring(0, post.user.indexOf("@"))}
                            <br></br>
                            {post.timestamp}
                          </Typography>
                        </React.Fragment>
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
