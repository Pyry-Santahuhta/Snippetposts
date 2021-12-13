import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import useStyles from "../materialui/Styles";

export const Login = () => {
  const [user, setUsers] = useState(null);
  const classes = useStyles();

  const navigate = useNavigate();

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUsers((values) => ({ ...values, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    fetch("/users/login/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("auth_token", data.token);
          navigate("/");
          window.location.reload(false);
        }
        if (data.msg) {
          document.getElementById("errors").innerHTML = data.msg;
        }
      });
  }

  return (
    <Box className={classes.boxContainer}>
      <h1>Login</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <label>
          <TextField
            type="email"
            label="email"
            name="email"
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          <TextField
            label="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <Button
          type="submit"
          value="Submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
      <div id="errors"></div>
    </Box>
  );
};

export default Login;
