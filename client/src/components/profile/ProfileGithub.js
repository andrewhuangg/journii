import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listGithubRepos } from '../../actions/profileAction';
import AlertMessage from '../layout/AlertMessage';
import GithubItem from './GithubItem';

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) dispatch(listGithubRepos(username));
  }, [dispatch, username]);

  const github = useSelector((state) => state.profiles.profile);
  const { githubList } = github;

  return (
    <>
      <section className='profile-github'>
        <h6 className='profile-github__title'>Github Repos</h6>
        <div className='profile-github__list'>
          {githubList.map((repo) => (
            <GithubItem repo={repo} key={repo.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProfileGithub;
