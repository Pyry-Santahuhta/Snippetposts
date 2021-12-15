import React from "react";
import PostForm from "./PostForm";
import FetchPosts from "./FetchPosts";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useStyles from "../materialui/Styles";
import useMediaQuery from "@mui/material/useMediaQuery";

//Main dashboard component that holds the posts and the PostForm
export const Dashboard = () => {
  const classes = useStyles();
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Box className={classes.dashBoardBox}>
      {/* On small screens turn the direction into the column so users can just scroll down */}
      <Grid direction={largeScreen ? "row" : "column"} container spacing={1}>
        <Grid className={classes.fetchPosts} item xs={6}>
          <FetchPosts></FetchPosts>
        </Grid>
        <Grid item xs={5} className={classes.postForm}>
          <PostForm></PostForm>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Dashboard;
