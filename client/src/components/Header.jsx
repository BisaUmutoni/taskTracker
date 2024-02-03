import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from '../redux/authSlice';
import history from '../history';
import { Link } from 'react-router-dom';

function Header() {

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logoutSuccess());
    localStorage.removeItem('auth');
    history.push('/LOGIN');
    window.location.reload();
  };

  return (
    <div>
      <nav className='header'>
        <div className='header__logo'>
          <h5>Task Manager</h5>
        </div>
        <div className='header__buttons'>
          {auth.currentUser && auth.currentUser.token ? (
            <Link to='/LOGIN' className='button' onClick={handleClick}>
              SignOut
            </Link>
          ) : (
            <>
              <Link to='/LOGIN' className='button'>
                SignIn
              </Link>
              <Link to='/LOGIN' className='button'>
                SignUp
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};


export default Header;