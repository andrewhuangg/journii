import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authAction';
import { Link } from 'react-router-dom';

const MobileMenu = ({ mobileRef, mobileOpen, userInfo, currentUser, setMobileOpen }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
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
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <Link to='/posts'>Posts</Link>
                </li>
                <li>
                  <Link to='/profiles'>Profiles</Link>
                </li>
                <li>
                  <Link to='/userinfo'>Edit User</Link>
                </li>
                {userInfo && !currentUser.ownProfile && (
                  <li>
                    <Link to='/createprofile'>Create Profile</Link>
                  </li>
                )}
                <li>
                  <Link to='/updatepassword'>Update Password</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/register'>Signup</Link>
                </li>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              </>
            )}
            {userInfo && currentUser.ownProfile && (
              <>
                <li>
                  <Link to={`/profile/${userInfo.id}`}>My Profile</Link>
                </li>
                <li>
                  <Link to='/editprofile'>Edit Profile</Link>
                </li>
                <li>
                  <Link to='/addexperience'>Add Experience</Link>
                </li>
                <li>
                  <Link to='/addproject'>Add Project</Link>
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
