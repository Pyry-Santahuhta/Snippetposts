import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleLogoutClick() {
    localStorage.removeItem("auth_token");
    navigate("login");
    setLoggedIn(false);
  }

  return (
    <ThemeProvider theme={theme}>
      {
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
              <Button
                onClick={handleLogoutClick}
                type="button"
                id="logout"
              ></Button>
            </Toolbar>
          </AppBar>
        </Box>
      }
    </ThemeProvider>
  );
};

export default NavBar;
