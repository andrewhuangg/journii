import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_CREATE_REVIEW_RESET } from '../../actions/types';
import { Row, Col, Form, Button } from 'react-bootstrap';
import AlertMessage from '../layout/AlertMessage';
import { Link } from 'react-router-dom';
import { createPostReview } from '../../actions/postAction';

const CreateReview = ({ postId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postReviewCreate = useSelector((state) => state.postReviewCreate);
  const { loading: loadingReview, error: errorReview, success: successReview } = postReviewCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPostReview(postId, {
        rating,
        comment,
      })
    );
    setRating(0);
    setComment('');
    dispatch({ type: POST_CREATE_REVIEW_RESET });
  };

  return (
    <Row>
      <Col md={6}>
        <h2>Write a review</h2>
        {errorReview && <AlertMessage variant='danger'>{errorReview}</AlertMessage>}
        {userInfo ? (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='rating'>
              <Form.Label>Rating</Form.Label>
              <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value=''>Select...</option>
                <option value='1'>1 - Poor</option>
                <option value='2'>2 - Fair</option>
                <option value='3'>3 - Good</option>
                <option value='4'>4 - Great</option>
                <option value='5'>5 - Execelent</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='review'>
              <Form.Label>Review</Form.Label>
              <Form.Control
                as='textarea'
                row='3'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Submit
            </Button>
          </Form>
        ) : (
          <AlertMessage>
            Please <Link to='login'> Sign in </Link> to leave a review
          </AlertMessage>
        )}
      </Col>
    </Row>
  );
};

export default CreateReview;
