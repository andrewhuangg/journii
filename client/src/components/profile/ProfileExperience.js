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
      <section className='profile-experience'>
        <h6 className='profile-experience__title'>Experience</h6>
        <div className='profile-experience__list'>
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
      </section>
    </>
  );
};

export default ProfileExperience;
