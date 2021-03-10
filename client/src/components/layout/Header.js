import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { getUserDetails } from '../../actions/authAction';
import { getOwnProfileDetails } from '../../actions/profileAction';
import { ReactComponent as LogoSvg } from '../../images/logo.svg';
import SearchBox from './SearchBox';
import MenuSlider from './MenuSlider';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profileCreate = useSelector((state) => state.profileCreate);
  const { success: successCreate, profileInfo } = profileCreate;

  const menuRef = useRef(null);

  useEffect(() => {
    const nav = document.querySelector('#menu__slider');
    const handler = (e) => {
      if (!menuRef.current.contains(e.target) && nav.classList.contains('menu__slider--active')) {
        setIsOpen(false);
        nav.classList.remove('menu__slider--active');
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const handleMenuSlider = () => {
    const nav = document.querySelector('#menu__slider');
    if (!nav.classList.contains('menu__slider--active')) {
      setIsOpen((isOpen) => !isOpen);
      nav.classList.add('menu__slider--active');
    } else {
      nav.classList.remove('menu__slider--active');
    }
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
      <MenuSlider menuRef={menuRef} logoutHandler={logoutHandler} userInfo={userInfo} />
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
