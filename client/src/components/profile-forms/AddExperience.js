import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { addExperience } from '../../actions/profileAction';
import { PROFILE_UPDATE_EXPERIENCES_RESET } from '../../actions/types';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

const AddExperience = ({ history }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [toDateDisabled, toggleDisabled] = useState(false);
  const [message, setMessage] = useState(null);

  const profileExperience = useSelector((state) => state.profileExperience);
  const { success, loading, error } = profileExperience;

  useEffect(() => {
    if (success) {
      dispatch({ type: PROFILE_UPDATE_EXPERIENCES_RESET });
      history.push('/profiles');
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !company || !from) {
      setMessage('title, company, from, fields cannot be empty');
    } else {
      setMessage(null);
      dispatch(
        addExperience({
          title,
          company,
          from,
          to,
          current,
          address,
          description,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={4}>
        {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
        {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
        {success && <AlertMessage variant='success'>Experience Added</AlertMessage>}
        {loading && <Spinner />}
        <h2>Add Experience</h2>
        <small>* = required field</small>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='* Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='company'>
            <Form.Label>Company</Form.Label>
            <Form.Control
              type='text'
              placeholder='* Company'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            ></Form.Control>
            <Form.Text id='textHelpBlock' muted>
              Could be your company or volunteer group
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='current'>
            <Form.Label>Current Job</Form.Label>
            <Form.Check
              type='checkbox'
              placeholder='Current'
              value={current}
              checked={current}
              onChange={(e) => {
                setCurrent(!current);
                toggleDisabled(!toDateDisabled);
              }}
            ></Form.Check>
          </Form.Group>

          <Form.Group controlId='from'>
            <Form.Label>{current ? 'Start' : '* From'}</Form.Label>
            <Form.Control
              type='date'
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {!toDateDisabled && (
            <Form.Group controlId='to'>
              <Form.Label>To</Form.Label>
              <Form.Control
                type='date'
                value={to}
                onChange={(e) => setTo(e.target.value)}
                disabled={toDateDisabled ? 'disabled' : ''}
              ></Form.Control>
            </Form.Group>
          )}

          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Add Experience
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AddExperience;
