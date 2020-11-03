import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../../actions/profileAction';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileGithub from './ProfileGithub';
import ProfileProject from './ProfileProject';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

const ProfileShow = ({ match }) => {
  const dispatch = useDispatch();
  const profileDetails = useSelector((state) => state.profileDetails);

  const { loading, profile, error } = profileDetails;

  useEffect(() => {
    if (!profile || !profile.bio) {
      dispatch(getProfileDetails(match.params.id));
    }
  }, [dispatch, profile, match]);

  return (
    <>
      profile show page
      <div>
        <ProfileTop profile={profile} />
      </div>
      <div>
        <ProfileAbout profile={profile} />
      </div>
      <div>
        <ProfileExperience profile={profile} />
      </div>
      <div>
        <ProfileProject profile={profile} />
      </div>
      <div>
        <ProfileGithub profile={profile} />
      </div>
    </>
  );
};

export default ProfileShow;
