import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { addProject, getOwnProfileDetails } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

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
  const [toDateDisabled, toggleDisabled] = useState(false);
  const [message, setMessage] = useState(null);

  const profileExperience = useSelector((state) => state.profiles.profile);
  const { profile } = profileExperience;

  useEffect(() => {
    dispatch(getOwnProfileDetails());
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !from) {
      setMessage('name, from, fields cannot be empty');
    } else {
      setMessage(null);
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
    }
  };

  return (
    <Row>
      <Col md={4}>
        <h2>Add Project</h2>
        <small>* = required field</small>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='* Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='technologies'>
            <Form.Label>Technologies</Form.Label>
            <Form.Control
              type='text'
              placeholder='Technologies'
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
            ></Form.Control>
            <Form.Text id='textHelpBlock' muted>
              Comma separated, e.g. 'MongoDb, ExpressJs, ReactJs, NodeJs, etc,.'
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='features'>
            <Form.Label>Features</Form.Label>
            <Form.Control
              type='text'
              placeholder='Features'
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            ></Form.Control>
            <Form.Text id='textHelpBlock' muted>
              Comma separated, e.g. 'Basic CRUD, Follow Profiles, Like Posts, etc,.'
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='current'>
            <Form.Label>Project In Progress</Form.Label>
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

          <Form.Group controlId='website'>
            <Form.Label>Project Website</Form.Label>
            <Form.Control
              type='text'
              placeholder='website'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
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
            Add Project
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AddProject;
