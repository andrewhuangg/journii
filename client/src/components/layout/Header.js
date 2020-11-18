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
    const header = document.querySelector('.header');
    const body = document.querySelector('body');
    const fadeElems = document.querySelectorAll('.has-fade');

    if (header.classList.contains('open')) {
      //Close Hamburger Menu
      body.classList.remove('noscroll');
      header.classList.remove('open');
      fadeElems.forEach((el) => {
        el.classList.remove('fade-in');
        el.classList.add('fade-out');
      });
    } else {
      //Open Hamburger Menu
      body.classList.add('noscroll');
      header.classList.add('open');
      fadeElems.forEach((el) => {
        el.classList.remove('fade-out');
        el.classList.add('fade-in');
      });
    }
  };

  const headerLinks = (
    <>
      <Link to='/Home'>Home</Link>
      <Link to='/posts'>Posts</Link>
      <Link to='/profiles'>Profiles</Link>
    </>
  );

  return (
    <header className='header'>
      <div className='overlay has-fade'></div>
      <nav className='container flex flex-jc-sb flex-ai-c'>
        <a href='/' className='header__logo'>
          {/* <img alt='journii'>journii</img> */}
          <div>journii logo goes here</div>
        </a>

        <a id='btnHamburger' className='header__toggle hide-for-desktop' onClick={btnHamburger}>
          <span></span>
          <span></span>
          <span></span>
        </a>

        <div className='header__links hide-for-mobile'>{headerLinks}</div>

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

      <div className='header__menu has-fade'>{headerLinks}</div>
    </header>
  );
};

export default Header;
