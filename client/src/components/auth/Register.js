import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { register } from '../../actions/authAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import FormContainer from './FormContainer';

const Register = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/dashboard';

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      <FormContainer>
        <h1 className='large text-primary'>Sign Up</h1>
        {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
        {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
        {loading && <Spinner />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPasword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/login'}>Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default Register;
