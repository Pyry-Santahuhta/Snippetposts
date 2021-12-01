import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  function handleLogoutClick() {
    localStorage.removeItem("auth_token");
    navigate("login");
    setLoggedIn(false);
  }

  if (loggedIn) {
    return (
      <button onClick={handleLogoutClick} type="button" id="logout">
        Logout
      </button>
    );
  } else {
    return (
      <div>
        <Link to="login">
          <button type="button">Login</button>
        </Link>
        <Link to="register">
          <button type="button">Register</button>
        </Link>
      </div>
    );
  }
};

export default Nav;
