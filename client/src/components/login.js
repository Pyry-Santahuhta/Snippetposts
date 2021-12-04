import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialui/theme";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export const Login = () => {
  const [user, setUsers] = useState(null);

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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          mt: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Login</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <label>
            <TextField
              type="email"
              label="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            <TextField
              id="outlined-basic"
              label="password"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <Button
            type="submit"
            id="submit"
            value="Submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
        <div id="errors"></div>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
