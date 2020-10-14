import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profile';
import axios from 'axios';
import Spinner from '../layout/Spinner';

const CreateProfile = ({ createProfile, history, user }) => {
  const [formData, setFormData] = useState({
    bio: '',
    address: '',
    website: '',
    company: '',
    github: '',
    technologies: '',
    features: '',
    facebook: '',
    youtube: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    image: '',
  });

  const [displaySocial, toggleSocial] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageData, setImage] = useState('');

  const {
    bio,
    address,
    website,
    company,
    github,
    technologies,
    features,
    facebook,
    youtube,
    twitter,
    linkedin,
    instagram,
    image,
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, user.data._id);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const imageForm = new FormData();
    imageForm.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/v1/upload', imageForm, config);
      setImage(data);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  return (
    <>
      <h1>Create Your Profile</h1>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type='text'
            placeholder='enter image url'
            value={imageData}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type='file'
            id='image-file'
            label='Choose File'
            name='image'
            value={image}
            onChange={uploadFileHandler}
          />
          {uploading && <Spinner />}
        </div>
        <div>
          <input type='text' placeholder='Company' onChange={(e) => onChange(e)} />
          <small>Could be your own company or one you work for</small>
        </div>
        <div>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small>Could be your own or a company website</small>
        </div>
        <div>
          <input
            type='text'
            placeholder='Address'
            name='address'
            value={address}
            onChange={(e) => onChange(e)}
          />
          <small>
            Could be your own or your company address (eg. 103 john st, oakland, california, 96213)
          </small>
        </div>
        <div>
          <input
            type='text'
            placeholder='Technologies'
            name='technologies'
            value={technologies}
            onChange={(e) => onChange(e)}
          />
          <small>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div>
          <input
            type='text'
            placeholder='Features'
            name='features'
            value={features}
            onChange={(e) => onChange(e)}
          />
          <small>
            Please use comma separated values (eg. Create Follow and Unfollow API, Users Create
            Posts, Like a Post)
          </small>
        </div>
        <div>
          <input
            type='text'
            placeholder='Github Username'
            name='github'
            value={github}
            onChange={(e) => onChange(e)}
          />
          <small>If you want your latest repos and a Github link, include your username</small>
        </div>
        <div>
          <textarea
            placeholder='* A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small>Tell us a little about yourself</small>
        </div>

        <div>
          <button onClick={() => toggleSocial(!displaySocial)} type='button'>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocial && (
          <>
            <div>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </>
        )}
        <input type='submit' />
        <Link to='/dashboard'>Go Back</Link>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
