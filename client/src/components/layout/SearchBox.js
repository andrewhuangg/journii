import React, { useState, useEffect } from 'react';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/dashboard');
    }

    setKeyword('');
  };

  return (
    <form className='search' onSubmit={submitHandler}>
      <input
        className='search__input'
        type='text'
        placeholder='Search...'
        onChange={(e) => setKeyword(e.target.value)}
      ></input>
      <button type='submit' className='search__btn'>
        Search
      </button>
    </form>
  );
};

export default SearchBox;
