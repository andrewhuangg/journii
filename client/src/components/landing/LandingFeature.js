import React from 'react';
import { ReactComponent as CommunitySvg } from '../../images/community.svg';
import { ReactComponent as GrowthSvg } from '../../images/growth.svg';
import { ReactComponent as ContributionSvg } from '../../images/contribution.svg';
import { ReactComponent as ReflectionSvg } from '../../images/reflection.svg';

const LandingFeature = () => {
  return (
    <section className='feature'>
      <div className='feature__content container container--pall'>
        <div className='feature__intro'>
          <h2>What is journii?</h2>
          <p>
            journii is an online community for networking, sharing and exploring ideas, and making
            life-long friends.
          </p>
        </div>

        <div className='feature__grid'>
          <div className='feature__item'>
            <div className='feature__icon'>
              <GrowthSvg />
            </div>
            <div className='feature__title'>Growth and Progress</div>
            <div className='feature__description'>
              Track your ideas by writing and sharing your posts. Update them often so your peers
              can follow along your journii.
            </div>
          </div>

          <div className='feature__item'>
            <div className='feature__icon'>
              <ContributionSvg />
            </div>
            <div className='feature__title'>Contribution</div>
            <div className='feature__description'>
              Like and comment on posts that you've enjoyed reading. Give the post a review and help
              the author grow.
            </div>
          </div>

          <div className='feature__item'>
            <div className='feature__icon'>
              <ReflectionSvg />
            </div>
            <div className='feature__title'>Reflection</div>
            <div className='feature__description'>
              Comb through the reviews on your post. Follow the conversations and reply to your
              peers.
            </div>
          </div>

          <div className='feature__item'>
            <div className='feature__icon'>
              <CommunitySvg />
            </div>
            <div className='feature__title'>Community</div>
            <div className='feature__description'>
              Follow your peers and their posts. Check their profiles out, and network. Their
              journii and yours, is just beginning.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeature;
