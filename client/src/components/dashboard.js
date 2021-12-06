import React from "react";
import PostForm from "./postForm";
import FetchPosts from "./fetchPosts";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";

export const dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            ml: "5%",
            mr: "40%",
            mt: 3,
            width: "60%",
            maxWidth: "60%",
          }}
        >
          <FetchPosts></FetchPosts>
        </Box>
        <Box
          sx={{
            mr: "5%",
            width: "35%",
            maxWidth: "35%",
            ml: "65%",
          }}
          position="fixed"
        >
          <PostForm></PostForm>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default dashboard;
