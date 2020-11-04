import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../actions/profileAction';
import ExperienceItem from './ExperienceItem';

const ProfileExperience = ({ experiences, currentUserId, profileOwner }) => {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteExperience(id));
  };

  return (
    <>
      <h2>Experiences</h2>
      <div>
        {experiences &&
          experiences.map((exp) => (
            <ExperienceItem
              key={exp._id}
              exp={exp}
              deleteHandler={deleteHandler}
              currentUserId={currentUserId}
              profileOwner={profileOwner}
            />
          ))}
      </div>
    </>
  );
};

export default ProfileExperience;
