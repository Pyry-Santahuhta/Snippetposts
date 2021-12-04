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
          pl: "5%",
          pr: "5%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            mt: 3,
            width: "60%",
            maxWidth: "60%",
            display: "inline-block",
            bgcolor: "primary.main",
            mr: "40%",
          }}
        >
          <FetchPosts></FetchPosts>
        </Box>
        <Box
          sx={{
            width: "35%",
            maxWidth: "35%",
            display: "inline-block",
            pl: "65%",
            pr: "5%",
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
