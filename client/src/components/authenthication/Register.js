import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import useStyles from "../materialui/Styles";
import AlertMessage from "../AlertMessage";

//Component to register new users
export const Register = () => {
  //User is set unto this state
  const [user, setUsers] = useState({});
  //Classes to get styles
  const classes = useStyles();
  //Status is used for snackbar alert messages.
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  //When data is changed in the form, get the name and value of the change and append or update them onto the user state.
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUsers((values) => ({ ...values, [name]: value }));
  }

  //Register button is pressed.
  function handleSubmit(event) {
    event.preventDefault();
    //Check that all necessary fields are filled, if not, show an alert error.
    if (!user || !user.email || !user.password) {
      setStatus({
        msg: "Write your credentials first!",
        severity: "error",
        key: Math.random(),
      });
      return;
    }

    //Send the post request for the new user.
    fetch("/users/register/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        //If register was succesfull, set alert status and navigate to login page
        if (data.success) {
          navigate("/login");
        } else {
          //Set alert status as an error if something went wrong.
          if (data.msg) {
            setStatus({ msg: data.msg, severity: "error", key: Math.random() });
          }
        }
      });
  }

  return (
    <Box className={classes.boxContainer}>
      <h1>Register</h1>
      <form id="register-form" onSubmit={handleSubmit}>
        <label>
          <TextField label="email" name="email" onChange={handleChange} />
        </label>
        <br /> <br />
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

export default Register;
