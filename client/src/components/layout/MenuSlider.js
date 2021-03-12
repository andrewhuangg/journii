import React from 'react';
import { Link } from 'react-router-dom';

const MenuSlider = ({ menuRef, logoutHandler, userInfo, isOpen, user: { ownProfile } }) => {
  return (
    <>
      <nav
        className={`menu__slider ${isOpen ? 'menu__slider--active' : ''}`}
        id='menu__slider'
        ref={menuRef}
      >
        <div className='menu'>
          <ul>
            <li>
              <Link to='/userinfo'>Edit User</Link>
            </li>
            {ownProfile ? (
              <>
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

            {/* make links for other users as well - related to likedposts and followed posts for other users too, share component and lists */}

            {/* <li> //liked posts
              <Link to='/'></Link>
            </li> */}
            {/* <li> //followed posts
              <Link to='/'></Link>
            </li> */}
            {/* <li> //top posts
              <Link to='/'></Link>
            </li> */}
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
