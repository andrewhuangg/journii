import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileByUserId } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';

const Profile = ({ getProfileByUserId, profile: { profile, loading }, auth, match }) => {
  useEffect(() => {
    getProfileByUserId(match.params.id);
  }, [getProfileByUserId, match.params.id]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles'>Back to profiles</Link>
          {auth.isAuthenticated && auth.loading === false && auth.user.data._id === profile.data.user._id && (
            <Link to='/editprofile'>Edit Profile</Link>
          )}
          <div>
            grid
            <ProfileTop profile={profile.data} />
            <ProfileAbout profile={profile.data} />
            <div>
              <h2>Experience</h2>
              {profile.data.experience.length > 0 ? (
                <>
                  {profile.data.experience.map((exp) => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </>
              ) : (
                <h4>No Credentials</h4>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByUserId })(Profile);
