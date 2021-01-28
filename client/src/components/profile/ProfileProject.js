import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../actions/profileAction';
import ProjectItem from './ProjectItem';

const ProfileProject = ({ projects, currentUserId, profileOwner }) => {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteProject(id));
  };

  return (
    <>
      <section className='profile-project'>
        <h6 className='profile-project__title'>Projects</h6>
        <div className='profile-project__list'>
          {projects &&
            projects.map((proj) => (
              <ProjectItem
                key={proj._id}
                proj={proj}
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

export default ProfileProject;
