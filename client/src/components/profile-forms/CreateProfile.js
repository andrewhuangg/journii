import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alertAction';
import { createProfile } from '../../actions/profileAction';
import Meta from '../layout/Meta';

const CreateProfile = () => {
  const dispatch = useDispatch();

  const [username, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [github, setGithub] = useState('');
  const [youtube, setYoutube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [displaySocial, toggleSocial] = useState(false);

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
      dispatch(setAlert('create profile success', 'success'));
      window.location.pathname = '/dashboard';
    });
  };

  return (
    <div className='cre-profile'>
      <Meta title='journii | Create Your Profile' />
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
              maxLength='30'
              required
            />
          </div>
          <div className='cre-profile__form-control'>
            <input
              className='cre-profile__form-input'
              type='text'
              placeholder='Website - https://example.com'
              value={website}
              pattern='https://.*'
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
                  placeholder='Twitter Url - https://twitter.com'
                  pattern='https://.*'
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className='cre-profile__form-control'>
                <input
                  className='cre-profile__form-input'
                  type='text'
                  placeholder='Facebook Url - https://facebook.com'
                  pattern='https://.*'
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
              <div className='cre-profile__form-control'>
                <input
                  className='cre-profile__form-input'
                  type='text'
                  placeholder='Youtube Url - https://youtube.com'
                  pattern='https://.*'
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
              </div>
              <div className='cre-profile__form-control'>
                <input
                  className='cre-profile__form-input'
                  type='text'
                  placeholder='Linkedin Url - https://linkedin.com'
                  pattern='https://.*'
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div className='cre-profile__form-control'>
                <input
                  className='cre-profile__form-input'
                  type='text'
                  placeholder='Instagram Url - https://instagram.com'
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  pattern='https://.*'
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
