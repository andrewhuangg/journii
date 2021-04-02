import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

  return (
    <Route
      {...rest}
      render={(props) => (!userInfo ? <Redirect to='/login' /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;
