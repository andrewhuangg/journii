import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profile';

const AddExperience = () => {
  return <div></div>;
};
import { connect } from 'react-redux';

export default connect(null, { addExperience })(AddExperience);
