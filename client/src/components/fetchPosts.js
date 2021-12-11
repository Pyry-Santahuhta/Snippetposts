import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/Theme";
import Search from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import * as hljs from "highlight.js";
import useStyles from "./materialui/Styles";
import Likes from "./Likes";

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
          <div>
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
                            {/* {hljs.highlightElement( */}
                            <span id="code">{post.code}</span>
                            {/* )} */}
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
