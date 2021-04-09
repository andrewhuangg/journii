import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProject, getOwnProfileDetails } from '../../actions/profileAction';

const AddProject = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [features, setFeatures] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [website, setWebsite] = useState('');

  const [message, setMessage] = useState(null);
  const [toDateDisabled, toggleDisabled] = useState(false);

  const profileDetails = useSelector((state) => state.profiles.profile);
  const { profile, loading } = profileDetails;

  useEffect(() => {
    dispatch(getOwnProfileDetails());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addProject({
        name,
        description,
        from,
        to,
        current,
        website,
        features,
        technologies,
      })
    ).then(() => {
      history.push(`/profile/${profile.user.id}`);
    });
  };

  return (
    <>
      {!loading && (
        <div className='addProject'>
          <div className='addProject__wrapper'>
            <form className='addProject__form' onSubmit={submitHandler}>
              <h3>Add Project</h3>
              <small>* = required field</small>

              <div className='addProject__form-control'>
                <input
                  className='addProject__form-input'
                  type='text'
                  placeholder='* Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className='addProject__form-control'>
                <input
                  className='addProject__form-input'
                  type='text'
                  placeholder='Project Technologies - Comma separated, e.g. MongoDb, ExpressJs, ReactJs, NodeJs, etc,.'
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                />
              </div>

              <div className='addProject__form-control'>
                <input
                  className='addProject__form-input'
                  type='text'
                  placeholder='Project Features - Comma separated, e.g. Basic CRUD, Follow Profiles, Like Posts, etc,.'
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                />
              </div>

              <div className='addProject__form-control-date'>
                <div className='addProject__date-container'>
                  <input
                    className='addProject__input-checkbox'
                    type='checkbox'
                    value={current}
                    onChange={(e) => {
                      setCurrent(!current);
                      toggleDisabled(!toDateDisabled);
                    }}
                  />
                  <label>Project In Progress</label>
                </div>

                <div className='addProject__date-container'>
                  <label>{current ? '* Start' : '* From'}</label>
                  <input
                    className='addProject__form-input-date'
                    type='date'
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  />
                </div>

                {!toDateDisabled && (
                  <div className='addProject__date-container'>
                    <label>to</label>
                    <input
                      className='addProject__form-input-date'
                      type='date'
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      disabled={toDateDisabled ? 'disabled' : ''}
                    />
                  </div>
                )}
              </div>

              <div className='addProject__form-control'>
                <input
                  className='addProject__form-input'
                  type='text'
                  value={website}
                  placeholder=' Project Website'
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className='addProject__form-control'>
                <textarea
                  className='addProject__form-textarea'
                  value={description}
                  placeholder=' Project Description'
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength='500'
                />
              </div>

              <button className='addProject__btn'>Add Project</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProject;
