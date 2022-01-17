import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogOutButton";
import {
  HomeIcon,
  UserCircleIcon,
  PlusCircleIcon,
  GlobeIcon,
} from "@heroicons/react/outline";
import SelectImagePage from "../SelectImagePage";
import "./Navbar.css";
import { useSelector } from "react-redux";

const NavBar = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [userDrop, setUserDrop] = useState(false);

  const [imageSelectPopup, setImageSelectPopup] = useState(false);

  const goToProfile = (userId) => {
    history.push(`/users/${userId}`);
  };
  useEffect(() => {
    const bug3 = document.querySelector(".galaga-bug-3-pre");
    const bug2 = document.querySelector(".galaga-bug-2-pre");
    const bug1 = document.querySelector(".galaga-bug-1-pre");
    const boss = document.querySelector(".galaga-boss-pre");
    const missile1 = document.querySelector(".galaga-missile-1-pre");
    const missile2 = document.querySelector(".galaga-missile-2-pre");
    const missile3 = document.querySelector(".galaga-missile-3-pre");
    const missile4 = document.querySelector(".galaga-missile-4-pre");
    const ship = document.querySelector(".galaga-ship-container");
    ship.addEventListener("click", (e) => {
      bug3.classList.add("galaga-bug-3");
      bug2.classList.add("galaga-bug-2");
      bug1.classList.add("galaga-bug-1");
      boss.classList.add("galaga-boss");
      missile1.classList.add("galaga-missile-1");
      missile2.classList.add("galaga-missile-2");
      missile3.classList.add("galaga-missile-3");
      missile4.classList.add("galaga-missile-4");
      setTimeout(() => {
        bug3.classList.remove("galaga-bug-3");
        bug2.classList.remove("galaga-bug-2");
        bug1.classList.remove("galaga-bug-1");
        boss.classList.remove("galaga-boss");
        missile1.classList.remove("galaga-missile-1");
        missile2.classList.remove("galaga-missile-2");
        missile3.classList.remove("galaga-missile-3");
        missile4.classList.remove("galaga-missile-4");
      }, 3000);
    });
  }, []);

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <NavLink to="/" id="site-title">
          Gamestagram
        </NavLink>
        <div className="galaga">
          <div className="galaga-ship-container">
            <img className="galaga-ship" src="galaga-ship.png" />
          </div>
          <div className="test-cover"></div>
          <div className="galaga-missile-container">
            <img
              className="galaga-missile galaga-missile-4-pre"
              src="galaga-missile.png"
            ></img>
            <img
              className="galaga-missile galaga-missile-3-pre"
              src="galaga-missile.png"
            ></img>
            <img
              className="galaga-missile galaga-missile-2-pre"
              src="galaga-missile.png"
            ></img>
            <img
              className="galaga-missile galaga-missile-1-pre"
              src="galaga-missile.png"
            ></img>
          </div>
          <div className="galaga-enemy-container">
            <div className="cover"></div>
            <img className="galaga-bug-3-pre" src="galaga-bug.png" />
            <img className="galaga-bug-2-pre" src="galaga-bug.png" />
            <img className="galaga-bug-1-pre" src="galaga-bug.png" />
            <img className="galaga-boss-pre" id="gb" src="galaga-boss.png" />
          </div>
        </div>
      </div>

      <ul className="nav-bar-right">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            <HomeIcon className="nav-icon" />
          </NavLink>
        </li>
        <li>
          <PlusCircleIcon
            className="nav-icon"
            onClick={() => {
              setImageSelectPopup(true);
            }}
          />
          <SelectImagePage
            trigger={imageSelectPopup}
            setTrigger={setImageSelectPopup}
          />
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
                  <UserCircleIcon
                    className="nav-avatar"
                    onClick={(event) => goToProfile(user.id)}
                  />
                  <div onClick={(event) => goToProfile(user.id)}>
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
