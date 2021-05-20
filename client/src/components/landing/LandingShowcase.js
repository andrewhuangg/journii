import React from 'react';
import { Link } from 'react-router-dom';
import QuoteGenerator from '../layout/QuoteGenerator';

const LandingShowcase = ({ userInfo }) => {
  return (
    <section className='showcase'>
      <div className='showcase__video-container container'>
        <video
          autoPlay
          loop
          muted
          src={'https://journii--dev.s3-us-west-1.amazonaws.com/journii_hero_video.mp4'}
        />
      </div>
      <div className='showcase__content'>
        <h1>journii</h1>
        <QuoteGenerator />
        {!userInfo && (
          <div className='showcase__cta'>
            <Link to='/register' className='button'>
              signup
            </Link>
            <Link to='/login' className='button'>
              login
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LandingShowcase;
