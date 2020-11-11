import React from 'react';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const ProjectItem = ({
  deleteHandler,
  proj: { name, description, technologies, features, from, to, website, _id },
  currentUserId,
  profileOwner,
}) => {
  return (
    <>
      <div>
        <h6>{name}</h6>
        <p>{website}</p>
        <div>
          <Moment format='MM/DD/YYYY'>{from}</Moment> -{' '}
          {to === null ? ' Now' : <Moment format='MM/DD/YYYY'>{to}</Moment>}
        </div>
        <p>{description}</p>
        <div>
          <ul>
            {technologies.map((tech) => (
              <li key={uuidv4()}>{tech}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {features.map((feat) => (
              <li key={uuidv4()}>{feat}</li>
            ))}
          </ul>
        </div>
        {currentUserId === profileOwner._id && (
          <Button onClick={() => deleteHandler(_id)}>
            <i className='fas fa-trash'></i>
          </Button>
        )}
      </div>
    </>
  );
};

export default ProjectItem;
