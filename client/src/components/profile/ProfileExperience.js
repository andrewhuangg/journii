import React from 'react';
import Moment from 'react-moment'

const ProfileExperience = ({ experience: { title, company, from, to, current, address, description } }) => (
  <div>
    <h3>{company}</h3>
    <h2>{title}</h2>
    <p>
      <Moment format='YYYY/MM/DD'>{from}</Moment>
       - {!to ? 
       ' Current' : 
       <Moment format='YYYY/MM/DD'>{to}</Moment>
      }
    </p>
      {description && <div>{description}</div>}
  </div>
);

export default ProfileExperience;
