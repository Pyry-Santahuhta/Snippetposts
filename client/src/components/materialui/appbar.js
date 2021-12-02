import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import theme from "./theme";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export function ButtonAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <h1>Stäkouverflou</h1>

            <Link to="login">
              <Button variant="contained" color="secondary" type="button">
                Login
              </Button>
            </Link>
            <Link to="register">
              <Button variant="contained" color="secondary" type="button">
                Register
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default ButtonAppBar();
