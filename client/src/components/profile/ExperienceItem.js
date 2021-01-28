import React from 'react';
import Moment from 'react-moment';

const ExperienceItem = ({
  deleteHandler,
  exp: { title, company, from, to, address, description, _id },
  currentUserId,
  profileOwner,
}) => {
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
          <button className='profile-experience__btn' onClick={() => deleteHandler(_id)}>
            <i className='fas fa-trash'></i>
          </button>
        )}
      </div>
    </>
  );
};

export default ExperienceItem;
