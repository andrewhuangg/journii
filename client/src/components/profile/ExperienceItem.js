import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ExperienceItem = ({
  deleteHandler,
  exp: { title, company, from, to, address, description, _id },
  currentUserId,
  profileOwner,
}) => {
  return (
    <>
      <div>
        <h6>{title}</h6>
        <p>{company}</p>
        <div>
          <Moment format='MM/DD/YYYY'>{from}</Moment> -{' '}
          {to === null ? ' Now' : <Moment format='MM/DD/YYYY'>{to}</Moment>}
        </div>
        <p>{address}</p>
        <p>{description}</p>
        {currentUserId === profileOwner._id && (
          <Button onClick={() => deleteHandler(_id)}>
            <i className='fas fa-trash'></i>
          </Button>
        )}
      </div>
    </>
  );
};

export default ExperienceItem;
