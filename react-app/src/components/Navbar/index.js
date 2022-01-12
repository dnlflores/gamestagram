import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogOutButton";
import {
  HomeIcon,
  UserCircleIcon,
  PlusCircleIcon,
  GlobeIcon,
} from "@heroicons/react/outline";
import "./Navbar.css";
import { useSelector } from "react-redux";

const NavBar = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [userDrop, setUserDrop] = useState(false);

  const goToProfile = userId => {
    history.push(`/users/${userId}`);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <NavLink to="/">Gamestagram</NavLink>
      </div>
      <ul className="nav-bar-right">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            <HomeIcon className="nav-icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/games/new">
            <PlusCircleIcon className="nav-icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/games">
            <GlobeIcon className="nav-icon" />
          </NavLink>
        </li>
        <li>
          <UserCircleIcon
            onClick={() => setUserDrop(!userDrop)}
            className="nav-icon"
          />
        </li>
        {userDrop && (
          <li className="user-dropdown">
            <div className="user-info">
              {user && (
                <>
                  <UserCircleIcon className="nav-avatar" onClick={event => goToProfile(user.id)}/>
                  <div onClick={event => goToProfile(user.id)}>
                    <div className="dropdown-username">{user.username}</div>
                    <div className="dropdown-email">{user.email}</div>
                  </div>
                </>
              )}
            </div>
            <LogoutButton />
          </li>
        )}
        {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
          Users
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
