import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import { deleteAccount } from '../../actions/authAction';

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome {user && user.name}</p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />

          <div>
            <button onClick={() => deleteAccount(user._id)}>Delete Account</button>
          </div>
        </>
      ) : (
        <>
          <p>you have not yet setup a profile, please add some info</p>
          <Link to='/createprofile'>Create Profile</Link>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
