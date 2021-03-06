import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../actions/profileAction';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { setAlert } from '../../actions/alertAction';

const ExperienceItem = ({
  exp: { title, company, from, to, address, description, _id },
  currentUserId,
  profileOwner,
}) => {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteExperience(id)).then((data) => {
      if (data) dispatch(setAlert('experience deleted', 'success'));
    });
  };

  return (
    <>
      <div className='profile-experience__item'>
        <div className='profile-experience__header'>
          <h6 className='profile-experience__item-title'>{title}</h6>
          <div className='profile-experience__company-info'>
            <div className='profile-experience__company'>{company}</div>
            <span></span>
            <Moment format='MM/DD/YYYY' className='profile-experience__date'>
              {from}
            </Moment>
            <span></span>
            {to === null ? (
              <p>Now</p>
            ) : (
              <Moment format='MM/DD/YYYY' className='profile-experience__date'>
                {to}
              </Moment>
            )}
          </div>
        </div>
        <div className='profile-experience__description'>{description}</div>
        <div className='profile-experience__address'>{address}</div>
        {currentUserId === profileOwner._id && (
          <div className='profile-experience__btn-wrapper'>
            <button className='profile-experience__btn' onClick={() => deleteHandler(_id)}>
              <i className='fas fa-trash'></i>
            </button>
            <Link to={`/updateexperience/${_id}`} className='profile-experience__update'>
              Update
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ExperienceItem;
