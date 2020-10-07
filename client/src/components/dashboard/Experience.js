import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        {exp.to === null ? 'Current' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
      </td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  ));

  return (
    <td>
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
    </td>
  );
};

export default connect()(Experience);
