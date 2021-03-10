import React from 'react';
import { Link } from 'react-router-dom';

const MenuSlider = ({ menuRef, logoutHandler, userInfo }) => {
  return (
    <>
      <nav className='menu__slider' id='menu__slider' ref={menuRef}>
        <div className='menu'>
          <ul>
            <li>
              <Link to='/userinfo'>Edit User</Link>
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
            {userInfo && (
              <li>
                <Link to='#' onClick={logoutHandler}>
                  logout
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
