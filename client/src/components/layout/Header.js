import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { getUserDetails } from '../../actions/authAction';
import { getOwnProfileDetails } from '../../actions/profileAction';
import { ReactComponent as LogoSvg } from '../../images/logo.svg';
import SearchBox from './SearchBox';

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const profileCreate = useSelector((state) => state.profileCreate);
  const { success: successCreate, profileInfo } = profileCreate;

  useEffect(() => {
    // if (userInfo && (!user || !user._id)) {
    //   dispatch(getUserDetails('me'));
    // }
    if (successCreate) {
      dispatch(getOwnProfileDetails());
    }
    // }, [dispatch, user, userInfo, successCreate, profileInfo, history]);
  }, [dispatch, successCreate, history]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const headerLinks = (
    <ul className='header__ul'>
      <li>
        <Link to={'/dashboard'}>Home</Link>
      </li>
      <li>
        <Link to={'/posts'}>Posts</Link>
      </li>
      <li>
        <Link to={'/profiles'}>Profiles</Link>
      </li>
      {userInfo && (
        <li>
          <Link to='#' onClick={logoutHandler}>
            logout
          </Link>
        </li>
      )}
    </ul>
  );

  const authLinks = (
    <ul className='header__ul'>
      <li>
        <Link to={'/'}>Home</Link>
      </li>
      <li>
        <Link to={'/register'}>Signup</Link>
      </li>
      <li>
        <Link to={'/login'}>Login</Link>
      </li>
    </ul>
  );

  return (
    <ul>
      <header className='header'>
        <nav className='header__nav container'>
          <div className='header__logo-container'>
            <Link to='/' className='header__logo'>
              <LogoSvg />
            </Link>
          </div>
          {userInfo && <Route render={({ history }) => <SearchBox history={history} />} />}
          <div className='header__links'>
            {userInfo ? (
              <>
                {headerLinks}
                <Link to='/createpost' className='header__post-btn hide-for-mobile'>
                  Create Post
                </Link>
              </>
            ) : (
              <>{authLinks}</>
            )}
          </div>
          <div className='header__menu hide-for-desktop'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>
    </ul>
  );
};

export default Header;
