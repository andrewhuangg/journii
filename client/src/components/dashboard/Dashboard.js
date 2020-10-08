import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import { deleteAccount } from '../../actions/auth';

const Dashboard = ({ auth: { user }, profile: { profile, loading }, getCurrentProfile, deleteAccount }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1>Dashboard</h1>
      <p>Welcome {user && user.data.name}</p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.data.experience} />

          <div>
            <button onClick={() => deleteAccount(user.data._id)}>Delete Account</button>
          </div>
        </>
      ) : (
        <Experience>
          <p>you have not yet setup a profile, please add some info</p>
          <Link to='/createprofile'>Create Profile</Link>
        </Experience>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
