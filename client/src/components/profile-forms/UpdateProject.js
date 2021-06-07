import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProject, getProject, getOwnProfileDetails } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import Meta from '../layout/Meta';
import AlertMessage from '../layout/AlertMessage';
import { setAlert } from '../../actions/alertAction';

const UpdateProject = ({ history, match }) => {
  const dispatch = useDispatch();
  const projectId = match.params.id;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [features, setFeatures] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [website, setWebsite] = useState('');

  const [toDateDisabled, toggleDisabled] = useState(false);

  const profileDetails = useSelector((state) => state.profiles.profile);
  const { profile, loading } = profileDetails;

  const formatDate = (date) => {
    const preFormatDate = date.split('T')[0];
    let [year, month, day] = preFormatDate.split('-');
    const postFormatDate = `${year}-${month}-${day}`;
    return postFormatDate;
  };

  useEffect(() => {
    dispatch(getOwnProfileDetails()).then((data) => {
      if (data) {
        dispatch(getProject(data._id, projectId)).then((proj) => {
          if (proj) {
            setName(proj.name || '');
            setDescription(proj.description || '');
            setWebsite(proj.website || '');

            if (proj.technologies.length > 0) setTechnologies(proj.technologies);
            if (proj.features.length > 0) setFeatures(proj.features);

            let from;
            if (proj.from) from = formatDate(proj.from);
            setFrom(from || '');

            let to;
            if (proj.to) to = formatDate(proj.to);
            setTo(to || '');

            if (proj.current) {
              setCurrent(proj.current || '');
              toggleDisabled(!toDateDisabled);
              document.getElementById('checked').checked = true;
            } else {
              document.getElementById('checked').checked = false;
            }
          }
        });
      }
    });
  }, [dispatch, projectId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProject(
        {
          name,
          description,
          from,
          to,
          current,
          website,
          features,
          technologies,
        },
        profile._id,
        projectId
      )
    ).then((data) => {
      dispatch(setAlert('update project success', 'success'));
      if (data) history.push(`/profile/${profile.user.id}`);
    });
  };

  return (
    <>
      {!loading ? (
        <div className='updateProject'>
          <Meta title='journii | Update Project' />
          <AlertMessage />
          <div className='updateProject__wrapper'>
            <form className='updateProject__form' onSubmit={submitHandler}>
              <h3>Update Project</h3>
              <small>* = required field</small>

              <div className='updateProject__form-control'>
                <input
                  className='updateProject__form-input'
                  type='text'
                  placeholder='* Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className='updateProject__form-control'>
                <input
                  className='updateProject__form-input'
                  type='text'
                  placeholder='Project Technologies - Comma separated, e.g. MongoDb, ExpressJs, ReactJs, NodeJs, etc,.'
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                />
              </div>

              <div className='updateProject__form-control'>
                <input
                  className='updateProject__form-input'
                  type='text'
                  placeholder='Project Features - Comma separated, e.g. Basic CRUD, Follow Profiles, Like Posts, etc,.'
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                />
              </div>

              <div className='updateProject__form-control-date'>
                <div className='updateProject__date-container'>
                  <input
                    className='updateProject__input-checkbox'
                    id='checked'
                    type='checkbox'
                    value={current}
                    onChange={(e) => {
                      setCurrent(!current);
                      toggleDisabled(!toDateDisabled);
                    }}
                  />
                  <label>Project In Progress</label>
                </div>

                <div className='updateProject__date-container'>
                  <label>{current ? '* Start' : '* From'}</label>
                  <input
                    className='updateProject__form-input-date'
                    type='date'
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  />
                </div>

                {!toDateDisabled && (
                  <div className='updateProject__date-container'>
                    <label>to</label>
                    <input
                      className='updateProject__form-input-date'
                      type='date'
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      disabled={toDateDisabled ? 'disabled' : ''}
                    />
                  </div>
                )}
              </div>

              <div className='updateProject__form-control'>
                <input
                  className='updateProject__form-input'
                  type='text'
                  value={website}
                  placeholder='Project Website'
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className='updateProject__form-control'>
                <textarea
                  className='updateProject__form-textarea'
                  value={description}
                  placeholder='Talk about your project'
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength='500'
                />
              </div>

              <button className='updateProject__btn'>Update</button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <Spinner />
          <AlertMessage />
        </>
      )}
    </>
  );
};

export default UpdateProject;
