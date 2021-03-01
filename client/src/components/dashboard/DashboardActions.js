import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
      <Link to='/editprofile'>Edit Profile </Link>
      <Link to='/addexperience'>Add Experience </Link>
    </div>
  );
};

export default DashboardActions;

// add navbar options here
