import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateProfile, getOwnProfileDetails } from '../../actions/profileAction';

const EditProfile = () => {
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

  const profileDetails = useSelector((state) => state.profiles.profile);
  const { profile } = profileDetails;

  useEffect(() => {
    dispatch(getOwnProfileDetails()).then((data) => {
      setUserName(data.username || '');
      setBio(data.bio || '');
      setWebsite(data.website || '');
      setGithub(data.github || '');
      setAddress(
        !data.location || !data.location.formattedAddress ? '' : data.location.formattedAddress
      );
      setYoutube(!data.social || !data.social.youtube ? '' : data.social.youtube);
      setTwitter(!data.social || !data.social.twitter ? '' : data.social.twitter);
      setFacebook(!data.social || !data.social.facebook ? '' : data.social.facebook);
      setLinkedin(!data.social || !data.social.linkedin ? '' : data.social.linkedin);
      setInstagram(!data.social || !data.social.instagram ? '' : data.social.instagram);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (bio.length === 0) {
      setMessage('Bio cannot be empty');
    } else {
      setMessage(null);
      dispatch(
        updateProfile(
          {
            username,
            bio,
            website,
            address,
            github,
            youtube,
            twitter,
            facebook,
            linkedin,
            instagram,
          },
          profile._id
        )
      );
    }
  };

  return (
    <>
      <div className='editProfile'>
        <div className='editProfile__wrapper'>
          <form className='editProfile__form' onSubmit={submitHandler}>
            <h3>Update Profile</h3>
            <div className='editProfile__form-control'>
              <input
                className='editProfile__form-input'
                type='text'
                value={username}
                placeholder='Username'
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className='editProfile__form-control'>
              <input
                className='editProfile__form-input'
                type='text'
                value={website}
                placeholder='Website'
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className='editProfile__form-control'>
              <input
                className='editProfile__form-input'
                type='text'
                value={address}
                placeholder='Address'
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='editProfile__form-control'>
              <input
                className='editProfile__form-input'
                type='text'
                value={github}
                placeholder='Github Username'
                onChange={(e) => setGithub(e.target.value)}
              />
              <small>
                If you want your latest repos and a Github link, include your username. Your
                username can be found here "github.com/YOUR_USERNAME"
              </small>
            </div>
            <div className='editProfile__form-control'>
              <textarea
                className='editProfile__form-textarea'
                type='text'
                value={bio}
                placeholder='Bio'
                onChange={(e) => setBio(e.target.value)}
              />
              <small>Tell us a bit about yourself</small>
            </div>

            {displaySocial && (
              <>
                <div className='editProfile__form-control'>
                  <input
                    className='editProfile__form-input'
                    type='text'
                    value={twitter}
                    placeholder='Twitter Url'
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div className='editProfile__form-control'>
                  <input
                    className='editProfile__form-input'
                    type='text'
                    value={facebook}
                    placeholder='Facebook Url'
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
                <div className='editProfile__form-control'>
                  <input
                    className='editProfile__form-input'
                    type='text'
                    value={youtube}
                    placeholder='Youtube Url'
                    onChange={(e) => setYoutube(e.target.value)}
                  />
                </div>
                <div className='editProfile__form-control'>
                  <input
                    className='editProfile__form-input'
                    type='text'
                    value={linkedin}
                    placeholder='LinkedIn Url'
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
                <div className='editProfile__form-control'>
                  <input
                    className='editProfile__form-input'
                    type='text'
                    value={instagram}
                    placeholder='Instagram Url'
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
              </>
            )}
            <button className='editProfile__form-btn'>Update</button>
          </form>
          <button className='editProfile__social-btn' onClick={() => toggleSocial(!displaySocial)}>
            Update Social
          </button>
          <label>Optional</label>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
