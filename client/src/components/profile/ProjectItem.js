import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { deleteProject } from '../../actions/profileAction';
import { setAlert } from '../../actions/alertAction';
import Moment from 'react-moment';

const ProjectItem = ({
  proj: { name, description, technologies, features, from, to, website, _id },
  currentUserId,
  profileOwner,
}) => {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteProject(id)).then((data) => {
      if (data) dispatch(setAlert('project deleted', 'success'));
    });
  };
  return (
    <>
      <div className='profile-project__item'>
        <div className='profile-project__header'>
          <h6 className='profile-project__name'>{name}</h6>
          <div className='profile-project__info'>
            <Moment format='MM/DD/YYYY' className='profile-project__date'>
              {from}
            </Moment>
            <span></span>
            {to === null ? (
              <p>Now</p>
            ) : (
              <Moment format='MM/DD/YYYY' className='profile-project__date'>
                {to}
              </Moment>
            )}
          </div>
        </div>
        <div className='profile-project__website'>{website}</div>
        <div className='profile-project__description'>{description}</div>
        <div className='profile-project__body'>
          <ul className='profile-project__ul'>
            {technologies.map((tech) => (
              <li className='profile-project__li' key={uuidv4()}>
                <span></span>
                {tech}
              </li>
            ))}
          </ul>
          <ul className='profile-project__ul'>
            {features.map((feat) => (
              <li className='profile-project__li' key={uuidv4()}>
                <span></span>
                {feat}
              </li>
            ))}
          </ul>
        </div>
        {currentUserId === profileOwner._id && (
          <div className='profile-project__btn-wrapper'>
            <button onClick={() => deleteHandler(_id)} className='profile-project__btn'>
              <i className='fas fa-trash'></i>
            </button>
            <Link to={`/updateproject/${_id}`} className='profile-project__update'>
              Update
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectItem;
