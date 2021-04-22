import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authAction';
import { Link } from 'react-router-dom';

const MenuSlider = ({ menuRef, userInfo, isOpen, currentUser }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  // make a go to profile link
  return (
    <>
      <nav
        className={`menu__slider ${isOpen ? 'menu__slider--active' : ''} hide-for-mobile`}
        ref={menuRef}
      >
        <div className='menu'>
          <ul>
            <li>
              <Link to='/userinfo'>Edit User</Link>
            </li>
            {userInfo && currentUser.ownProfile ? (
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
            ) : (
              <li>
                <Link to='/createprofile'>Create Profile</Link>
              </li>
            )}
            {/* <li> //update password ---> add in edit user?
              <Link to='/'></Link>
            </li> */}
            {userInfo && (
              <li>
                <Link to='#' onClick={logoutHandler}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MenuSlider;
