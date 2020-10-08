import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { editProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, editProfile, getCurrentProfile, history, user }) => {
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
  });

  const [displaySocial, toggleSocial] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      bio: loading || !profile.data.bio ? '' : profile.data.bio,
      address: loading || !profile.data.location ? '' : profile.data.location.formattedAddress,
      website: loading || !profile.data.website ? '' : profile.data.website,
      company: loading || !profile.data.company ? '' : profile.data.company,
      github: loading || !profile.data.github ? '' : profile.data.github,
      technologies: loading || !profile.data.technologies ? '' : profile.data.technologies.join(','),
      features: loading || !profile.data.features ? '' : profile.data.features.join(','),
      youtube: loading || !profile.data.social || !profile.data.social.youtube ? '' : profile.data.social.youtube,
      facebook: loading || !profile.data.social || !profile.data.social.facebook ? '' : profile.data.social.facebook,
      twitter: loading || !profile.data.social || !profile.data.social.twitter ? '' : profile.data.social.twitter,
      linkedin: loading || !profile.data.social || !profile.data.social.linkedin ? '' : profile.data.social.linkedin,
      instagram: loading || !profile.data.social || !profile.data.social.instagram ? '' : profile.data.social.instagram,
    });
  }, [loading, getCurrentProfile]);

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
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const id = profile.data._id;
    editProfile(formData, id);
  };

  return (
    <>
      <h1>Edit Your Profile</h1>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input type='text' placeholder='Company' name='company' value={company} onChange={(e) => onChange(e)} />
          <small>Could be your own company or one you work for</small>
        </div>
        <div>
          <input type='text' placeholder='Website' name='website' value={website} onChange={(e) => onChange(e)} />
          <small>Could be your own or a company website</small>
        </div>
        <div>
          <input type='text' placeholder='Address' name='address' value={address} onChange={(e) => onChange(e)} />
          <small>Could be your own or your company address (eg. 103 john st, oakland, california, 96213)</small>
        </div>
        <div>
          <input
            type='text'
            placeholder='* Technologies'
            name='technologies'
            value={technologies}
            onChange={(e) => onChange(e)}
          />
          <small>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div>
          <input type='text' placeholder='* Features' name='features' value={features} onChange={(e) => onChange(e)} />
          <small>
            Please use comma separated values (eg. Create Follow and Unfollow API, Users Create Posts, Like a Post)
          </small>
        </div>
        <div>
          <input type='text' placeholder='Github Username' name='github' value={github} onChange={(e) => onChange(e)} />
          <small>If you want your latest repos and a Github link, include your username</small>
        </div>
        <div>
          <textarea
            placeholder='A short bio of yourself'
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
  profile: state.profile,
});

export default connect(mapStateToProps, {
  editProfile,
  getCurrentProfile,
})(withRouter(EditProfile));
