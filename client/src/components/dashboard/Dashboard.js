import React from 'react';
import { Link } from 'react-router-dom';
// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCurrentProfile } from '../../actions/profileAction';
// import { deleteAccount } from '../../actions/authAction';
// import Spinner from '../layout/Spinner';
// import AlertMessage from '../layout/AlertMessage';

const Dashboard = () => {
  return (
    <>
      <section className='showcase'>
        <div className='showcase__video-container'>
          <video
            autoPlay
            loop
            muted
            src={'https://journii-dev.s3-us-west-1.amazonaws.com/journii_hero_video.mp4'}
          />
        </div>
        <div className='showcase__content'>
          <h1>journii</h1>
          <p>It never stops.</p> {/*  quote generator here.*/}
        </div>
      </section>

      <section className='hero'>
        <div className='hero__image'></div>
        <div className='hero__text'>
          <p>The journey never stops.</p> {/*  quote generator here.*/}
          <Link to='#' className='button hero__cta'>
            Lets get started
          </Link>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
