import React from 'react';
import { ReactComponent as CommunitySvg } from '../../svgs/community.svg';
import { ReactComponent as GrowthSvg } from '../../svgs/growth.svg';
import { ReactComponent as ContributionSvg } from '../../svgs/contribution.svg';
import { ReactComponent as ReflectionSvg } from '../../svgs/reflection.svg';

const LandingFeature = () => {
  return (
    <section className='feature'>
      <div className='feature__content container container--pall'>
        <div className='feature__intro'>
          <h2>What is journii?</h2>
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua."
          </p>
        </div>

        <div className='feature__grid'>
          <div className='feature__item'>
            <div className='feature__icon'>
              <GrowthSvg />
            </div>
            <div className='feature__title'>Growth and Progress</div>
            <div className='feature__description'>
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo."
            </div>
          </div>

          <div className='feature__item'>
            <div className='feature__icon'>
              <ContributionSvg />
            </div>
            <div className='feature__title'>Contribution</div>
            <div className='feature__description'>
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo."
            </div>
          </div>

          <div className='feature__item'>
            <div className='feature__icon'>
              <ReflectionSvg />
            </div>
            <div className='feature__title'>Reflection</div>
            <div className='feature__description'>
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo."
            </div>
          </div>

          <div className='feature__item'>
            <div className='feature__icon'>
              <CommunitySvg />
            </div>
            <div className='feature__title'>Community</div>
            <div className='feature__description'>
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeature;
