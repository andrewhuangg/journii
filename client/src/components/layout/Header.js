import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSvg } from '../../images/logo.svg';
import SearchBox from './SearchBox';
import MenuSlider from './MenuSlider';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

  const menuRef = useRef(null);

  const handleClickSliderOpen = (e) => {
    e.preventDefault();
    menuRef.current && !menuRef.current.contains(e.target) && setIsOpen(false);
  };

  useEffect(() => {
    isOpen
      ? document.addEventListener('click', handleClickSliderOpen)
      : document.removeEventListener('click', handleClickSliderOpen);

    return () => document.removeEventListener('click', handleClickSliderOpen);
  }, [isOpen]);

  const handleMenuSlider = (e) => {
    setIsOpen(!isOpen);
  };

  const headerLinks = (
    <ul className='header__ul'>
      <li>
        <Link to='/dashboard'>Home</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/profiles'>Profiles</Link>
      </li>
      <li>
        <Link to='/random'>Profiles</Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className='header__ul'>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/register'>Signup</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <>
      <MenuSlider menuRef={menuRef} userInfo={userInfo} isOpen={isOpen} />
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
