import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { FirebaseContext } from "../firebase";

function Header() {
  const { user, firebase } = React.useContext(FirebaseContext);

  const authLinks = (
    <ul>
      <li>
        <NavLink to="/trails">Seznam poti</NavLink>
      </li>
      <li>
        <NavLink to="/create">
          <i className="fas fa-plus-square"></i>{" "}
          <span className="hide-sm">Dodaj pot</span>
        </NavLink>
      </li>

      <li>
        <NavLink onClick={() => firebase.logout()} to="/">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Odjava</span>
        </NavLink>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink to="/trails">Seznam poti</NavLink>
      </li>
      <li>
        <NavLink to="/login">Prijava</NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to="/">
          <i className="fas fa-bicycle"></i> Kras Bike
        </NavLink>
      </h1>
      {user ? authLinks : guestLinks}
    </nav>
  );
}

export default withRouter(Header);
