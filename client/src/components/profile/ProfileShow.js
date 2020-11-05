import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_DETAILS_RESET } from '../../actions/types';
import {
  followProfile,
  unfollowProfile,
  getFollowedProfiles,
  getProfileDetails,
  deleteProfile,
} from '../../actions/profileAction';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import ProfileExperience from './ProfileExperience';
import ProfileProject from './ProfileProject';

const ProfileShow = ({ match, history }) => {
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

  const profileDelete = useSelector((state) => state.profileDelete);
  const { error: errorDelete, loading: loadingDelete, success: successDelete } = profileDelete;

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (successFollows) setMessage(null);
    if (successDelete) {
      dispatch({ type: PROFILE_DETAILS_RESET });
      history.push('/profiles');
    }
    dispatch(getProfileDetails(match.params.id));
  }, [dispatch, match, successProject, successExperience, successFollows, successDelete]);

  const profileFollowHandler = (profile, id) => {
    if (errorFollows) setMessage(errorFollows);
    dispatch(followProfile(profile, id));
  };

  const profileUnfollowHandler = (profile, id) => {
    if (errorFollows) setMessage(errorFollows);
    dispatch(unfollowProfile(profile, id));
  };

  const deleteHandler = (id) => {
    if (errorDelete) setMessage(errorDelete);
    dispatch(deleteProfile(id));
  };

  return (
    <>
      <Link to='/profiles'>Back to Profiles</Link>
      {loadingDetails && <Spinner />}
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
          Followers{' '}
          {profile.follows && profile.follows.length > 0 && <span>{profile.follows.length}</span>}
        </div>
        {profile.user && userInfo.id !== profile.user._id && (
          <>
            <div onClick={() => profileFollowHandler(profile, profile._id)}>follow profile</div>
            <div onClick={() => profileUnfollowHandler(profile, profile._id)}>unfollow profile</div>
          </>
        )}
      </div>
      {profile.user && userInfo.id === profile.user._id && (
        <Button onClick={() => deleteHandler(profile._id)}>
          <i className='fas fa-trash'></i>
        </Button>
      )}
    </>
  );
};

export default ProfileShow;
