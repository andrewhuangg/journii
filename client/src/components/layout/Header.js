import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSvg } from '../../images/logo.svg';
import SearchBox from './SearchBox';
import MenuSlider from './MenuSlider';
import MobileMenu from './MobileMenu';
import { getMe } from '../../actions/authAction';

const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

  const userDetails = useSelector((state) => state.auth.userShow);
  const { currentUser } = userDetails;

  const menuRef = useRef(null);
  const mobileRef = useRef(null);

  const handleClickSliderOpen = (e) => {
    menuRef.current && !menuRef.current.contains(e.target) && setIsOpen(false);
  };

  const handleMobileOpen = (e) => {
    mobileRef.current && !mobileRef.current.contains(e.target) && setMobileOpen(false);
  };

  useEffect(() => {
    isOpen
      ? document.addEventListener('click', handleClickSliderOpen)
      : document.removeEventListener('click', handleClickSliderOpen);

    mobileOpen
      ? document.addEventListener('click', handleMobileOpen)
      : document.removeEventListener('click', handleMobileOpen);

    if (userInfo) dispatch(getMe());

    return () => {
      document.removeEventListener('click', handleClickSliderOpen);
      document.removeEventListener('click', handleMobileOpen);
    };
  }, [mobileOpen, isOpen, userInfo, dispatch]);

  const handleMenuSlider = (e) => {
    setIsOpen(!isOpen);
  };

  const handleMobileMenu = (e) => {
    setMobileOpen(!mobileOpen);
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
      <MenuSlider menuRef={menuRef} userInfo={userInfo} isOpen={isOpen} currentUser={currentUser} />
      <MobileMenu
        mobileRef={mobileRef}
        userInfo={userInfo}
        currentUser={currentUser}
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
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
                <Link
                  to={currentUser && !currentUser.ownProfile ? '/createprofile' : '/createpost'}
                  className='header__post-btn'
                >
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
          <div className='header__mobile-cta'>
            <Link
              to={currentUser && !currentUser.ownProfile ? '/createprofile' : '/createpost'}
              className='header__post-btn mobile-post-btn hide-for-desktop'
            >
              Create Post
            </Link>
            <div
              className={`mobile-menu__btn open-${mobileOpen} hide-for-desktop`}
              onClick={handleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
