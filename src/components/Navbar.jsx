import React from 'react';
import { NavLink } from 'react-router-dom';
import authService from '../services/auth-service';

const Navbar = ({ isLoggedIn, user, setUser }) => {
  const logoutUser = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };

  return (
    <ul>
      {isLoggedIn && user && (
        <>
          <li>{user.username}</li>
          <li>
            <NavLink to="/">
              <button onClick={() => logoutUser()}>Logout</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/private">Private</NavLink>
          </li>
        </>
      )}
      {!isLoggedIn && (
        <>
          <li>
            <NavLink to="/signup">SignUp</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navbar;
