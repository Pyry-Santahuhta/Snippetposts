import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";
import Search from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import textAlign from "@mui/system";

class FetchPostsClass extends React.Component {
  state = {
    loading: true,
    posts: null,
  };
  async componentDidMount() {
    const response = await fetch("/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const postData = await response.json();
    if (postData.length > 0) this.setState({ posts: postData, loading: false });
  }

  render() {
    const { navigate } = this.props;

    return (
      <div>
        {this.state.loading || !this.state.posts ? (
          <div>No posts found</div>
        ) : (
          <ThemeProvider theme={theme}>
            <TextField
              sx={{ width: "35%", mb: "10px" }}
              type="text"
              id="search"
              name="search"
              label="Search"
              display="inline-block"
              bgcolor="secondary"
              InputProps={{
                endAdornment: <Search />,
              }}
            />
            <List
              sx={{ width: "100%", maxWidth: "100%", bgcolor: "primary.main" }}
            >
              {this.state.posts.map((post, index) => {
                return (
                  <div key={index}>
                    <ListItem
                      sx={{ display: "flex", flexDirection: "column" }}
                      alignItems="flex-start"
                    >
                      <Typography
                        onClick={() => {
                          navigate("posts/" + post._id);
                        }}
                        sx={{ cursor: "pointer" }}
                        variant="h5"
                      >
                        {post.topic}
                      </Typography>
                      <ListItemText
                        sx={{ wordWrap: "break-word", display: "inline-block" }}
                        primary={post.content}
                        secondary={
                          <Typography
                            sx={{ display: "inline-block", mt: "10px" }}
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
                    <Divider variant="inset" component="li" />
                  </div>
                );
              })}
            </List>
          </ThemeProvider>
        )}
      </div>
    );
  }
}

export default function FetchPosts(props) {
  const navigate = useNavigate();
  return <FetchPostsClass {...props} navigate={navigate} />;
}
