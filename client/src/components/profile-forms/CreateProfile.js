import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createProfile } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

const CreateProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [github, setGithub] = useState('');
  const [youtube, setYoutube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');

  const [message, setMessage] = useState(null);
  const [displaySocial, toggleSocial] = useState(false);

  const profileShow = useSelector((state) => state.profiles.profile);
  const { profile, loading } = profileShow;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProfile({
        username,
        bio,
        website,
        address,
        github,
        youtube,
        linkedin,
        twitter,
        facebook,
        instagram,
      })
    ).then(() => {
      history.push('/dashboard');
    });
  };

  // if (profile) return <Redirect to='/dashboard' />;

  return (
    <div className='cre-profile'>
      <div className='cre-profile__wrapper'>
        <form onSubmit={submitHandler} className='cre-profile__form'>
          <h3>Create Your Profile</h3>
          <div className='cre-profile__form-control'>
            <input
              className='cre-profile__form-input'
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className='cre-profile__form-control'>
            <input
              className='cre-profile__form-input'
              type='text'
              placeholder='Website'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className='cre-profile__form-control'>
            <input
              className='cre-profile__form-input'
              type='text'
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='cre-profile__form-control'>
            <input
              className='cre-profile__form-input'
              type='text'
              placeholder='Github Username'
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
            <small>
              If you want your latest repos and a Github link, include your username. Your username
              can be found here "github.com/YOUR_USERNAME"
            </small>
          </div>
          <div className='cre-profile__form-control'>
            <textarea
              className='cre-profile__form-textarea'
              maxLength='500'
              placeholder='Bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
            <small>Tell us a bit about yourself</small>
          </div>
          {displaySocial && (
            <>
              <div className='cre-profile__form-control'>
                <input
                  className='cre-profile__form-input'
                  type='text'
                  placeholder='Twitter Url'
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className='cre-profile__form-control'>
                <input
                  className='cre-profile__form-input'
                  type='text'
                  placeholder='Facebook Url'
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
              <div className='cre-profile__form-control'>
                <input
                  className='cre-profile__form-input'
                  type='text'
                  placeholder='Youtube Url'
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
              </div>
              <div className='cre-profile__form-control'>
                <input
                  className='cre-profile__form-input'
                  type='text'
                  placeholder='Linkedin Url'
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div className='cre-profile__form-control'>
                <input
                  className='cre-profile__form-input'
                  type='text'
                  placeholder='Instagram Url'
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
            </>
          )}
          <button className='cre-profile__form-btn'>Create</button>
        </form>
        <button className='cre-profile__social-btn' onClick={() => toggleSocial(!displaySocial)}>
          Add Social
        </button>
        <label>Optional</label>
      </div>
    </div>
  );
};

export default CreateProfile;
