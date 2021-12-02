import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ButtonAppBar } from "./materialui/appbar";

export const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
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
        <ButtonAppBar></ButtonAppBar>
      </div>
    );
  }
};

export default Nav;
