import React, { Fragment } from "react";
import logo from "../assets/logo.jpg";
import Home from "./Home";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <Fragment>
      <div className="top-nav">
        <header className="nav-logo">
          <img src={logo} alt="logo-icon" />
          <h2>React Forms</h2>
        </header>
        <div className="logoutActions">
          <button type="button" className="logoutBtn" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
      <Home />
    </Fragment>
  );
};

export default Navigation;
