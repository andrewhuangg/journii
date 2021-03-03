import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { getUserDetails } from '../../actions/authAction';
import { getOwnProfileDetails } from '../../actions/profileAction';
import { ReactComponent as LogoSvg } from '../../images/logo.svg';
import SearchBox from './SearchBox';

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const [sliderMenu, setSliderMenu] = useState(false);

  const openSliderMenu = () => {
    const header = document.querySelector('.header');
    const slider = document.querySelector('.slider');
    const body = document.querySelector('body');

    setSliderMenu(!sliderMenu);

    if (sliderMenu && header.classList.contains('open')) {
      body.classList.remove('noscroll');
      header.classList.remove('open');
      slider.classList.add('has-slide');
    } else {
      body.classList.add('noscroll');
      header.classList.add('open');
      slider.classList.remove('has-slide');
    }
  };

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
  }, [dispatch, user, userInfo, successCreate, profileInfo, history]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const mobileHamburger = () => {
    const header = document.querySelector('.header');
    const body = document.querySelector('body');
    const fadeElems = document.querySelectorAll('.mobile-has-fade');

    if (header.classList.contains('mobile-open')) {
      //Close Hamburger Menu
      body.classList.remove('noscroll');
      header.classList.remove('mobile-open');
      fadeElems.forEach((el) => {
        el.classList.remove('fade-in');
        el.classList.add('fade-out');
      });
    } else {
      //Open Hamburger Menu
      body.classList.add('noscroll');
      header.classList.add('mobile-open');
      fadeElems.forEach((el) => {
        el.classList.remove('fade-out');
        el.classList.add('fade-in');
      });
    }
  };

  const headerLinks = (
    <>
      <Link to='/dashboard'>Home</Link>
      <Link to='/posts'>Posts</Link>
      <Link to='/profiles'>Profiles</Link>
    </>
  );

  const profileOptions =
    !profileInfo && user && !user.ownProfile
      ? {
          title: 'Create Profile',
          path: '/createprofile',
        }
      : {
          title: 'Update Profile',
          path: '/editprofile',
        };

  const userOptions = [
    {
      title: 'Register',
      path: '/register',
    },
    {
      title: 'Login',
      path: '/login',
    },
  ];

  const menuLinks = userInfo
    ? [
        {
          title: 'Update User',
          path: '/userinfo',
        },
        profileOptions,
      ]
    : userOptions;

  return (
    <>
      <header className='header'>
        <nav className='header__nav container'>
          <div className='header__logo-container'>
            <Link to='/' className='header__logo'>
              <LogoSvg />
            </Link>
          </div>
          <Route render={({ history }) => <SearchBox history={history} />} />
        </nav>
      </header>
    </>
  );
};

export default Header;

// {/* <div className='overlay has-fade mobile-has-fade'></div>

//         <nav className='container container--pall flex flex-jc-sb flex-ai-c'>
//           {/* Hamburger button */}
//           <a className='header__toggle hide-for-desktop' onClick={mobileHamburger}>
//             <span></span>
//             <span></span>
//             <span></span>
//           </a>

//           <Route render={({ history }) => <SearchBox history={history} />} />

//           <div className='header__links hide-for-mobile'>{headerLinks}</div>
//           {userInfo && (
//             <Link to='/createpost' className='button header__cta hide-for-mobile'>
//               Create Post
//             </Link>
//           )}

//           {/* Hamburger button */}
//           <a className='header__toggle hide-for-mobile' onClick={openSliderMenu}>
//             <span></span>
//             <span></span>
//             <span></span>
//           </a>
//         </nav>

//         <SliderMenu menuLinks={menuLinks} logoutHandler={logoutHandler} userInfo={userInfo} />

//         <div className='header__mobile-menu mobile-has-fade'>{headerLinks}</div> */}
