import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateExperience, getOwnProfileDetails, getExperience } from '../../actions/profileAction';
import { setAlert } from '../../actions/alertAction';
import Spinner from '../layout/Spinner';
import Meta from '../layout/Meta';
import AlertMessage from '../layout/AlertMessage';

const UpdateExperience = ({ match, history }) => {
  const dispatch = useDispatch();
  const experienceId = match.params.id;

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [toDateDisabled, toggleDisabled] = useState(false);

  const profileExperience = useSelector((state) => state.profiles.profile);
  const { profile, loading } = profileExperience;

  const formatDate = (date) => {
    let [month, day, year] = new Date(date).toLocaleDateString('en-US').split('/');

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    dispatch(getOwnProfileDetails()).then((data) => {
      if (data) {
        dispatch(getExperience(data._id, experienceId)).then((exp) => {
          if (exp) {
            setTitle(exp.title || '');
            setCompany(exp.company || '');
            setAddress(exp.address || '');
            setDescription(exp.description || '');

            let from;
            if (exp.from) from = formatDate(exp.from);

            let to;
            if (exp.to) to = formatDate(exp.to);

            setFrom(from || '');
            setTo(to || '');

            if (exp.current) {
              setCurrent(exp.current || '');
              toggleDisabled(!toDateDisabled);
              document.getElementById('checked').checked = true;
            } else {
              document.getElementById('checked').checked = false;
            }
          }
        });
      }
    });
  }, [dispatch, experienceId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateExperience(
        {
          title,
          company,
          from,
          to,
          current,
          address,
          description,
        },
        profile._id,
        experienceId
      )
    ).then((data) => {
      dispatch(setAlert('update experience success', 'success'));
      if (data) history.push(`/profile/${profile.user.id}`);
    });
  };

  return (
    <>
      {!loading ? (
        <div className='updateExperience'>
          <Meta title='journii | Update Experience' />
          <div className='updateExperience__wrapper'>
            <form className='updateExperience__form' onSubmit={submitHandler}>
              <h3>Update Experience</h3>
              <small>* = required field</small>

              <div className='updateExperience__form-control'>
                <input
                  className='updateExperience__form-input'
                  type='text'
                  placeholder='* Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className='updateExperience__form-control'>
                <input
                  className='updateExperience__form-input'
                  type='text'
                  placeholder='* Company'
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
                <small>Could be your company or volunteer group etc.,</small>
              </div>

              <div className='updateExperience__form-control-date'>
                <div className='updateExperience__date-container'>
                  <input
                    className='updateExperience__input-checkbox'
                    id='checked'
                    type='checkbox'
                    value={current}
                    onChange={(e) => {
                      setCurrent(!current);
                      toggleDisabled(!toDateDisabled);
                    }}
                  />
                  <label>Current Experience</label>
                </div>

                <div className='updateExperience__date-container'>
                  <label>{current ? '* Start' : '* From'}</label>
                  <input
                    className='updateExperience__form-input-date'
                    type='date'
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  />
                </div>

                {!toDateDisabled && (
                  <div className='updateExperience__date-container'>
                    <label>to</label>
                    <input
                      className='updateExperience__form-input-date'
                      type='date'
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      disabled={toDateDisabled ? 'disabled' : ''}
                    />
                  </div>
                )}
              </div>

              <div className='updateExperience__form-control'>
                <input
                  className='updateExperience__form-input'
                  type='text'
                  placeholder='Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className='updateExperience__form-control'>
                <textarea
                  className='updateExperience__form-textarea'
                  value={description}
                  placeholder='Talk about your experience'
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength='500'
                />
              </div>

              <button className='updateExperience__btn'>Update</button>
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

export default UpdateExperience;
