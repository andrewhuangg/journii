import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../../actions/profileAction';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import ProfileExperience from './ProfileExperience';
import ProfileProject from './ProfileProject';

const ProfileShow = ({ match }) => {
  const dispatch = useDispatch();

  const profileDetails = useSelector((state) => state.profileDetails);
  const { loading: loadingDetails, profile, error: errorDetails } = profileDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profileExperience = useSelector((state) => state.profileExperience);
  const { success: successExperience } = profileExperience;

  const profileProject = useSelector((state) => state.profileProject);
  const { success: successProject } = profileProject;

  useEffect(() => {
    dispatch(getProfileDetails(match.params.id));
  }, [dispatch, match, successProject, successExperience]);

  return (
    <>
      <Link to='/profiles'>Back to Profiles</Link>
      {loadingDetails && <Spinner />}
      {errorDetails && <AlertMessage variant='danger'>{errorDetails}</AlertMessage>}
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
    </>
  );
};

export default ProfileShow;
