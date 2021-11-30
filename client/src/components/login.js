import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

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
        }
        if (data.msg) {
          document.getElementById("errors").innerHTML = data.msg;
        }
      });
  }

  return (
    <Fragment>
      <h1>Login</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" id="email" name="email" onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <br />

        <input type="submit" id="submit" value="Submit" />
      </form>
      <div id="errors"></div>
    </Fragment>
  );
};

export default Login;
