import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../../actions/profileAction';
import { followProfile, unfollowProfile, getFollowedProfiles } from '../../actions/profileAction';
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

  const profileFollows = useSelector((state) => state.profileFollows);
  const {
    success: successFollows,
    loading: loadingFollows,
    error: errorFollows,
    follows,
  } = profileFollows;

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (successFollows) setMessage(null);
    dispatch(getProfileDetails(match.params.id));
  }, [dispatch, match, successProject, successExperience, follows, successFollows]);

  const profileFollowHandler = (profile, id) => {
    dispatch(followProfile(profile, id));
    if (errorFollows) setMessage(errorFollows);
  };

  const profileUnfollowHandler = (profile, id) => {
    dispatch(unfollowProfile(profile, id));
    if (errorFollows) setMessage(errorFollows);
  };

  return (
    <>
      <Link to='/profiles'>Back to Profiles</Link>
      {loadingDetails && <Spinner />}
      {loadingFollows && <Spinner />}
      {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
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
      <div>
        <div>
          Followers
          {profile.follows && profile.follows > 0 && <span>{profile.follows.length}</span>}
        </div>
        {profile.user && userInfo.id !== profile.user._id && (
          <>
            <div onClick={() => profileFollowHandler(profile, profile._id)}>follow profile</div>
            <div onClick={() => profileUnfollowHandler(profile, profile._id)}>unfollow profile</div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileShow;
