import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    from: '',
    to: '',
    current: false,
    address: '',
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { title, company, from, to, current, address, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <>
      <h1>Add An Experience</h1>
      <p>Add any developer/programming positions that you have had in the past</p>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input type='text' placeholder='Address' name='address' value={address} onChange={(e) => onChange(e)} />
        </div>
        <div>
          <h4>From Date</h4>
          <input type='date' name='from' value={from} onChange={(e) => onChange(e)} />
        </div>
        <div>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        {!toDateDisabled && (
          <>
            <div>
              <h4>To Date</h4>
              <input type='date' name='to' value={to} onChange={(e) => onChange(e)} />
            </div>
          </>
        )}
        <div>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' />
        <Link to='/dashboard'>Go Back</Link>
      </form>
    </>
  );
};

export default connect(null, { addExperience })(withRouter(AddExperience));
