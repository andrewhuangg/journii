import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { getUserDetails } from '../../actions/authAction';
import { ReactComponent as LogoSvg } from '../../images/logo.svg';
import SearchBox from './SearchBox';
import MenuSlider from './MenuSlider';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: loadingUserDetails, success: successUserDetails, user } = userDetails;

  const menuRef = useRef(null);

  useEffect(() => {
    if (userInfo) dispatch(getUserDetails('me'));
  }, [userInfo]);

  const handleClickSliderOpen = (e) => {
    e.target !== menuRef.current && setIsOpen(false);
  };

  useEffect(() => {
    switch (isOpen) {
      case true:
        document.addEventListener('click', handleClickSliderOpen);
        break;
      default:
        document.removeEventListener('click', handleClickSliderOpen);
        break;
    }

    return () => document.removeEventListener('click', handleClickSliderOpen);
  }, [isOpen]);

  const handleMenuSlider = (e) => {
    setIsOpen(!isOpen);
  };

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
    <>
      <MenuSlider
        menuRef={menuRef}
        logoutHandler={logoutHandler}
        userInfo={userInfo}
        user={user}
        isOpen={isOpen}
      />
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
                <button onClick={handleMenuSlider} className='menu__btn'>
                  menu
                </button>
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
    </>
  );
};

export default Header;
