import React from 'react';
import ProjectItem from './ProjectItem';

const ProfileProject = ({ projects, currentUserId, profileOwner }) => {
  return (
    <>
      <section className='profile-project'>
        <h6 className='profile-project__title'>Projects</h6>
        <div className='profile-project__list'>
          {projects.map((proj) => (
            <ProjectItem
              key={proj._id}
              proj={proj}
              currentUserId={currentUserId}
              profileOwner={profileOwner}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProfileProject;
