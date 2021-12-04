import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

export const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleLogoutClick() {
    localStorage.removeItem("auth_token");
    navigate("login");
    setLoggedIn(false);
  }
  function goHome() {
    navigate("");
  }

  useEffect(() => {
    if (localStorage.getItem("auth_token")) setLoggedIn(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {loggedIn ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Grid
                justify="space-between"
                container
                spacing={3}
                alignItems="center"
              >
                <Grid item>
                  <Button
                    onClick={goHome}
                    type="button"
                    id="logout"
                    color="secondary"
                  >
                    <Typography variant="h3" type="title">
                      Stäkouverflou
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleLogoutClick}
                    type="button"
                    id="logout"
                    variant="contained"
                    color="secondary"
                  >
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
              <Grid
                justify="space-between"
                container
                spacing={3}
                alignItems="center"
              >
                <Grid item>
                  <Button
                    onClick={goHome}
                    type="button"
                    id="logout"
                    color="secondary"
                  >
                    <Typography variant="h3" type="title">
                      Stäkouverflou
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Link to="register">
                    <Button variant="contained" color="secondary" type="button">
                      Register
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="login">
                    <Button variant="contained" color="secondary" type="button">
                      Login
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default NavBar;
