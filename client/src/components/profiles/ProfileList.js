import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProfiles } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import ProfileItem from './ProfileItem';

const ProfileList = () => {
  const dispatch = useDispatch();
  const profileList = useSelector((state) => state.profileList);
  const { loading, error, profiles } = profileList;
  useEffect(() => {
    dispatch(listProfiles());
  }, [dispatch]);
  return (
    <>
      <h1>Profiles</h1>
      {loading && <Spinner />}
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
      <>
        <section className='profilesList'>
          {profiles &&
            profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)}
        </section>
      </>
    </>
  );
};

export default ProfileList;
