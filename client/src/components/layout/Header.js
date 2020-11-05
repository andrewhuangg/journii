import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authAction';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getUserDetails } from '../../actions/authAction';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (userInfo && (!user || !user.name)) {
      dispatch(getUserDetails('me'));
    }
  }, [dispatch, user, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>journii</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo ? (
                <>
                  <LinkContainer to='/createpost'>
                    <Nav.Link>Create Post</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/posts'>
                    <Nav.Link>Posts</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/profiles'>
                    <Nav.Link>Profiles</Nav.Link>
                  </LinkContainer>

                  <NavDropdown title='Menu' id='menu'>
                    <LinkContainer to='/dashboard'>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/userinfo'>
                      <NavDropdown.Item>Update User</NavDropdown.Item>
                    </LinkContainer>

                    {user.ownProfile === null ? (
                      <LinkContainer to='/createprofile'>
                        <NavDropdown.Item>Create Profile</NavDropdown.Item>
                      </LinkContainer>
                    ) : (
                      <LinkContainer to='/editprofile'>
                        <NavDropdown.Item>Update Profile</NavDropdown.Item>
                      </LinkContainer>
                    )}

                    <LinkContainer to='/createpost'>
                      <NavDropdown.Item>Create Post</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/register'>
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;