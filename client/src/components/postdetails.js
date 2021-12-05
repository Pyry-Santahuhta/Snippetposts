import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";

export const PostDetails = () => {
  return <ThemeProvider theme={theme}>Hello worlds</ThemeProvider>;
};
