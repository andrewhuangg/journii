import React from 'react';
import ExperienceItem from './ExperienceItem';

const ProfileExperience = ({ experiences, currentUserId, profileOwner }) => {
  return (
    <>
      <section className='profile-experience'>
        <h6 className='profile-experience__title'>Experiences</h6>
        <div className='profile-experience__list'>
          {experiences.map((exp) => (
            <ExperienceItem
              key={exp._id}
              exp={exp}
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
