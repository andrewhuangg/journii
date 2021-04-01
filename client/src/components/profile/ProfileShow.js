import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../../actions/profileAction';
import { getUserDetails } from '../../actions/authAction';
import AlertMessage from '../layout/AlertMessage';
import ProfileExperience from './ProfileExperience';
import ProfileProject from './ProfileProject';
import ProfileGithub from './ProfileGithub';
import ProfileTop from './ProfileTop';

const ProfileShow = ({ match }) => {
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

  const userDetails = useSelector((state) => state.auth.userShow);
  const { user } = userDetails;

  const profileShow = useSelector((state) => state.profiles.profile);
  const { profile } = profileShow;

  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(getProfileDetails(match.params.id)).then((data) => {
      dispatch(getUserDetails(data.user.id));
    });
  }, []);

  return (
    <>
      <div className='profileShow container'>
        <ProfileTop profile={profile} loggedInUser={userInfo} profileUser={user} />
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
    </>
  );
};

export default ProfileShow;
