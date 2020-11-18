import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { getUserDetails } from '../../actions/authAction';
import { getOwnProfileDetails } from '../../actions/profileAction';

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const profileCreate = useSelector((state) => state.profileCreate);
  const { success: successCreate, profileInfo } = profileCreate;

  useEffect(() => {
    if (userInfo && (!user || !user._id)) {
      dispatch(getUserDetails('me'));
    }
    if (successCreate) {
      dispatch(getOwnProfileDetails());
    }
  }, [dispatch, user, userInfo, successCreate, history]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const btnHamburger = () => {
    const btnHamburger = document.querySelector('#btnHamburger');
    const header = document.querySelector('.header');
    const overlay = document.querySelector('.overlay');

    if (header.classList.contains('open')) {
      //Close Hamburger Menu
      header.classList.remove('open');
      overlay.classList.remove('fade-in');
      overlay.classList.add('fade-out');
    } else {
      //Open Hamburger Menu
      header.classList.add('open');
      overlay.classList.remove('fade-out');
      overlay.classList.add('fade-in');
    }
  };

  return (
    <header className='header'>
      <div className='overlay'></div>
      <nav className='flex flex-jc-sb flex-ai-c'>
        <a href='/' className='header__logo'>
          {/* <img alt='journii'>journii</img> */}
          <div>journii logo goes here</div>
        </a>

        <a id='btnHamburger' className='header__menu hide-for-desktop' onClick={btnHamburger}>
          <span></span>
          <span></span>
          <span></span>
        </a>

        <div className='header__links hide-for-mobile'>
          <Link to='/Home'>Home</Link>
          <Link to='/posts'>Posts</Link>
          <Link to='/profiles'>Profiles</Link>
        </div>

        <div className='header__links hide-for-mobile'>
          {userInfo ? (
            <>
              <Link to='/userinfo'>Update User</Link>
              {!profileInfo && user && !user.ownProfile && (
                <Link className='linkTag' to='/createprofile'>
                  Create Profile
                </Link>
              )}
              {profileInfo && user && user.ownProfile && (
                <Link to='/editprofile'>Update Profile</Link>
              )}
            </>
          ) : (
            <>
              <Link to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
            </>
          )}
          {userInfo && <a onClick={logoutHandler}>Log out</a>}
        </div>

        {userInfo && (
          <Link to='/createpost' className='button header__cta hide-for-mobile'>
            Create Post
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
