import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { addProject } from '../../actions/profileAction';
import { PROFILE_UPDATE_PROJECTS_RESET } from '../../actions/types';
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

  const profileProject = useSelector((state) => state.profileProject);
  const { success, loading, error } = profileProject;

  useEffect(() => {
    if (success) {
      dispatch({ type: PROFILE_UPDATE_PROJECTS_RESET });
      history.push('/profiles');
    }
  }, [dispatch, success]);

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
          description,
          features,
          technologies,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={4}>
        {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
        {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
        {success && <AlertMessage variant='success'>Project Added</AlertMessage>}
        {loading && <Spinner />}
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
            <Form.Label>{current ? 'Start' : 'From'}</Form.Label>
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
