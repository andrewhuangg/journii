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
      <h2>Projects</h2>
      <div>
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
    </>
  );
};

export default ProfileProject;
