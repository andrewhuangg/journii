import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authAction';
import { Link } from 'react-router-dom';

const MobileMenu = ({ mobileRef, mobileOpen, userInfo, currentUser, setMobileOpen }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <div className={`mobile-menu open-${mobileOpen} hide-for-desktop`}>
        <div className='mobile-menu__container hide-for-desktop' ref={mobileRef}>
          <div className='mobile-menu__cta'>
            <div onClick={() => setMobileOpen(!mobileOpen)} className='mobile-menu__close-btn'>
              X
            </div>
          </div>
          <ul>
            {userInfo ? (
              <>
                <li>
                  <Link to='/dashboard' onClick={() => setMobileOpen(!mobileOpen)}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to='/posts' onClick={() => setMobileOpen(!mobileOpen)}>
                    Posts
                  </Link>
                </li>
                <li>
                  <Link to='/profiles' onClick={() => setMobileOpen(!mobileOpen)}>
                    Profiles
                  </Link>
                </li>
                <li>
                  <Link to='/userinfo' onClick={() => setMobileOpen(!mobileOpen)}>
                    Edit User
                  </Link>
                </li>
                {userInfo && !currentUser.ownProfile && (
                  <li>
                    <Link to='/createprofile' onClick={() => setMobileOpen(!mobileOpen)}>
                      Create Profile
                    </Link>
                  </li>
                )}
                <li>
                  <Link to='/updatepassword' onClick={() => setMobileOpen(!mobileOpen)}>
                    Update Password
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/' onClick={() => setMobileOpen(!mobileOpen)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to='/register' onClick={() => setMobileOpen(!mobileOpen)}>
                    Signup
                  </Link>
                </li>
                <li>
                  <Link to='/login' onClick={() => setMobileOpen(!mobileOpen)}>
                    Login
                  </Link>
                </li>
              </>
            )}
            {userInfo && currentUser.ownProfile && (
              <>
                <li>
                  <Link to={`/profile/${userInfo.id}`} onClick={() => setMobileOpen(!mobileOpen)}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to='/editprofile' onClick={() => setMobileOpen(!mobileOpen)}>
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link to='/addexperience' onClick={() => setMobileOpen(!mobileOpen)}>
                    Add Experience
                  </Link>
                </li>
                <li>
                  <Link to='/addproject' onClick={() => setMobileOpen(!mobileOpen)}>
                    Add Project
                  </Link>
                </li>
              </>
            )}
            {userInfo && (
              <li>
                <Link to='#' onClick={logoutHandler}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
