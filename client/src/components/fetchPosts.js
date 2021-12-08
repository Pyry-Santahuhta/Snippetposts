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
import Highlight from "react-highlight";
import useStyles from "./materialui/styles";

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
    const { classes } = this.props;

    return (
      <div>
        {this.state.loading || !this.state.posts ? (
          <div>No posts found</div>
        ) : (
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.search}
              type="text"
              name="search"
              label="Search"
              InputProps={{
                endAdornment: <Search />,
              }}
            />
            <List>
              {this.state.posts.map((post, index) => {
                return (
                  <div key={index}>
                    <ListItem
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "primary.light",
                      }}
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
                        sx={{
                          display: "inline-block",
                        }}
                        primary={<Highlight>{post.content}</Highlight>}
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
                    <Divider
                      variant="inset"
                      component="li"
                      sx={{ mb: "20px" }}
                    />
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
  const classes = useStyles();
  return <FetchPostsClass {...props} navigate={navigate} classes={classes} />;
}
