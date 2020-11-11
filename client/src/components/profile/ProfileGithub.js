import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listGithubRepos } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listGithubRepos(username));
  }, [dispatch]);
  const profileGithub = useSelector((state) => state.profileGithub);
  const { loading: loadingGithubRepos, error: errorGithubRepos, github } = profileGithub;
  console.log(github);

  return (
    <>
      <h2>github repos</h2>
      {loadingGithubRepos && <Spinner />}
      {errorGithubRepos && <AlertMessage variant='danger'>{errorGithubRepos}</AlertMessage>}
      {github &&
        github.data &&
        github.data.map((repo) => (
          <div key={repo.id}>
            <div>
              <h4>
                <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>Stars: {repo.stargazers_count}</li>
                <li className='badge badge-dark'>Watchers: {repo.watchers_count}</li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProfileGithub;
