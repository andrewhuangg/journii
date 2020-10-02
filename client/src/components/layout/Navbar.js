import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <h1>
      <Link to='/'>landing</Link>
    </h1>
    <ul>
      <li>
        <Link to='/profile'>profile</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='login'>Login</Link>
      </li>
      <li>
        <Link to='/logout'>logout</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
