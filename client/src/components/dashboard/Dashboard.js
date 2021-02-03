import React from 'react';
import { Link } from 'react-router-dom';
import { listLatestPosts } from '../../actions/postAction';

const Dashboard = ({ match }) => {
  const keyword = match.params.keyword;

  return <section className='landing'></section>;
};

export default Dashboard;
