import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../../actions/profileAction';
import { getUserDetails, getMe } from '../../actions/authAction';
import ProfileExperience from './ProfileExperience';
import ProfileProject from './ProfileProject';
import ProfileGithub from './ProfileGithub';
import ProfileTop from './ProfileTop';
import Spinner from '../layout/Spinner';
import Meta from '../layout/Meta';
import AlertMessage from '../layout/AlertMessage';

const ProfileShow = ({ match, history }) => {
  const dispatch = useDispatch();
  const matchParamsId = match.params.id;

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

  const userDetails = useSelector((state) => state.auth.userShow);
  const { user } = userDetails;

  const profileShow = useSelector((state) => state.profiles.profile);
  const { profile, loading } = profileShow;

  useEffect(() => {
    dispatch(getProfileDetails(matchParamsId));
    dispatch(getUserDetails(matchParamsId));
    dispatch(getMe());
  }, [dispatch, matchParamsId, history]);

  return (
    <>
      {!loading && profile ? (
        <div className='profileShow container'>
          <Meta title='journii | Profile' />
          <AlertMessage />
          <ProfileTop
            profile={profile}
            matchParamsId={matchParamsId}
            loggedInUser={userInfo}
            profileUser={user}
            loading={loading}
            history={history}
          />
          {profile.github && <ProfileGithub username={profile.github} />}
          <ProfileExperience
            experiences={profile.experiences}
            currentUserId={userInfo.id}
            profileOwner={profile.user}
          />
          <ProfileProject
            projects={profile.projects}
            currentUserId={userInfo.id}
            profileOwner={profile.user}
          />
        </div>
      ) : (
        <>
          <Spinner />
          <AlertMessage />
        </>
      )}
    </>
  );
};

export default ProfileShow;
