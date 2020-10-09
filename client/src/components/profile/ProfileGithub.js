import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getGithubRepos} from '../../actions/profile'

const ProfileGithub = ({username, repos, getGithubRepos}) => {

  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos])

  return (
    <div>
      <h2>Github Repos</h2>
      {!repos ? 
        <Spinner /> :
        (repos.data && repos.data.map(repo => (
          <div key={repo.id}>
            <div> 
              <h4>
                <a 
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li>
                  Stars: {repo.stargazers_cunt}
                </li>
                <li>
                  Watchers: {repo.watchers_count}
                </li>
                <li>
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        )))
      }
    </div>
  )
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub)
