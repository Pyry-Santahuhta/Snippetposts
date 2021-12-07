import React from "react";
import PostForm from "./postForm";
import FetchPosts from "./fetchPosts";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";
import Grid from "@mui/material/Grid";
import useStyles from "./materialui/styles";

export const dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={7}>
            <FetchPosts></FetchPosts>
          </Grid>
          <Grid item xs={5}>
            <PostForm></PostForm>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
export default dashboard;
