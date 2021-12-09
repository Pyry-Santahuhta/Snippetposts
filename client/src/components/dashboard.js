import React from "react";
import PostForm from "./postForm";
import FetchPosts from "./fetchPosts";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";
import Grid from "@mui/material/Grid";
import useStyles from "./materialui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Dashboard = () => {
  const classes = useStyles();
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.dashBoardBox}>
        <Grid direction={largeScreen ? "row" : "column"} container spacing={1}>
          <Grid className={classes.fetchPosts} item xs={6}>
            <FetchPosts></FetchPosts>
          </Grid>
          <Grid item xs={5} className={classes.postForm}>
            <PostForm></PostForm>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );

  // return (
  //   <ThemeProvider theme={theme}>
  //     <Box>
  //       <Box className={classes.postForm}>
  //         <PostForm></PostForm>
  //       </Box>
  //       <List className={classes.dashboardList}>
  //         <FetchPosts></FetchPosts>
  //       </List>
  //     </Box>
  //   </ThemeProvider>
  // );
};
export default Dashboard;
