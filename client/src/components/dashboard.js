import React from "react";
import PostForm from "./postForm";
import FetchPosts from "./fetchPosts";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";
import Grid from "@mui/material/Grid";
import useStyles from "./materialui/styles";

export const Dashboard = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.dashBoardBox}>
        <Grid container spacing={1}>
          <Grid className={classes.fetchPosts} item xs={6}>
            <FetchPosts></FetchPosts>
          </Grid>
          <Grid className={classes.postForm} item xs={5}>
            <PostForm></PostForm>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
export default Dashboard;
