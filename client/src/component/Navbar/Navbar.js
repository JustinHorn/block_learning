import React, { useState, useContext } from "react";

import Authentication from "component/Authentication";

import UserContext from "context";

import styles from "./navbar.module.css";

import Popup from "component/Popup";

const Navbar = () => {
  const [show, setShow] = useState("not");

  const getOnClick = (type) => () => {
    if (type === show) {
      setShow("not");
    } else {
      setShow(type);
    }
  };

  const { user, logout } = useContext(UserContext);

  return (
    <>
      <nav className={styles.nav}>
        {(!user &&
          ["Login", "Register"].map((option, index) => (
            <button
              key={index}
              type="checkbox"
              className={option === show ? "active" : ""}
              onClick={getOnClick(option)}
            >
              {option}
            </button>
          ))) || <button onClick={logout}>Logout</button>}
      </nav>

      <Popup show={show !== "not"} onClickAway={() => setShow("not")}>
        <Authentication isLogin={show === "Login"} />
      </Popup>
    </>
  );
};

export default Navbar;
