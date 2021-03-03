import React from 'react';
import { Link } from 'react-router-dom';

const LandingHero = () => {
  return (
    <section className='hero'>
      <div className='container'>
        <div className='hero__image flex flex-jc-c flex-ai-c'></div>
        <div className='hero__text container--pall'>
          <h1>Welcome</h1>
          <div className='hero__message'>
            <p>You've taken the first step by visiting this page.</p>
            <p>
              You're about to be immersed into a whole other world of knowledge, surrounded by
              like-minded individuals in search of community, growth, and friendship.
            </p>
            <p>We thank you for allowing us to join your journii.</p>
          </div>
          <Link to='/register' className='button hero__cta'>
            Lets get started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
