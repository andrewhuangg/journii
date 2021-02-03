import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CommunitySvg } from '../../svgs/community.svg';
import { ReactComponent as GrowthSvg } from '../../svgs/growth.svg';
import { ReactComponent as ContributionSvg } from '../../svgs/contribution.svg';
import { ReactComponent as ReflectionSvg } from '../../svgs/reflection.svg';
import { ReactComponent as LogoSvg } from '../../svgs/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { listTopPosts } from '../../actions/postAction';
import Spinner from './Spinner';
import AlertMessage from './AlertMessage';
import Meta from './Meta';
import TopPostItem from './TopPostItem';

const Landing = () => {
  const dispatch = useDispatch();
  const postTopRated = useSelector((state) => state.postTopRated);
  const { loading, error, posts } = postTopRated;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listTopPosts(4));
  }, [dispatch]);

  return (
    <>
      <Meta />
      {loading && <Spinner />}
      {error && <AlertMessage>{error}</AlertMessage>}
      <section className='showcase'>
        <div className='showcase__video-container container'>
          <video
            autoPlay
            loop
            muted
            src={'https://journii-dev.s3-us-west-1.amazonaws.com/journii_hero_video.mp4'}
          />
        </div>
        <div className='showcase__content'>
          <h1>journii</h1>
          <p>It never stops.</p> {/* quote generator here. */}
          {!userInfo && (
            <div className='showcase__cta'>
              <Link to='/register' className='button'>
                register
              </Link>
              <Link to='/login' className='button'>
                login
              </Link>
            </div>
          )}
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
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo."
              </div>
            </div>

            <div className='feature__item'>
              <div className='feature__icon'>
                <ContributionSvg />
              </div>
              <div className='feature__title'>Contribution</div>
              <div className='feature__description'>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo."
              </div>
            </div>

            <div className='feature__item'>
              <div className='feature__icon'>
                <ReflectionSvg />
              </div>
              <div className='feature__title'>Reflection</div>
              <div className='feature__description'>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo."
              </div>
            </div>

            <div className='feature__item'>
              <div className='feature__icon'>
                <CommunitySvg />
              </div>
              <div className='feature__title'>Community</div>
              <div className='feature__description'>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo."
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='posts'>
        <div className='post__content container container--pall'>
          <h2>Top Posts</h2>
          <div className='post__grid'>
            {posts && posts.map((post) => <TopPostItem key={post._id} post={post} />)}
          </div>
        </div>
      </section>

      <footer className='footer'>
        <div className='container'>
          <Link to='#' className='footer__logo'>
            <LogoSvg />
          </Link>

          <div className='footer__social'>
            <Link to='#' alt='Linkedin' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-linkedin fa-1x' />
            </Link>
            <Link to='#' alt='Github' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-github fa-1x' />
            </Link>
            <Link to='#' alt='AngelList' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-angellist fa-1x' />
            </Link>
          </div>

          <div className='footer__links col1'>
            <Link to='#'>About</Link>
            <Link to='#'>Contact</Link>
          </div>

          <div className='footer__cta'>
            <Link to='#' className='button'>
              Sign Up
            </Link>
          </div>

          <div className='footer__copyright'>&copy; journii. All Rights Reserved.</div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
