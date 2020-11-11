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
    if (!profile.user || profile.user._id !== userInfo.id) {
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
  }, [dispatch, history, successUpdate, profile, userInfo.id]);

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
      <Row>
        <Col md={6}>
          <h2>Update Profile</h2>
          {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
          {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
          {successUpdate && <AlertMessage variant='success'>Profile Updated</AlertMessage>}
          {loading && <Spinner />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='website'>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type='text'
                placeholder='Website'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='github'>
              <Form.Label>Github</Form.Label>
              <Form.Control
                type='text'
                placeholder='Github Username'
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              ></Form.Control>
              <Form.Text id='githubHelpBlock' muted>
                If you want your latest repos and a Github link, include your username. Your
                username can be found here "github.com/YOUR_USERNAME"
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='bio'>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                placeholder='* A short bio of yourself'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></Form.Control>
              <Form.Text id='bioHelpBlock' muted>
                Tell us a bit about yourself
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='displaySocial'>
              <Button onClick={() => toggleSocial(!displaySocial)}>
                Update Social Network Links
              </Button>
              <Form.Label>Optional</Form.Label>
            </Form.Group>

            {displaySocial && (
              <>
                <Form.Group controlId='twitter'>
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Twitter URL'
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='facebook'>
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Facebook URL'
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='youtube'>
                  <Form.Label>Youtube</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='YouTube URL'
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='linkedin'>
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Linkedin URL'
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='instagram'>
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Instagram URL'
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </>
            )}
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
          <Button onClick={(e) => history.push('/dashboard')}>Back to dashboard</Button>
        </Col>
      </Row>
    </>
  );
};

export default EditProfile;
