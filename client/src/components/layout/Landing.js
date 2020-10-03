import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <section className='landing'>
    <div className='buttons'>
      <Link to='/register'>register</Link>
      <Link to='/login'>login</Link>
    </div>
  </section>
);

export default Landing;