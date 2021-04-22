import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProfiles } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import ProfileItem from './ProfileItem';
import Meta from '../layout/Meta';

const ProfileList = () => {
  const dispatch = useDispatch();

  const profileList = useSelector((state) => state.profiles.profileList);
  const { profiles, loading } = profileList;

  useEffect(() => {
    dispatch(listProfiles());
  }, [dispatch]);

  return (
    <>
      {!loading && (
        <section className='profile-list container'>
          <Meta title='journii | Profiles' />
          <h1 className='profile-list__header'>Profiles</h1>
          <section className='profile-list__grid'>
            {profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} loading={loading} />
            ))}
          </section>
        </section>
      )}
    </>
  );
};

export default ProfileList;
