import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import useStyles from "../materialui/Styles";
import AlertMessage from "../AlertMessage";

export const Login = () => {
  const [user, setUsers] = useState(null);
  const classes = useStyles();
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUsers((values) => ({ ...values, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();

    if (!user || !user.email || !user.password) {
      setStatus({
        msg: "Write your credentials first!",
        severity: "error",
        key: Math.random(),
      });
      return;
    }

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
          setStatus({ msg: data.msg, severity: "error", key: Math.random() });
        }
      });
  }

  return (
    <Box className={classes.boxContainer}>
      <h1>Login</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <label>
          <TextField label="email" name="email" onChange={handleChange} />
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
      {status ? (
        <AlertMessage
          severity={status.severity}
          message={status.msg}
          key={status.key}
        />
      ) : null}
    </Box>
  );
};

export default Login;
