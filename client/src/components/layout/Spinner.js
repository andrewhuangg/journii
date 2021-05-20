import React from 'react';

const Spinner = ({ modal }) => {
  return (
    <>
      <div
        className='spinner__overlay container'
        style={modal && { height: '25rem', width: '25rem' }}
      >
        <div className='spinner'></div>
      </div>
    </>
  );
};

export default Spinner;
