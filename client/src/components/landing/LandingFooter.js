import React from 'react';
import { ReactComponent as LogoSvg } from '../../images/logo.svg';
import { Link } from 'react-router-dom';

const LandingFooter = ({ userInfo, currentUser }) => {
  return (
    <footer className='footer'>
      <div className='container'>
        <Link to='#' className='footer__logo'>
          <LogoSvg />
        </Link>

        <div className='footer__social'>
          <a target='_blank' href='https://www.linkedin.com/in/anhuangg/' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-1x' />
          </a>
          <a target='_blank' href='https://github.com/andrewhuangg' rel='noopener noreferrer'>
            <i className='fab fa-github fa-1x' />
          </a>
          <a target='_blank' href='https://angel.co/u/andrewhuang' rel='noopener noreferrer'>
            <i className='fab fa-angellist fa-1x' />
          </a>
        </div>

        <div className='footer__links'>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
        </div>

        <div className='footer__cta'>
          <Link
            to={
              !userInfo
                ? '/register'
                : currentUser && !currentUser.ownProfile
                ? '/createprofile'
                : '/createpost'
            }
            className='button'
          >
            {!userInfo ? 'Sign Up' : 'Lets get started'}
          </Link>
          <div className='footer__copyright'>&copy; journii. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
