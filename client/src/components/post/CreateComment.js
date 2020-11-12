import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPostComment } from '../../actions/postAction';
import { Form, Button, Row, Col } from 'react-bootstrap';
import AlertMessage from '../layout/AlertMessage';
import Spinner from '../layout/Spinner';

const CreateComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [message, setMessage] = useState(null);

  const postComment = useSelector((state) => state.postComment);
  const {
    loading: loadingCommentCreate,
    error: errorCommentCreate,
    success: successCommentCreate,
    comments,
  } = postComment;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!text) {
      setMessage('comment cannot be empty');
    } else {
      setMessage(null);
      dispatch(createPostComment(postId, { text }));
    }
  };

  return (
    <Row>
      <Col mid={4}>
        <h3>Leave a Comment...</h3>
        {errorCommentCreate && <AlertMessage variant='danger'>{errorCommentCreate}</AlertMessage>}
        {successCommentCreate && <AlertMessage variant='success'>Post Created</AlertMessage>}
        {loadingCommentCreate && <Spinner />}
        <Form onSubmit={submitHandler}>
          <small>* = required field</small>
          <Form.Group controlId='text'>
            <Form.Control
              as='textarea'
              rows={4}
              placeholder='* Say Something...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></Form.Control>
            <Form.Text id='textHelpBlock' muted>
              The world is your playground...
            </Form.Text>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateComment;
