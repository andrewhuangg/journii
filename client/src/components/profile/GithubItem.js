import React from 'react';

const GithubItem = ({
  repo: { html_url, description, stargazers_count, watchers_count, forks_count, name },
}) => {
  return (
    <div className='profile-github__item'>
      <div className='profile-github__header'>
        <a
          href={html_url}
          target='_blank'
          rel='noopener noreferrer'
          className='profile-github__link'
        >
          {name}
        </a>
        <div className='profile-github__description'>{description}</div>
      </div>
      <div className='profile-github__stats'>
        <ul className='profile-github__ul'>
          <li className='badge badge-primary'>Stars: {stargazers_count}</li>
          <li className='badge badge-dark'>Watchers: {watchers_count}</li>
          <li className='badge badge-light'>Forks: {forks_count}</li>
        </ul>
      </div>
    </div>
  );
};

export default GithubItem;
