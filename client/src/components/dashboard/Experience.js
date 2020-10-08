import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        {exp.to === null ? 'Current' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
      </td>
      <td>
        <button onClick={() => deleteExperience(exp._id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2>Experience Credentials</h2>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

export default connect(null, { deleteExperience })(Experience);