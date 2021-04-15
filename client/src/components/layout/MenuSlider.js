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
        className={`menu__slider ${isOpen ? 'menu__slider--active' : ''}`}
        id='menu__slider'
        ref={menuRef}
      >
        <div className='menu'>
          <ul>
            <li>
              <Link to='/userinfo'>Edit User</Link>
            </li>
            {currentUser.ownProfile ? (
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
            {/* need to add edit post somewhere... and list all posts by user id */}
            {/* <li> //update password ---> add in edit user?
              <Link to='/'></Link>
            </li> */}

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
