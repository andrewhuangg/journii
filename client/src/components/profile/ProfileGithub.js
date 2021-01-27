import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listGithubRepos } from '../../actions/profileAction';
import AlertMessage from '../layout/AlertMessage';
import GithubItem from './GithubItem';

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGithubRepos(username));
  }, [dispatch, username]);

  const profileGithub = useSelector((state) => state.profileGithub);
  const { error: errorGithubRepos, github } = profileGithub;

  return (
    <>
      <section className='profile-github'>
        {errorGithubRepos && <AlertMessage variant='danger'>{errorGithubRepos}</AlertMessage>}
        <h6 className='profile-github__title'>github repos</h6>
        <div className='profile-github__list'>
          {github &&
            github.data &&
            github.data.map((repo) => <GithubItem repo={repo} key={repo.id} />)}
        </div>
      </section>
    </>
  );
};

export default ProfileGithub;
