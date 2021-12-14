import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "./materialui/Styles";

// Navbar that holds navigation and the logout button.
export const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const classes = useStyles();

  function handleLogoutClick() {
    localStorage.removeItem("auth_token");
    navigate("login");
    setLoggedIn(false);
    //Reload page to reload react state so postform and like buttons disappear.
    window.location.reload(false);
  }

  function goHome() {
    navigate("");
  }

  //On page load check if the user is logged in
  useEffect(() => {
    if (localStorage.getItem("auth_token")) setLoggedIn(true);
  }, []);

  return (
    /* If the user is logged in, return navbar with logout button. */
    <div>
      {loggedIn ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Grid
                className={classes.navbarGrid}
                container
                spacing={3}
                //Make the bar flow responsively depending on screen size
                direction={largeScreen ? "row" : "column"}
              >
                <Grid item>
                  {/* Title which is also a button that takes you to the homepage */}
                  <Button color="secondary" onClick={goHome} type="button">
                    <Typography
                      className={classes.title}
                      variant={largeScreen ? "h3" : "h4"}
                    >
                      Snippet Posts
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleLogoutClick}
                    type="button"
                    variant="contained"
                    color="secondary"
                    className={classes.navButton}
                  >
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        /* If the user isn't logged in, return a navbar with login and register buttons. */
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Grid
                className={classes.navbarGrid}
                container
                spacing={3}
                direction={largeScreen ? "row" : "column"}
              >
                <Grid item>
                  <Button onClick={goHome} type="button" color="secondary">
                    <Typography
                      className={classes.title}
                      variant={largeScreen ? "h3" : "h5"}
                    >
                      Snippet Posts
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
    </div>
  );
};

export default NavBar;
