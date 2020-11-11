import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../actions/postAction';
import { POST_CREATE_RESET } from '../../actions/types';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

const CreatePost = ({ history }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const postCreate = useSelector((state) => state.postCreate);
  const { loading: loadingSuccess, success: successCreate, error: errorCreate, post } = postCreate;

  useEffect(() => {
    if (successCreate) {
      setText('');
      setTitle('');
      dispatch({ type: POST_CREATE_RESET });
      history.push(`/posts/${post._id}`);
    }
  }, [dispatch, successCreate, history]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/v1/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!text) {
      setMessage('post cannot be empty');
    } else {
      setMessage(null);
      dispatch(createPost({ text, title, image }));
    }
  };
  return (
    <>
      <Row>
        <Col mid={4}>
          <h3>Say Something...</h3>
          {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
          {errorCreate && <AlertMessage variant='danger'>{errorCreate}</AlertMessage>}
          {successCreate && <AlertMessage variant='success'>Post Created</AlertMessage>}
          {loadingSuccess && <Spinner />}
          <Link to='/posts'>Back to posts</Link>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                rows={4}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Spinner />}
            </Form.Group>

            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                rows={4}
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='text'>
              <Form.Control
                as='textarea'
                rows={4}
                placeholder='Create a post...'
                value={text}
                onChange={(e) => setText(e.target.value)}
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
    </>
  );
};

export default CreatePost;
