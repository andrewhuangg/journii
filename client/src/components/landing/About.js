import React from 'react';
import Meta from '../layout/Meta';

const About = () => {
  return (
    <>
      <div className='about'>
        <Meta title='journii | About' />

        <section className='about__container'>
          <div className='about__header'>
            <h2>Join our community</h2>
            <div className='about__subtitle'>Everyone has their own journii</div>
            <p>
              The journey is never ending. There's always gonna be growth, improvement, adversity;
              you just gotta take it all in and do what's right, continue to grow, continue to live
              in the moment.
              <br />
              <i>- Antonio Brown</i>
            </p>
          </div>

          <div className='about__contact'>
            <h3>Contact</h3>
            <small>Reach us at</small>
            <a target='_blank' href='mailto:noreply.journii@gmail.com' rel='noopener noreferrer'>
              noreply.journii@gmail.com
            </a>
          </div>

          <div className='about__info'>
            <h3>What is journii?</h3>
            <ul>
              <li>
                journii is an online community for networking, sharing and exploring ideas, and
                making life-long friends.
              </li>
              <li>
                Track your ideas by writing and sharing your posts. Update them often so your peers
                can follow along your journii
              </li>
              <li>
                Follow your peers and their posts. Check their profiles out, and network. Their
                journii and yours, is just beginning.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
