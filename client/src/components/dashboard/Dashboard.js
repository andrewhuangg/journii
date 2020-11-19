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
        <div className='container'>
          <div className='hero__image flex flex-jc-c flex-ai-c'></div>
          <div className='hero__text container--pall'>
            <h1>Some title</h1>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum."
              {/*  quote generator here.*/}
            </p>

            <Link to='#' className='button hero__cta'>
              Lets get started
            </Link>
          </div>
        </div>
      </section>

      <p>
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising
        pain was born and I will give you a complete account of the system, and expound the actual
        teachings of the great explorer of the truth, the master-builder of human happiness. No one
        rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who
        do not know how to pursue pleasure rationally encounter consequences that are extremely
        painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself,
        because it is pain, but because occasionally circumstances occur in which toil and pain can
        procure him some great pleasure. To take a trivial example, which of us ever undertakes
        laborious physical exercise, except to obtain some advantage from it? But who has any right
        to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences,
        or one who avoids a pain that produces no resultant pleasure?" "But I must explain to you
        how all this mistaken idea of denouncing pleasure and praising pain was born and I will give
        you a complete account of the system, and expound the actual teachings of the great explorer
        of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids
        pleasure itself, because it is pleasure, but because those who do not know how to pursue
        pleasure rationally encounter consequences that are extremely painful. Nor again is there
        anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but
        because occasionally circumstances occur in which toil and pain can procure him some great
        pleasure. To take a trivial example, which of us ever undertakes laborious physical
        exercise, except to obtain some advantage from it? But who has any right to find fault with
        a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a
        pain that produces no resultant pleasure?"
      </p>
    </>
  );
};

export default Dashboard;
