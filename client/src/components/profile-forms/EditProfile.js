import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import { updateProfile, getOwnProfileDetails } from '../../actions/profileAction';
import { PROFILE_UPDATE_RESET } from '../../actions/types';

const EditProfile = ({ history }) => {
  const dispatch = useDispatch();

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

  const profileDetails = useSelector((state) => state.profileDetails);
  const { loading, profile, error } = profileDetails;

  const profileUpdate = useSelector((state) => state.profileUpdate);
  const { success: successUpdate } = profileUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROFILE_UPDATE_RESET });
      history.push(`/profiles`);
    }
  }, [successUpdate]);

  useEffect(() => {
    if (!profile) {
      history.push('/createprofile');
    } else if (!profile.user || profile.user._id !== userInfo.id) {
      dispatch(getOwnProfileDetails());
    } else {
      setUserName(profile.username);
      setBio(profile.bio);
      setWebsite(profile.website);
      setGithub(profile.github);
      setAddress(
        !profile.location || !profile.location.formattedAddress
          ? ''
          : profile.location.formattedAddress
      );
      setYoutube(!profile.social || !profile.social.youtube ? '' : profile.social.youtube);
      setTwitter(!profile.social || !profile.social.twitter ? '' : profile.social.twitter);
      setFacebook(!profile.social || !profile.social.facebook ? '' : profile.social.facebook);
      setLinkedin(!profile.social || !profile.social.linkedin ? '' : profile.social.linkedin);
      setInstagram(!profile.social || !profile.social.instagram ? '' : profile.social.instagram);
    }
  }, [dispatch, history, profile, userInfo.id]);

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
        {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
        {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
        {successUpdate && <AlertMessage variant='success'>Profile Updated</AlertMessage>}
        {loading && <Spinner />}
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
